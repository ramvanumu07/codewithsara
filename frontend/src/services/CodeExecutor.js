/**
 * Industry-Level Code Execution Service
 * Manages secure code execution using Web Workers and backend validation
 */
import CodeExecutorWorker from '../workers/codeExecutor.worker.js?worker'

/**
 * Map raw execution errors to user-friendly messages for all common cases.
 * @param {string} message - Raw error message from worker or timeout
 * @param {boolean} [fromWorker=false] - If true, strip "Worker error: " prefix when present
 * @returns {string} User-friendly message
 */
function normalizeExecutionError(message, fromWorker = false) {
  const raw = (fromWorker && message && message.startsWith('Worker error: '))
    ? message.slice(14)
    : (message || 'Code execution failed');
  const m = raw.trim();
  if (!m) return 'Code execution failed';

  // Timeout / infinite loop (main-thread timeout or worker timeout)
  if (m === 'INFINITE_LOOP_OR_TIMEOUT' || m === 'Code execution timeout' ||
    m.includes('Execution timeout') || m.includes('took too long')) {
    return 'Infinite loop or code took too long to run. Check for loops that never end or reduce the amount of work.';
  }

  // Worker-reported loop limit (if worker ever sends this)
  if (m.includes('Loop exceeded maximum iterations') || m.includes('maximum iterations')) {
    return 'Too many loop iterations (possible infinite loop). Limit the number of iterations.';
  }

  // Blocked operations
  if (m.includes('Blocked operation')) {
    return 'This code uses a feature that is not allowed in the playground (e.g. fetch, eval).';
  }

  // Syntax errors – keep message, often includes line info
  if (m.includes('SyntaxError') || m.includes('Syntax Error') || m.startsWith('SyntaxError:')) {
    return m.replace(/^SyntaxError:\s*/i, 'Syntax error: ');
  }

  // Reference errors (undefined variable, etc.)
  if (m.includes('ReferenceError') || m.includes('is not defined')) {
    return m.includes('ReferenceError') ? m.replace(/ReferenceError:\s*/i, 'Reference error: ') : m;
  }

  // Type errors
  if (m.includes('TypeError')) {
    return m.replace(/TypeError:\s*/i, 'Type error: ');
  }

  // Function not found (assignment)
  if (m.includes('not found') && m.includes('function')) {
    return m;
  }

  // Generic fallback
  return m;
}

class CodeExecutionService {
  constructor() {
    this.worker = null;
    this.pendingExecutions = new Map();
    this.executionTimeout = 15000; // Worker can be terminated on timeout; loop guard limits sync work
  }

  /**
   * Execute code with test cases
   * @param {string} code - User's code
   * @param {Array} testCases - Test cases to run
   * @param {string} functionName - Function name for function-type tasks
   * @param {string} solutionType - 'script' or 'function'
   * @returns {Promise} Execution results
   */
  async executeCode(code, testCases, functionName = null, solutionType = 'script') {
    return new Promise((resolve, reject) => {
      const taskId = this.generateTaskId();
      const timeoutId = setTimeout(() => {
        this.cleanup(taskId);
        reject(new Error('INFINITE_LOOP_OR_TIMEOUT'));
      }, this.executionTimeout);

      // Store pending execution
      this.pendingExecutions.set(taskId, {
        resolve,
        reject,
        timeoutId
      });

      try {
        if (this.worker) {
          this.worker.terminate();
          this.worker = null;
        }

        const worker = new CodeExecutorWorker();
        this.worker = worker;

        worker.onmessage = (event) => {
          this.handleWorkerMessage(event.data);
        };

        worker.onerror = (error) => {
          this.handleWorkerError(taskId, error);
        };

        worker.postMessage({
          taskId,
          code,
          testCases,
          functionName,
          solutionType
        });

      } catch (error) {
        this.cleanup(taskId);
        const msg = error?.message || '';
        const isLoadFail = msg.includes('Failed to load') || msg.includes('404') || msg.includes('import');
        reject(new Error(isLoadFail ? 'Code execution environment failed to load. Please refresh the page and try again.' : msg));
      }
    });
  }

