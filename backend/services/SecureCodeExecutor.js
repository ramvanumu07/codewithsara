/**
 * Industry-Level Secure Code Executor (Backend)
 * Uses Node.js VM with enhanced security and proper test validation
 */

import vm from 'vm';
import { performance } from 'perf_hooks';

class SecureCodeExecutor {
  constructor() {
    this.executionTimeout = 5000; // 5 seconds
    this.maxIterations = 100000;
    this.maxMemoryUsage = 128 * 1024 * 1024; // 128MB
    this.maxOutputLines = 1000;
  }

  /**
   * Execute code with test cases
   * @param {string} code - User's code
   * @param {Array} testCases - Test cases to run
   * @param {string} functionName - Function name for function-type tasks
   * @param {string} solutionType - 'script' or 'function'
   * @returns {Object} Execution results
   */
  async execute(code, testCases, functionName = null, solutionType = 'script') {
    const startTime = performance.now();
    
    try {
      let results;
      
      if (solutionType === 'script') {
        results = await this.executeScript(code, testCases);
      } else if (solutionType === 'function') {
        results = await this.executeFunction(code, testCases, functionName);
      } else {
        throw new Error('Invalid solution type');
      }

      const executionTime = performance.now() - startTime;
      
      return {
        success: true,
        results,
        allPassed: results.every(r => r.passed),
        executionTime: Math.round(executionTime)
      };
      
    } catch (error) {
      return {
        success: false,
        error: error.message,
        results: [],
        executionTime: Math.round(performance.now() - startTime)
      };
    }
  }

