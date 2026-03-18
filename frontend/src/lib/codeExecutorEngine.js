/**
 * Shared code execution engine (browser worker + Node/Jest tests).
 * Single source of truth for playground and assignment execution semantics.
 */

export class CodeExecutor {
  constructor() {
    this.executionTimeout = 5000;
    this.maxIterations = 100000;
    this.maxArraySize = 1000000;
    this.maxStringRepeat = 1000000;
    this.maxOutputLines = 1000;
  }

  /**
   * Run function-type assignments. Awaits Promises (timers, async I/O patterns).
   * Script-type stays synchronous.
   */
  async execute(code, testCases, functionName, solutionType) {
    try {
      if (solutionType === 'script') {
        return this.executeScript(code, testCases);
      }
      if (solutionType === 'function') {
        return await this.executeFunctionAsync(code, testCases, functionName);
      }
      throw new Error('Invalid solution type');
    } catch (error) {
      return {
        success: false,
        error: error.message,
        results: []
      };
    }
  }

  executeScript(code, testCases) {
    const results = [];
    if (!testCases || testCases.length === 0) {
      try {
        const output = this.runScriptWithInputs(code, {});
        results.push({
          passed: true,
          output,
          result: output,
          input: {},
          expected: null
        });
      } catch (error) {
        results.push({
          passed: false,
          error: error.message,
          output: '',
          input: {},
          expected: null
        });
        return {
          success: false,
          error: error.message,
          results,
          allPassed: false
        };
      }
    } else {
      for (const testCase of testCases) {
        try {
          const result = this.runScriptWithInputs(code, testCase.input);
          const passed = this.compareOutput(result, testCase.expectedOutput);
          results.push({
            passed,
            output: result,
            expected: testCase.expectedOutput,
            input: testCase.input
          });
        } catch (error) {
          results.push({
            passed: false,
            error: error.message,
            expected: testCase.expectedOutput,
            input: testCase.input
          });
        }
      }
    }
    return {
      success: true,
      results,
      allPassed: results.every((r) => r.passed)
    };
  }

  executeCodeAndReturn(code, returnExpression) {
    const protectedCode = this.addProtections(code);
    const safeId = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(returnExpression)
      ? returnExpression
      : null;
    if (!safeId) {
      throw new Error('Invalid function name for return');
    }
    const codeWithReturn =
      protectedCode +
      '; return (typeof ' +
      safeId +
      ' !== "undefined" ? ' +
      safeId +
      ' : undefined);';
    const fn = new Function(codeWithReturn);
    return fn.call(null);
  }

  stripLeadingSingleLineComments(code) {
    const lines = code.split('\n');
    let i = 0;
    while (i < lines.length && /^\s*\/\//.test(lines[i])) {
      i++;
    }
    return lines.slice(i).join('\n').trimStart();
  }

  async _settlePromise(val, timeoutMs = 15000) {
    if (val && typeof val.then === 'function') {
      return Promise.race([
        val,
        new Promise((_, rej) =>
          setTimeout(() => rej(new Error(`Async step timed out (${timeoutMs / 1000}s)`)), timeoutMs)
        )
      ]);
    }
    return val;
  }

  async executeFunctionAsync(code, testCases, functionName) {
    const results = [];
    const codeToRun = this.stripLeadingSingleLineComments(code);

    if (!testCases || testCases.length === 0) {
      try {
        const output = this.runScriptWithInputs(code, {});
        results.push({
          passed: true,
          output,
          result: output,
          input: {},
          expected: null
        });
      } catch (error) {
        results.push({
          passed: false,
          error: error.message,
          output: '',
          input: {},
          expected: null
        });
        return {
          success: false,
          error: error.message,
          results,
          allPassed: false
        };
      }
      return { success: true, results, allPassed: true };
    }

    let userFn;
    try {
      userFn = this.executeCodeAndReturn(codeToRun, functionName);
    } catch (error) {
      return {
        success: false,
        error: `Code execution failed: ${error.message}`,
        results: []
      };
    }
    if (typeof userFn !== 'function') {
      return {
        success: false,
        error: `Function '${functionName}' not found or not a function`,
        results: []
      };
    }

    for (const testCase of testCases) {
      try {
        const { value, error } = await this.runFunctionTestCaseAsync(userFn, testCase);
        const resultStr = error
          ? ''
          : value !== undefined && value !== null
            ? String(value)
            : '';
        const passed = !error && this.compareOutput(resultStr, testCase.expectedOutput);
        results.push({
          passed,
          result: resultStr,
          output: resultStr,
          error: error || undefined,
          expected: testCase.expectedOutput,
          input: testCase.input
        });
      } catch (error) {
        results.push({
          passed: false,
          error: error.message,
          expected: testCase.expectedOutput,
          input: testCase.input
        });
      }
    }
    return {
      success: true,
      results,
      allPassed: results.every((r) => r.passed)
    };
  }

