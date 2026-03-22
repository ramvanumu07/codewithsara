// ── Topics: Classes, Closures, Arrays, Loops, Loop Control,
//    Conditionals, Math, Spread/Rest, Destructuring, Arrow Functions,
//    Undefined/Null, Operators, Modules ──

const { PRIORITIES } = require("./Task");

class PriorityQueue {
  #heap = [];

  get size() {
    return this.#heap.length;
  }

  get isEmpty() {
    return this.#heap.length === 0;
  }

  #compare(a, b) {
    const pA = PRIORITIES[a.priority] ?? 0;
    const pB = PRIORITIES[b.priority] ?? 0;
    if (pA !== pB) return pB - pA;

    const dA = a.deadline ? new Date(a.deadline).getTime() : Infinity;
    const dB = b.deadline ? new Date(b.deadline).getTime() : Infinity;
    return dA - dB;
  }

  #swap(i, j) {
    [this.#heap[i], this.#heap[j]] = [this.#heap[j], this.#heap[i]];
  }

  #bubbleUp(idx) {
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (this.#compare(this.#heap[idx], this.#heap[parent]) < 0) {
        this.#swap(idx, parent);
        idx = parent;
      } else {
        break;
      }
    }
  }

  #sinkDown(idx) {
    const length = this.#heap.length;
    while (true) {
      let smallest = idx;
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;

      if (left < length && this.#compare(this.#heap[left], this.#heap[smallest]) < 0) {
        smallest = left;
      }
      if (right < length && this.#compare(this.#heap[right], this.#heap[smallest]) < 0) {
        smallest = right;
      }
      if (smallest !== idx) {
        this.#swap(idx, smallest);
        idx = smallest;
      } else {
        break;
      }
    }
  }

  enqueue(task) {
    this.#heap.push(task);
    this.#bubbleUp(this.#heap.length - 1);
  }

  dequeue() {
    if (this.isEmpty) return null;
    const top = this.#heap[0];
    const last = this.#heap.pop();
    if (this.#heap.length > 0 && last !== undefined) {
      this.#heap[0] = last;
      this.#sinkDown(0);
    }
    return top;
  }

  peek() {
    return this.isEmpty ? null : this.#heap[0];
  }

  remove(taskId) {
    const idx = this.#heap.findIndex((t) => t.id === taskId);
    if (idx === -1) return false;

    const last = this.#heap.pop();
    if (idx < this.#heap.length && last !== undefined) {
      this.#heap[idx] = last;
      this.#bubbleUp(idx);
      this.#sinkDown(idx);
    }
    return true;
  }

  rebuild(tasks) {
    this.#heap = [...tasks];
    for (let i = Math.floor(this.#heap.length / 2) - 1; i >= 0; i--) {
      this.#sinkDown(i);
    }
  }

  toSortedArray() {
    return [...this.#heap].sort((a, b) => this.#compare(a, b));
  }

  clear() {
    this.#heap = [];
  }
}

module.exports = PriorityQueue;
