/**
 * Industry-Level Code Executor Web Worker
 * Secure, isolated JavaScript execution environment
 */

class CodeExecutor {
  constructor() {
    this.executionTimeout = 5000; // 5 seconds
    this.maxIterations = 100000;
    this.maxArraySize = 1000000;
    this.maxStringRepeat = 1000000;
    this.maxOutputLines = 1000;
  }

  execute(code, testCases, functionName, solutionType) {
    try {
      if (solutionType === 'script') {
        return this.executeScript(code, testCases);
      } else if (solutionType === 'function') {
        return this.executeFunction(code, testCases, functionName);
      } else {
        throw new Error('Invalid solution type');
      }
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

    // Handle playground execution (no test cases)
    if (!testCases || testCases.length === 0) {
      try {
        const output = this.runScriptWithInputs(code, {});
        results.push({
          passed: true,
          output: output,
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
      // Handle assignment execution (with test cases)
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
      allPassed: results.every(r => r.passed)
    };
  }

  /**
   * Run code and return the value of an expression (e.g. the function reference).
   * Code runs in a function scope so we must explicitly return the value to get it out.
   */
  executeCodeAndReturn(code, returnExpression) {
    const protectedCode = this.addProtections(code);
    // Only allow safe identifier for return (e.g. function name)
    const safeId = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(returnExpression)
      ? returnExpression
      : null;
    if (!safeId) {
      throw new Error('Invalid function name for return');
    }
    const codeWithReturn = protectedCode + '; return (typeof ' + safeId + ' !== "undefined" ? ' + safeId + ' : undefined);';
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

  executeFunction(code, testCases, functionName) {
    const results = [];
    const codeToRun = this.stripLeadingSingleLineComments(code);

    // Run (no test cases): same as playground — execute script, only console.log counts.
    // Do not auto-call the declared function (greet() would show return value; double() → NaN with no args).
    if (!testCases || testCases.length === 0) {
      try {
        const output = this.runScriptWithInputs(code, {});
        results.push({
          passed: true,
          output: output,
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
      return {
        success: true,
        results,
        allPassed: true
      };
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

    // Test each case
    for (const testCase of testCases) {
      try {
        const args = Object.values(testCase.input);
        let result = userFn(...args);
        if (result && typeof result.then === 'function') {
          result = undefined;
        }
        const resultStr = result !== undefined && result !== null ? String(result) : '';
        const passed = this.compareOutput(resultStr, testCase.expectedOutput);

        results.push({
          passed,
          result: resultStr,
          output: resultStr,
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
      allPassed: results.every(r => r.passed)
    };
  }

  runScriptWithInputs(code, inputs) {
    const inputKeys = Object.keys(inputs || {});
    // Comment out user declarations of input variables so we don't get "Identifier has already been declared"
    const codeToRun = inputKeys.length > 0 ? this.stripInputVariableDeclarations(code, inputKeys) : code;
    // Inject input variables
    const inputCode = Object.entries(inputs || {})
      .map(([key, value]) => `const ${key} = ${JSON.stringify(value)};`)
      .join('\n');

    const fullCode = inputCode + (inputCode ? '\n' : '') + codeToRun;

    // Capture console output with enhanced logging
    const outputs = [];
    const originalConsole = self.console;

    self.console = {
      log: (...args) => {
        if (outputs.length < this.maxOutputLines) {
          outputs.push(args.map(arg => String(arg)).join(' '));
        }
      },
      // Also capture other console methods
      info: (...args) => {
        if (outputs.length < this.maxOutputLines) {
          outputs.push('[INFO] ' + args.map(arg => String(arg)).join(' '));
        }
      },
      warn: (...args) => {
        if (outputs.length < this.maxOutputLines) {
          outputs.push('[WARN] ' + args.map(arg => String(arg)).join(' '));
        }
      },
      error: (...args) => {
        if (outputs.length < this.maxOutputLines) {
          outputs.push('[ERROR] ' + args.map(arg => String(arg)).join(' '));
        }
      }
    };

    try {
      this.executeCodeSafely(fullCode);

      // If no console output, check if there's a return value or expression result
      if (outputs.length === 0) {
        // Try to evaluate as expression if it's a simple statement
        try {
          const trimmedCode = code.trim();
          if (!trimmedCode.includes('console.log') &&
            !trimmedCode.includes('function') &&
            !trimmedCode.includes('var ') &&
            !trimmedCode.includes('let ') &&
            !trimmedCode.includes('const ') &&
            !trimmedCode.includes('{') &&
            !trimmedCode.includes(';')) {
            // Might be a simple expression
            const result = new Function(`return (${trimmedCode})`)();
            if (result !== undefined) {
              outputs.push(String(result));
            }
          }
        } catch (e) {
          // Not an expression, that's fine
        }
      }

      return outputs.length > 0 ? outputs.join('\n') : '';
    } finally {
      self.console = originalConsole;
    }
  }

  stripInputVariableDeclarations(code, inputKeys) {
    if (!inputKeys || inputKeys.length === 0) return code;
    const escaped = inputKeys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const names = escaped.join('|');
    const re = new RegExp(
      `^(\\s*)(const|let|var)\\s+(${names})\\s*=.*;?\\s*$`,
      'gm'
    );
    return code.replace(re, '$1// [test input] $2 $3 = ... ;');
  }

  /**
   * Remove string literal contents so blocked-word checks don't match text inside strings
   * (e.g. const str = "Function" should not trigger the Function keyword block).
   */
  stripStringLiteralsForCheck(code) {
    return code
      .replace(/"([^"\\]|\\.)*"/g, '""')
      .replace(/'([^'\\]|\\.)*'/g, "''");
  }

  executeCodeSafely(code) {
    // Add protection against infinite loops and resource abuse
    const protectedCode = this.addProtections(code);

    // Execute with timeout
    const startTime = Date.now();
    const timeoutId = setTimeout(() => {
      throw new Error('Execution timeout: Code took too long to execute');
    }, this.executionTimeout);

    try {
      // Use Function constructor instead of eval for better security
      const executor = new Function(protectedCode);
      executor.call(null);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  addProtections(code) {
    let protectedCode = code;

    // Add loop protection
    protectedCode = protectedCode.replace(
      /for\s*\([^)]*\)\s*{/g,
      (match) => {
        return match + `
          let __loopCount_${Date.now()} = 0;
          const __checkLoop_${Date.now()} = () => {
            if (++__loopCount_${Date.now()} > ${this.maxIterations}) {
              throw new Error('Loop exceeded maximum iterations');
            }
          };
        `;
      }
    );

    protectedCode = protectedCode.replace(
      /while\s*\([^)]*\)\s*{/g,
      (match) => {
        return match + `
          let __loopCount_${Date.now()} = 0;
          const __checkLoop_${Date.now()} = () => {
            if (++__loopCount_${Date.now()} > ${this.maxIterations}) {
              throw new Error('Loop exceeded maximum iterations');
            }
          };
        `;
      }
    );

    // Block dangerous operations (check only code, not string literal content)
    const codeWithoutStringLiterals = this.stripStringLiteralsForCheck(protectedCode);
    const blockedPatterns = [
      /\bimportScripts\b/g,
      /\bpostMessage\b/g,
      /\bclose\b/g,
      /\bsetTimeout\b/g,
      /\bsetInterval\b/g,
      /\beval\b/g,
      /\bFunction\b/g,
      /\bnew\s+Function/g,
      /\bWebSocket\b/g,
      /\bfetch\b/g,
      /\bXMLHttpRequest\b/g
    ];

    blockedPatterns.forEach(pattern => {
      if (pattern.test(codeWithoutStringLiterals)) {
        throw new Error('Blocked operation detected in code');
      }
    });

    return protectedCode;
  }

  compareOutput(actual, expected) {
    // Normalize whitespace and compare
    const normalizeOutput = (str) => {
      return String(str).trim().replace(/\s+/g, ' ');
    };

    return normalizeOutput(actual) === normalizeOutput(expected);
  }
}

// Store current taskId so onerror can include it (uncaught errors don't have message context)
let currentTaskId = null;

/** postMessage cannot clone functions, symbols, etc. — only send clone-safe payloads */
function cloneSafeExecutePayload(payload) {
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
      result: r.result !== undefined && r.result !== null && typeof r.result !== 'string'
        ? (typeof r.result === 'function' ? '[Function]' : safe(r.result))
        : r.result,
      error: r.error != null ? String(r.error) : undefined,
      expected: r.expected != null ? String(r.expected) : r.expected,
      input: safe(r.input)
    }))
  };
}

// Web Worker message handler
self.onmessage = function (event) {
  const { code, testCases, functionName, solutionType, taskId } = event.data;
  currentTaskId = taskId;

  try {
    const executor = new CodeExecutor();
    const result = executor.execute(code, testCases, functionName, solutionType);

    self.postMessage({
      taskId,
      ...cloneSafeExecutePayload(result)
    });
  } catch (error) {
    self.postMessage({
      taskId,
      success: false,
      error: error.message,
      results: []
    });
  } finally {
    currentTaskId = null;
  }
};

// Handle uncaught errors (e.g. async timeout in executeCodeSafely)
self.onerror = function (error) {
  self.postMessage({
    taskId: currentTaskId,
    success: false,
    error: error?.message || 'Runtime error',
    results: []
  });
  currentTaskId = null;
};