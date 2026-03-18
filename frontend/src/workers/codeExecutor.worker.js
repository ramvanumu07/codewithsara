import { CodeExecutor, sanitizeExecutePayloadForTransfer } from '../lib/codeExecutorEngine.js';

let currentTaskId = null;

self.onmessage = function (event) {
  const { code, testCases, functionName, solutionType, taskId } = event.data;
  currentTaskId = taskId;
  try {
    const executor = new CodeExecutor();
    const result = executor.execute(code, testCases, functionName, solutionType);
    self.postMessage({
      taskId,
      ...sanitizeExecutePayloadForTransfer(result)
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

self.onerror = function (error) {
  self.postMessage({
    taskId: currentTaskId,
    success: false,
    error: error?.message || 'Runtime error',
    results: []
  });
  currentTaskId = null;
};
