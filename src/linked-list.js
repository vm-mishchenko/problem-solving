const expect = require('chai').expect;

class LinkedList {
  constructor(data) {
    this.next = null;
    this.data = data;
  }
}

exports.LinkedList = LinkedList;

// insert item and return new head
const insertItem = (head, data, index) => {
  // insert in the beginning
  if (index === 0) {
    const insertedItem = new LinkedList(data);
    insertedItem.next = head;

    return insertedItem;
  }

  // insert in the middle
  let currentIndex = 0;
  let currentList = head;

  // find item before inserted index
  while (currentList && currentIndex < index - 1) {
    currentIndex++;
    currentList = currentList.next;
  }

  if (currentList) {
    const newItem = new LinkedList(data);
    newItem.next = currentList.next;
    currentList.next = newItem;
  }
};

const deleteItem = (head, index) => {
  if (index === 0) {
    return head.next;
  }

  let currentIndex = 0;
  let currentItem = head;

  while (currentItem && currentIndex < index - 1) {
    currentIndex++;
    currentItem = currentItem.next;
  }

  if (currentItem) {
    currentItem.next = currentItem.next.next;
  }
};

const createSequence = (/* items in the list = */arr) => {
  const head = new LinkedList(arr[0]);
  let currentHead = head;

  arr.slice(1).forEach((data) => {
    currentHead.next = new LinkedList(data);

    currentHead = currentHead.next;
  });

  return head;
};

const getCount = (head) => {
  let count = 1;
  let currentItem = head;

  while (currentItem.next) {
    count++;

    currentItem = currentItem.next;
  }

  return count;
};

const getLastItem = (head) => {
  let currentItem = head;

  while (currentItem.next) {
    currentItem = currentItem.next;
  }

  return currentItem;
};

describe('Linked list: basic', function () {
  describe('insert item', function () {
    it('should insert at the beginning', () => {
      let head = new LinkedList(1);
      head = insertItem(head, 0, 0);

      expect(head.data).to.equal(0);
    });

    it('should insert in the middle', () => {
      const head = createSequence([1, 2, 3]);

      insertItem(head, 'inserted', 1);

      expect(head.next.data).to.equal('inserted');
    });

    it('should insert at the end', () => {
      const head = createSequence([1, 2, 3]);
      expect(getCount(head)).to.equal(3);

      insertItem(head, 'inserted', 3);

      expect(getLastItem(head).data).to.equal('inserted');
      expect(getCount(head)).to.equal(4);
    });
  });

  describe('delete item', () => {
    it('should delete at the beginning', () => {
      let head = createSequence([1, 2, 3]);

      head = deleteItem(head, 0);
      expect(getCount(head)).to.equal(2);
      expect(head.data).to.equal(2);
    });

    it('should delete at the middle', () => {
      let head = createSequence([1, 2, 3]);

      deleteItem(head, 1);
      expect(getCount(head)).to.equal(2);
      expect(head.data).to.equal(1);
    });

    it('should delete at the end', () => {
      let head = createSequence([1, 2, 3]);

      deleteItem(head, 2);
      expect(getCount(head)).to.equal(2);
      expect(head.data).to.equal(1);
    });
  });

  describe('helpers', () => {
    it('should return count', () => {
      const head = new LinkedList(0);
      expect(getCount(head)).to.equal(1);

      head.next = new LinkedList(1);
      expect(getCount(head)).to.equal(2);
    });

    it('should create sequence', () => {
      const head = createSequence([1, 2]);

      expect(getCount(head)).to.equal(2);
      expect(head.data).to.equal(1);
      expect(head.next.data).to.equal(2);
    });

    it('should return last item', () => {
      const head = createSequence([1, 2]);

      expect(getLastItem(head).data).to.equal(2);
    });
  });
});