  /**
   * Execute code for quick testing (frontend only).
   * Runs on the main thread using codeExecutorEngine — avoids Web Worker load/CORS/CSP issues
   * that break `?worker` bundles on some hosts; same sandbox + timeouts as the worker path.
   */
  async executeForTesting(code, testCases, functionName, solutionType) {
    try {
      const { CodeExecutor } = await import('../lib/codeExecutorEngine.js');
      const executor = new CodeExecutor();
      const raw = await executor.execute(code, testCases || [], functionName, solutionType);
      if (!raw || raw.success === false) {
        return {
          success: false,
          error: normalizeExecutionError(raw?.error || 'Code execution failed'),
          results: raw?.results || [],
          allPassed: false,
          executionTime: raw?.executionTime || 0
        };
      }
      return {
        success: true,
        results: raw.results || [],
        allPassed: raw.allPassed,
        executionTime: raw.executionTime || 0
      };
    } catch (error) {
      return {
        success: false,
        error: normalizeExecutionError(error?.message || 'Code execution failed'),
        results: []
      };
    }
  }

  /**
   * Run user code in the Web Worker when possible (timeouts terminate the worker so the UI stays responsive).
   * Falls back to main-thread execution only if the worker fails to load (CSP/bundle issues on some hosts).
   * Same return shape as executeForTesting for formatTerminalRunResult / assignment flows.
   */
  async runUserCode(code, testCases, functionName, solutionType) {
    try {
      const data = await this.executeCode(code, testCases || [], functionName, solutionType);
      if (!data || data.success === false) {
        return {
          success: false,
          error: normalizeExecutionError(data?.error || 'Code execution failed'),
          results: data?.results || [],
          allPassed: false,
          executionTime: data?.executionTime || 0
        };
      }
      return {
        success: true,
        results: data.results || [],
        allPassed: data.allPassed,
        executionTime: data.executionTime || 0
      };
    } catch (error) {
      const msg = error?.message || '';
      if (msg.includes('failed to load') || msg.includes('refresh the page')) {
        return this.executeForTesting(code, testCases, functionName, solutionType);
      }
      return {
        success: false,
        error: normalizeExecutionError(msg),
        results: [],
        allPassed: false,
        executionTime: 0
      };
    }
  }

  /**
   * Execute and validate code (frontend + backend validation)
   */
  async executeAndValidate(code, testCases, functionName, solutionType, topicId, assignmentIndex) {
    try {
      // First, run on frontend for immediate feedback
      const frontendResult = await this.executeCode(code, testCases, functionName, solutionType);

      if (!frontendResult.success) {
        return frontendResult;
      }

      // If frontend passes, validate on backend for security
      const backendResult = await this.validateOnBackend(code, testCases, functionName, solutionType, topicId, assignmentIndex);

      return {
        ...frontendResult,
        backendValidated: backendResult.success,
        backendError: backendResult.error
      };

    } catch (error) {
      return {
        success: false,
        error: error.message,
        results: []
      };
    }
  }

  /**
   * Validate code execution on backend
   */
  async validateOnBackend(code, testCases, functionName, solutionType, topicId, assignmentIndex) {
    try {
      const response = await fetch('/api/learn/execute-secure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('sara_token')}`
        },
        body: JSON.stringify({
          code,
          testCases,
          functionName,
          solutionType,
          topicId,
          assignmentIndex
        })
      });

      const result = await response.json();
      return result;
    } catch (error) {
      return {
        success: false,
        error: `Backend validation failed: ${error.message}`
      };
    }
  }

  /**
   * Handle worker message
   */
  handleWorkerMessage(data) {
    const { taskId } = data;
    const execution = this.pendingExecutions.get(taskId);

    if (execution) {
      clearTimeout(execution.timeoutId);
      this.pendingExecutions.delete(taskId);

      execution.resolve(data);

      this.cleanup(taskId);
    }
  }

  /**
   * Handle worker error
   */
  handleWorkerError(taskId, error) {
    const execution = this.pendingExecutions.get(taskId);

    if (execution) {
      clearTimeout(execution.timeoutId);
      this.pendingExecutions.delete(taskId);
      execution.reject(new Error(normalizeExecutionError(error.message, true)));
      this.cleanup(taskId);
    }
  }

  /**
   * Cleanup worker and resources
   */
  cleanup(taskId) {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }

    const execution = this.pendingExecutions.get(taskId);
    if (execution) {
      clearTimeout(execution.timeoutId);
      this.pendingExecutions.delete(taskId);
    }
  }

  /**
   * Generate unique task ID
   */
  generateTaskId() {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Cleanup all pending executions
   */
  destroy() {
    this.pendingExecutions.forEach(execution => {
      clearTimeout(execution.timeoutId);
      execution.reject(new Error('Service destroyed'));
    });

    this.pendingExecutions.clear();

    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}

// Export singleton instance
export default new CodeExecutionService();