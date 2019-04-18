// https://leetcode.com/problems/merge-two-sorted-lists
const expect = require('chai').expect;

const {createSequence, getCount, toArray} = require('./linked-list');

const mergeTwoLists = function (l1, l2) {
  if (!l1 && !l2) {
    return null;
  }

  if (l1 && !l2) {
    return l1;
  }

  if (l2 && !l1) {
    return l2;
  }

  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);

    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);

    return l2;
  }
};

describe('merge-two-list-sort', () => {
  it('should work', () => {
    const resultList = mergeTwoLists(
      createSequence([1, 2, 4]),
      createSequence([1, 3, 4])
    );

    expect(getCount(resultList)).to.equal(6);
    expect(toArray(resultList)).to.eql([1, 1, 2, 3, 4, 4]);
  })
});


