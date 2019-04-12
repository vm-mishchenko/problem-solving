const expect = require('chai').expect;

const {createCircularSequence} = require('./circular-linked-list');
const {createSequence} = require('./linked-list');

const isCircularList = (head) => {
  if (!head) {
    return false;
  }

  let currentItem = head;

  while (currentItem && currentItem.next !== head) {
    currentItem = currentItem.next;
  }

  return Boolean(currentItem);
};

describe('is-circular-list', () => {
  it('should work', () => {
    expect(isCircularList(createCircularSequence([1, 2]))).to.equal(true);
    expect(isCircularList(createSequence([1, 2]))).to.equal(false);
  });
});