  async runFunctionTestCaseAsync(fn, testCase) {
    const args = Object.values(testCase.input);
    let result = fn.apply(null, args);
    if (testCase.requirePromise === true) {
      if (!result || typeof result.then !== 'function') {
        return {
          error:
            'This task requires your function to return a Promise (use return new Promise(...) or an async function).'
        };
      }
    }
    try {
      result = await this._settlePromise(result);
    } catch (e) {
      return { error: e.message || String(e) };
    }
    try {
      if (testCase.thenCallArgs !== undefined && testCase.thenCallArgs !== null) {
        const innerArgs = Array.isArray(testCase.thenCallArgs)
          ? testCase.thenCallArgs
          : Object.values(testCase.thenCallArgs);
        if (typeof result !== 'function') {
          return { error: `Expected a function, got ${typeof result}` };
        }
        result = result.apply(null, innerArgs);
        try {
          result = await this._settlePromise(result);
        } catch (e) {
          return { error: e.message || String(e) };
        }
      }
      if (Array.isArray(testCase.repeatCalls) && testCase.repeatCalls.length > 0) {
        if (typeof result !== 'function') {
          return { error: `Expected a function, got ${typeof result}` };
        }
        const parts = [];
        for (const callArgs of testCase.repeatCalls) {
          const ca = Array.isArray(callArgs) ? callArgs : Object.values(callArgs || {});
          let out = result.apply(null, ca);
          try {
            out = await this._settlePromise(out);
          } catch (e) {
            return { error: e.message || String(e) };
          }
          parts.push(String(out ?? ''));
        }
        result = parts.join('\n');
      }
      if (Array.isArray(testCase.thenInvoke) && testCase.thenInvoke.length > 0) {
        let obj = result;
        let last;
        for (const step of testCase.thenInvoke) {
          const m = obj?.[step.method];
          if (typeof m !== 'function') {
            return { error: `Missing or non-function method: ${step.method}` };
          }
          last = m.apply(obj, step.args || []);
          try {
            last = await this._settlePromise(last);
          } catch (e) {
            return { error: e.message || String(e) };
          }
        }
        result = last;
      }
      return { value: result };
    } catch (e) {
      return { error: e.message || String(e) };
    }
  }

  runScriptWithInputs(code, inputs) {
    const g = typeof globalThis !== 'undefined' ? globalThis : self;
    const inputKeys = Object.keys(inputs || {});
    const codeToRun =
      inputKeys.length > 0 ? this.stripInputVariableDeclarations(code, inputKeys) : code;
    const inputCode = Object.entries(inputs || {})
      .map(([key, value]) => `const ${key} = ${JSON.stringify(value)};`)
      .join('\n');
    const fullCode = inputCode + (inputCode ? '\n' : '') + codeToRun;
    const outputs = [];
    const originalConsole = g.console;
    g.console = {
      log: (...args) => {
        if (outputs.length < this.maxOutputLines) {
          outputs.push(args.map((arg) => String(arg)).join(' '));
        }
      },
      info: (...args) => {
        if (outputs.length < this.maxOutputLines) {
          outputs.push('[INFO] ' + args.map((arg) => String(arg)).join(' '));
        }
      },
      warn: (...args) => {
        if (outputs.length < this.maxOutputLines) {
          outputs.push('[WARN] ' + args.map((arg) => String(arg)).join(' '));
        }
      },
      error: (...args) => {
        if (outputs.length < this.maxOutputLines) {
          outputs.push('[ERROR] ' + args.map((arg) => String(arg)).join(' '));
        }
      }
    };
    try {
      this.executeCodeSafely(fullCode);
      if (outputs.length === 0) {
        try {
          const trimmedCode = code.trim();
          if (
            !trimmedCode.includes('console.log') &&
            !trimmedCode.includes('function') &&
            !trimmedCode.includes('var ') &&
            !trimmedCode.includes('let ') &&
            !trimmedCode.includes('const ') &&
            !trimmedCode.includes('{') &&
            !trimmedCode.includes(';')
          ) {
            const result = new Function(`return (${trimmedCode})`)();
            if (result !== undefined) {
              outputs.push(String(result));
            }
          }
        } catch {
          /* ignore */
        }
      }
      return outputs.length > 0 ? outputs.join('\n') : '';
    } finally {
      g.console = originalConsole;
    }
  }