  /**
   * Execute script-type code
   */
  async executeScript(code, testCases) {
    const results = [];
    
    // If no test cases, still validate the code by running it once
    if (testCases.length === 0) {
      try {
        const output = await this.runScriptWithInputs(code, {});
        results.push({
          passed: true,
          output,
          expected: '',
          input: {}
        });
      } catch (error) {
        results.push({
          passed: false,
          error: error.message,
          expected: '',
          input: {}
        });
      }
    } else {
      // Run with test cases
      for (const testCase of testCases) {
        try {
          const output = await this.runScriptWithInputs(code, testCase.input);
          const passed = this.compareOutput(output, testCase.expectedOutput);
          
          results.push({
            passed,
            output,
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
    
    return results;
  }

  /**
   * Strip leading lines that are only single-line (//) comments so the function body is executed.
   * Avoids "Function not found" when the editor sends description as //-prefixed lines.
   */
  stripLeadingSingleLineComments(code) {
    const lines = code.split('\n');
    let i = 0;
    while (i < lines.length && /^\s*\/\//.test(lines[i])) {
      i++;
    }
    return lines.slice(i).join('\n').trimStart();
  }

  /**
   * Run one function-type test case. Supports closure patterns:
   * - thenCallArgs: after fn(...input), call returned function with these args
   * - thenInvoke: [{ method, args }], call methods on returned object; last return is compared
   * - repeatCalls: [[args], ...] call same returned function multiple times; join with newline
   */
  async runFunctionTestCase(fn, testCase) {
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
    if (result && typeof result.then === 'function') {
      result = await Promise.race([
        result,
        new Promise((_, rej) =>
          setTimeout(() => rej(new Error('Async step timed out (15s)')), 15000)
        )
      ]);
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
        if (result && typeof result.then === 'function') {
          result = await result;
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
          if (out && typeof out.then === 'function') {
            out = await out;
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
          if (last && typeof last.then === 'function') {
            last = await last;
          }
        }
        result = last;
      }

      return { value: result };
    } catch (e) {
      return { error: e.message || String(e) };
    }
  }

  /**
   * Execute function-type code
   * Node's vm does not add function declarations to the context object, so we run the code
   * and then evaluate the function name to get a reference to it (script completion value).
   */
  async executeFunction(code, testCases, functionName) {
    const results = [];
    
    // Strip leading // comment lines so function declarations in the code are actually run
    const codeToRun = this.stripLeadingSingleLineComments(code);
    
    // Create secure context
    const context = this.createSecureContext();
    
    try {
      // Run user code and get the function by evaluating its name (vm doesn't attach function declarations to context)
      const codeWithReturn = `${codeToRun}\n${functionName}`;
      const fn = await this.runInContextAndReturn(codeWithReturn, context);
      
      if (typeof fn !== 'function') {
        throw new Error(`Function '${functionName}' not found or not a function`);
      }
      
      // Test each case (supports thenCallArgs, thenInvoke, repeatCalls for closures)
      for (const testCase of testCases) {
        try {
          const { value, error } = await this.runFunctionTestCase(fn, testCase);
          const passed = error
            ? false
            : this.compareOutput(this.valueToTestOutputString(value), testCase.expectedOutput);

          results.push({
            passed,
            result: error ? undefined : value,
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
      
    } catch (error) {
      throw new Error(`Code execution failed: ${error.message}`);
    }
    
    return results;
  }

  /**
   * Run script with input variables
   * Comment out user declarations of input variables (e.g. const length = 8) so test-injected
   * values are used and we avoid "Identifier has already been declared".
   */
  async runScriptWithInputs(code, inputs) {
    const context = this.createSecureContext();

    const inputKeys = Object.keys(inputs || {});
    const codeToRun = inputKeys.length > 0
      ? this.stripInputVariableDeclarations(code, inputKeys)
      : code;

    // Inject input variables
    Object.entries(inputs || {}).forEach(([key, value]) => {
      context[key] = value;
    });

    // Capture console output
    const outputs = [];
    context.console = {
      log: (...args) => {
        if (outputs.length < this.maxOutputLines) {
          outputs.push(args.map(arg => String(arg)).join(' '));
        }
      }
    };

    await this.executeInContext(codeToRun, context);
    return outputs.join('\n');
  }

  /**
   * Comment out lines that declare a variable with the same name as an injected input
   * (e.g. "const length = 8;" or "let width = 5") so test inputs can override without redeclaration.
   */
  stripInputVariableDeclarations(code, inputKeys) {
    if (!inputKeys || inputKeys.length === 0) {return code;}
    const escaped = inputKeys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const names = escaped.join('|');
    const re = new RegExp(
      `^(\\s*)(const|let|var)\\s+(${names})\\s*=.*;?\\s*$`,
      'gm'
    );
    return code.replace(re, '$1// [test input] $2 $3 = ... ;');
  }

  /**
   * Create secure execution context
   */
  createSecureContext() {
    const context = {
      // Safe globals
      console: { log: () => {} },
      Math,
      JSON,
      Array,
      Object,
      String,
      Number,
      Boolean,
      Date,
      RegExp,
      Error,
      TypeError,
      ReferenceError,
      SyntaxError,
      
      // Utility functions
      parseInt,
      parseFloat,
      isNaN,
      isFinite,
      
      // Safe methods
      Promise,
      setTimeout: (cb, ms) =>
        globalThis.setTimeout(cb, Math.min(Math.max(0, Number(ms) || 0), 10000)),
      setInterval: (cb, ms) =>
        globalThis.setInterval(cb, Math.min(Math.max(1, Number(ms) || 1), 10000)),
      clearTimeout: globalThis.clearTimeout.bind(globalThis),
      clearInterval: globalThis.clearInterval.bind(globalThis),
      
      // Loop protection
      __loopCount: 0,
      __checkLoop: function() {
        if (++this.__loopCount > this.maxIterations) {
          throw new Error('Loop exceeded maximum iterations');
        }
      }.bind(this)
    };
    
    return vm.createContext(context);
  }

  /**
   * Execute code in secure context
   */
  async executeInContext(code, context) {
    // Add basic protections
    const protectedCode = this.addBasicProtections(code);
    
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('Execution timeout'));
      }, this.executionTimeout);
      
      try {
        vm.runInContext(protectedCode, context, {
          timeout: this.executionTimeout,
          breakOnSigint: true
        });
        
        clearTimeout(timeoutId);
        resolve();
      } catch (error) {
        clearTimeout(timeoutId);
        reject(error);
      }
    });
  }

  /**
   * Run code in context and return the script's completion value (last expression).
   * Used to obtain a function reference, since vm does not add function declarations to the context object.
   */
  async runInContextAndReturn(code, context) {
    const protectedCode = this.addBasicProtections(code);
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => reject(new Error('Execution timeout')), this.executionTimeout);
      try {
        const result = vm.runInContext(protectedCode, context, {
          timeout: this.executionTimeout,
          breakOnSigint: true
        });
        clearTimeout(timeoutId);
        resolve(result);
      } catch (error) {
        clearTimeout(timeoutId);
        reject(error);
      }
    });
  }

  /**
   * Call function in secure context
   */
  async callFunctionInContext(context, functionName, args) {
    const argsString = args.map(arg => JSON.stringify(arg)).join(',');
    const callCode = `${functionName}(${argsString})`;
    
    return vm.runInContext(callCode, context, {
      timeout: 1000 // 1 second for function calls
    });
  }

  /**
   * Add basic code protections
   */
  addBasicProtections(code) {
    // Check for dangerous patterns
    const dangerousPatterns = [
      { pattern: /require\s*\(/g, name: 'require()' },
      { pattern: /import\s+/g, name: 'import' },
      { pattern: /process\./g, name: 'process' },
      { pattern: /global\./g, name: 'global' },
      { pattern: /Buffer\./g, name: 'Buffer' },
      { pattern: /__dirname/g, name: '__dirname' },
      { pattern: /__filename/g, name: '__filename' },
      { pattern: /module\./g, name: 'module' },
      { pattern: /exports\./g, name: 'exports' },
      { pattern: /fs\./g, name: 'fs' },
      { pattern: /child_process/g, name: 'child_process' },
      { pattern: /eval\s*\(/g, name: 'eval()' },
      { pattern: /Function\s*\(/g, name: 'Function constructor' }
    ];
    
    dangerousPatterns.forEach(({ pattern, name }) => {
      if (pattern.test(code)) {
        throw new Error(`Dangerous operation detected: ${name} is not allowed`);
      }
    });
    
    return code;
  }

  /**
   * Turn a function return value into a string comparable to curriculum expectedOutput.
   * Arrays/objects must use JSON (curriculum uses e.g. ["A","B"]); String([...]) would yield A,B (wrong).
   */
  valueToTestOutputString (value) {
    if (value === null || value === undefined) return ''
    // Arrays: JSON (curriculum format). Plain objects from VM have context.Object as
    // constructor !== global Object, so never use constructor === Object — always JSON for objects.
    if (Array.isArray(value)) {
      try {
        return JSON.stringify(value)
      } catch {
        return String(value)
      }
    }
    if (typeof value === 'object') {
      try {
        return JSON.stringify(value)
      } catch {
        return String(value)
      }
    }
    return String(value)
  }

  /**
   * Compare execution output with expected output
   */
  compareOutput(actual, expected) {
    const normalizeOutput = (str) => {
      return String(str).trim().replace(/\s+/g, ' ');
    };
    
    const normalizedActual = normalizeOutput(actual);
    const normalizedExpected = normalizeOutput(expected);
    
    // Try exact match first
    if (normalizedActual === normalizedExpected) {
      return true;
    }
    
    // Try loose match (for console output)
    return normalizedActual.includes(normalizedExpected) || 
           normalizedExpected.includes(normalizedActual);
  }

  /**
   * Validate test case structure
   */
  validateTestCases(testCases) {
    if (!Array.isArray(testCases)) {
      throw new Error('Test cases must be an array');
    }
    
    testCases.forEach((testCase, index) => {
      if (!Object.prototype.hasOwnProperty.call(testCase, 'input')) {
        throw new Error(`Test case ${index} missing 'input' property`);
      }
      if (!Object.prototype.hasOwnProperty.call(testCase, 'expectedOutput')) {
        throw new Error(`Test case ${index} missing 'expectedOutput' property`);
      }
    });
  }
}

export default SecureCodeExecutor;