const expect = require('chai').expect;

const {createSequence} = require('./linked-list');

const findNthFromTheEnd_hashTable = (head, index) => {
  if (!head) {
    return null;
  }

  const table = {};

  // build table
  let currentIndex = 0;
  let currentNode = head;

  do {
    table[currentIndex] = currentNode;

    currentIndex++;
    currentNode = currentNode.next;
  } while (currentNode);

  // return result
  return table[/* list size = */currentIndex - index - 1];

};

const findNthFromTheEnd_twoPointers = (head, index) => {
  if (!head) {
    return undefined;
  }

  let itemPointer;
  let fastPointer = head;
  let currentIndex = 0;

  while (fastPointer.next) {
    if (currentIndex >= index) {
      if (!itemPointer) {
        itemPointer = head;
      }

      itemPointer = itemPointer.next;
    }

    currentIndex++;
    fastPointer = fastPointer.next;
  }

  return itemPointer;
};

describe('nth-node-from-the-end', () => {
  it('should return based on hash table', () => {
    let node = findNthFromTheEnd_hashTable(createSequence([1, 2, 3]), 0);
    expect(node.data).to.equal(3);

    node = findNthFromTheEnd_hashTable(createSequence([1, 2, 3]), 1);
    expect(node.data).to.equal(2);

    node = findNthFromTheEnd_hashTable(createSequence([1, 2, 3]), 5);
    expect(node).to.equal(undefined);
  });

  it('should return based on hash table', () => {
    let node = findNthFromTheEnd_twoPointers(createSequence([1, 2, 3]), 0);
    expect(node.data).to.equal(3);

    node = findNthFromTheEnd_twoPointers(createSequence([1, 2, 3]), 1);
    expect(node.data).to.equal(2);

    node = findNthFromTheEnd_twoPointers(createSequence([1, 2, 3]), 5);
    expect(node).to.equal(undefined);
  });
});
