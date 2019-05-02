const expect = require('chai').expect;

class MaxHeap {
  constructor() {
    this.array = [];
    this.count = 0;
  }
}

const insert = (heap, data) => {
  heap.count++;

  let parentIndex;
  let index = heap.count - 1;

  while (index > 0 && data > heap.array[Math.floor((index - 1) / 2)]) {
    parentIndex = Math.floor((index - 1) / 2);
    heap.array[index] = heap.array[parentIndex];
    index = parentIndex;
  }

  heap.array[index] = data;
};

// remove root element
const remove = (heap) => {
  if (!heap.count) {
    return null;
  }

  heap.count--;

  // remove first element
  const data = heap.array.shift();

  // remove last element
  const lastData = heap.array.pop();

  // replace last to first element
  heap.array.unshift(lastData);

  perlocateDown(heap, 0);

  return data;
};

const getLeftChild = (heap, index) => {
  const leftIndex = getLeftIndex(heap, index);

  if (!leftIndex) {
    return null;
  }

  return heap.array[leftIndex];
};

const getRightChild = (heap, index) => {
  const rightIndex = getRightIndex(heap, index);

  if (!rightIndex) {
    return null;
  }

  return heap.array[rightIndex];
};

const getLeftIndex = (heap, index) => {
  const leftIndex = (index * 2) + 1;

  if (leftIndex > heap.count) {
    return null;
  }

  return leftIndex;
};

const getRightIndex = (heap, index) => {
  const rightIndex = index * 2 + 2;

  if (rightIndex > heap.count) {
    return null;
  }

  return rightIndex;
};

const perlocateDown = (heap, index) => {
  // 1. find maximum of children and swap with that
  // 2. repeat for swapped child

  const leftIndex = getLeftIndex(heap, index);
  const rightIndex = getRightIndex(heap, index);
  let maxIndex = index;

  if (leftIndex && heap.array[leftIndex] > heap.array[index]) {
    maxIndex = leftIndex;
  }

  if (rightIndex && heap.array[rightIndex] > heap.array[maxIndex]) {
    maxIndex = rightIndex;
  }

  if (maxIndex !== index) {
    const temp = heap.array[maxIndex];

    heap.array[maxIndex] = heap.array[index];
    heap.array[index] = temp;

    perlocateDown(heap, maxIndex);
  }
};

describe('Queue heap', () => {
  it('insert', () => {
    // in order
    let heap = new MaxHeap();
    insert(heap, 31);
    insert(heap, 1);
    insert(heap, 21);

    expect(heap.array).to.eql([31, 1, 21]);

    // not in order
    heap = new MaxHeap();
    insert(heap, 1);
    insert(heap, 21);
    insert(heap, 31);

    expect(heap.array).to.eql([31, 1, 21]);
  });

  it('perlocateDown', () => {
    const heap = new MaxHeap();

    heap.count = 11;
    heap.array = [31, 1, 21, 9, 10, 12, 18, 3, 2, 8, 7];

    perlocateDown(heap, 1);

    expect(heap.array).to.eql([31, 10, 21, 9, 8, 12, 18, 3, 2, 1, 7])
  });

  it('remove', () => {
    const heap = new MaxHeap();
    insert(heap, 7);
    insert(heap, 8);
    insert(heap, 2);
    insert(heap, 3);
    insert(heap, 12);
    insert(heap, 18);
    insert(heap, 10);
    insert(heap, 9);
    insert(heap, 21);
    insert(heap, 1);
    insert(heap, 31);

    expect(remove(heap)).to.equal(31);
    expect(remove(heap)).to.equal(21);
    expect(remove(heap)).to.equal(18);
    expect(remove(heap)).to.equal(12);
    expect(remove(heap)).to.equal(10);
    expect(remove(heap)).to.equal(9);
    expect(remove(heap)).to.equal(8);
    expect(remove(heap)).to.equal(7);
    expect(remove(heap)).to.equal(3);
    expect(remove(heap)).to.equal(2);
    expect(remove(heap)).to.equal(1);
    expect(remove(heap)).to.equal(null);
  });
});