  stripInputVariableDeclarations(code, inputKeys) {
    if (!inputKeys || inputKeys.length === 0) return code;
    const escaped = inputKeys.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const names = escaped.join('|');
    const re = new RegExp(
      `^(\\s*)(const|let|var)\\s+(${names})\\s*=.*;?\\s*$`,
      'gm'
    );
    return code.replace(re, '$1// [test input] $2 $3 = ... ;');
  }

  stripStringLiteralsForCheck(code) {
    return code
      .replace(/"([^"\\]|\\.)*"/g, '""')
      .replace(/'([^'\\]|\\.)*'/g, "''");
  }

  executeCodeSafely(code) {
    const protectedCode = this.addProtections(code);
    const timeoutId = setTimeout(() => {
      throw new Error('Execution timeout: Code took too long to execute');
    }, this.executionTimeout);
    try {
      const executor = new Function(protectedCode);
      executor.call(null);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  addProtections(code) {
    let protectedCode = code;
    protectedCode = protectedCode.replace(/for\s*\([^)]*\)\s*{/g, (match) => {
      return `${match}
          let __loopCount_${Date.now()} = 0;
          const __checkLoop_${Date.now()} = () => {
            if (++__loopCount_${Date.now()} > ${this.maxIterations}) {
              throw new Error('Loop exceeded maximum iterations');
            }
          };
        `;
    });
    protectedCode = protectedCode.replace(/while\s*\([^)]*\)\s*{/g, (match) => {
      return `${match}
          let __loopCount_${Date.now()} = 0;
          const __checkLoop_${Date.now()} = () => {
            if (++__loopCount_${Date.now()} > ${this.maxIterations}) {
              throw new Error('Loop exceeded maximum iterations');
            }
          };
        `;
    });
    const codeWithoutStringLiterals = this.stripStringLiteralsForCheck(protectedCode);
    const blockedPatterns = [
      /\bimportScripts\b/g,
      /\bpostMessage\b/g,
      /\bclose\b/g,
      /\beval\b/g,
      /\bnew\s+Function/g,
      /\bWebSocket\b/g,
      /\bfetch\b/g,
      /\bXMLHttpRequest\b/g
    ];
    blockedPatterns.forEach((pattern) => {
      if (pattern.test(codeWithoutStringLiterals)) {
        throw new Error('Blocked operation detected in code');
      }
    });
    return protectedCode;
  }

  compareOutput(actual, expected) {
    const normalizeOutput = (str) => String(str).trim().replace(/\s+/g, ' ');
    return normalizeOutput(actual) === normalizeOutput(expected);
  }
}

export function sanitizeExecutePayloadForTransfer(payload) {
  const safe = (v) => {
    if (v === null || v === undefined) return v;
    if (typeof v === 'function') return '[Function]';
    if (typeof v !== 'object') return v;
    if (Array.isArray(v)) return v.map(safe);
    try {
      return JSON.parse(JSON.stringify(v));
    } catch {
      return String(v);
    }
  };
  return {
    success: payload.success,
    error: typeof payload.error === 'string' ? payload.error : String(payload.error ?? ''),
    allPassed: payload.allPassed,
    results: (payload.results || []).map((r) => ({
      passed: r.passed,
      output: typeof r.output === 'string' ? r.output : String(r.output ?? ''),
      result:
        r.result !== undefined && r.result !== null && typeof r.result !== 'string'
          ? typeof r.result === 'function'
            ? '[Function]'
            : safe(r.result)
          : r.result,
      error: r.error != null ? String(r.error) : undefined,
      expected: r.expected != null ? String(r.expected) : r.expected,
      input: safe(r.input)
    }))
  };
}
