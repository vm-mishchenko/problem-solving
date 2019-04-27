const expect = require('chai').expect;
const {buildTree, BinaryTreeNode} = require('../binary/binary-tree-base');

const lowestCommonAncestor = (root, aData, bData) => {
  if (!root) {
    return null
  }

  // make sure that aData is less then bData
  if (aData > bData) {
    const temp = aData;
    bData = aData;
    aData = temp;
  }

  while (root) {
    if (aData <= root.data && bData >= root.data) {
      // find it!
      return root;
    } else if (root.data > aData && root.data > bData) {
      root = root.left;
    } else if (root.data < aData && root.data < bData) {
      root = root.right;
    }
  }

  return root;
};

const isBSTreeMinMaxValues = (root) => {
  const isBSTNode = (node, min, max) => {
    if (!node) {
      // empty tree is valid BST
      return true;
    }

    let isCurrentNodeOk = true;

    if (min) {
      isCurrentNodeOk = node.data > min;
    }

    if (max && isCurrentNodeOk) {
      isCurrentNodeOk = node.data < max;
    }

    return isCurrentNodeOk && isBSTNode(node.left, min, node.data - 1) && isBSTNode(node.right, node.data + 1, max);
  };

  return isBSTNode(root, /* min = */null, /* max = */null);
};

const isBSTTreeInOrder = (root) => {
  // make in order traversal
  // store nodes in array
  // BST should produce ordered array

  let allNodes = [];
  const stack = [];

  let current = root;

  while (current) {
    stack.push(current);
    current = current.left;
  }

  while (stack.length) {
    current = stack.pop();

    allNodes.push(current);

    if (current.right) {
      current = current.right;

      while (current) {
        stack.push(current);
        current = current.left;
      }
    }
  }

  return !allNodes.length || Boolean(allNodes.reduce((prev, next) => {
    return prev && next.data >= prev.data && next;
  }));
};

// Base Tree
//            20
//          /    \
//        10      30
//       / \     / \
//      5  15   25  35
//         /\
//       13  17

describe('Binary search header tasks', () => {
  it('lowestCommonAncestor', () => {
    expect(
      lowestCommonAncestor(
        buildTree([20, [10, [5], [15, [13], [17]]], [30, [25], [35]]]),
        5, 13
      ).data
    ).to.equal(10);

    expect(
      lowestCommonAncestor(
        buildTree([20, [10, [5], [15, [13], [17]]], [30, [25], [35]]]),
        5, 35
      ).data
    ).to.equal(20);

    expect(
      lowestCommonAncestor(
        buildTree([20, [10, [5], [15, [13], [17]]], [30, [25], [35]]]),
        15, 13
      ).data
    ).to.equal(15);

    expect(
      lowestCommonAncestor(
        buildTree([20, [10, [5], [15, [13], [17]]], [30, [25], [35]]]),
        15, 15
      ).data
    ).to.equal(15);
  });

  it('isBSTreeMinMaxValues', () => {
    expect(isBSTreeMinMaxValues(buildTree([]))).to.equal(true);
    expect(isBSTreeMinMaxValues(buildTree([1, [], []]))).to.equal(true);
    expect(isBSTreeMinMaxValues(buildTree([20, [10, [5], [15, [13], [17]]], [30, [25], [35]]]))).to.equal(true);

    expect(isBSTreeMinMaxValues(buildTree([10, [100], [1]]))).to.equal(false);
    expect(isBSTreeMinMaxValues(buildTree([10, [5, [1], [1000]], [30]]))).to.equal(false);
  });

  it('isBSTTreeInOrder', () => {
    expect(isBSTTreeInOrder(buildTree([]))).to.equal(true);
    expect(isBSTTreeInOrder(buildTree([1, [], []]))).to.equal(true);
    expect(isBSTTreeInOrder(buildTree([20, [10, [5], [15, [13], [17]]], [30, [25], [35]]]))).to.equal(true);

    expect(isBSTTreeInOrder(buildTree([10, [100], [1]]))).to.equal(false);
    expect(isBSTTreeInOrder(buildTree([10, [5, [1], [1000]], [30]]))).to.equal(false);
  });
});
