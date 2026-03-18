/** Jest: Vite's ?worker import is not available in Node */
export default class MockWorker {
  constructor() {
    this.onmessage = null;
    this.onerror = null;
  }
  postMessage() {}
  terminate() {}
}
