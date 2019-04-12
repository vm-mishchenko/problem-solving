const expect = require('chai').expect;

const {LinkedList} = require('./linked-list');

const createCircularSequence = (/* items in the list = */arr) => {
  if (arr.length === 0) {
    return null;
  }

  const head = new LinkedList(arr[0]);
  let currentHead = head;

  arr.slice(1).forEach((data) => {
    currentHead.next = new LinkedList(data);

    currentHead = currentHead.next;
  });

  currentHead.next = head;

  return head;
};

exports.createCircularSequence = createCircularSequence;

const getCount = (head) => {
  let count = 0;

  if (!head) {
    return count;
  }

  let currentItem = head;

  do {
    count++;
    currentItem = currentItem.next;
  } while (currentItem !== head);

  return count;
};

const getLastItem = (head) => {
  let currentItem = head;

  while (currentItem.next !== head) {
    currentItem = currentItem.next;
  }

  return currentItem;
};

const insertAtTheEnd = (head, data) => {
  if (!head) {
    return;
  }

  const newItem = new LinkedList(data);
  newItem.next = head;

  let currentItem = head;

  while (currentItem.next !== head) {
    currentItem = currentItem.next;
  }

  currentItem.next = newItem;
};

const insertAtTheStart = (head, data) => {
  const newItem = new LinkedList(data);

  if (!head) {
    return newItem;
  }

  newItem.next = head;

  let currentItem = head;

  while (currentItem.next !== head) {
    currentItem = currentItem.next;
  }

  currentItem.next = newItem;

  return newItem;
};

const deleteFirstNode = () => {
  // todo: continue here
};

const deleteLastNode = () => {
  // todo: continue here
};

describe('Circular Linked List', () => {
  it('create circular linked list', () => {
    const head = createCircularSequence([1, 2, 3]);

    expect(head.data).to.equal(1);
    expect(head.next.data).to.equal(2);
    expect(head.next.next.data).to.equal(3);
    expect(head.next.next.next).to.equal(head);
  });

  it('should return count', () => {
    expect(getCount(createCircularSequence([]))).to.equal(0);
    expect(getCount(createCircularSequence([1]))).to.equal(1);
    expect(getCount(createCircularSequence([1, 2]))).to.equal(2);
    expect(getCount(createCircularSequence([1, 2, 3]))).to.equal(3);
  });

  it('should return last item', () => {
    const head = createCircularSequence([1, 2, 3]);

    expect(getLastItem(head).data).to.equal(3);
  });

  it('should insert at the end', () => {
    const head = createCircularSequence([1, 2, 3]);

    insertAtTheEnd(head, 4);

    expect(getCount(head)).to.equal(4);
    expect(getLastItem(head).data).to.equal(4);
  });

  it('should insert at the start', () => {
    let head = createCircularSequence([1, 2, 3]);

    head = insertAtTheStart(head, 4);

    expect(getCount(head)).to.equal(4);
    expect(head.data).to.equal(4);
  });
});
