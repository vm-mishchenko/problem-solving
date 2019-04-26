const expect = require('chai').expect;

const {buildTree, BinaryTreeNode} = require('../binary/binary-tree-base');

const findElementRecursive = (root, data) => {
  if (!root) {
    return null;
  }

  if (root.data === data) {
    return root;
  } else if (data < root.data) {
    return findElementRecursive(root.left, data);
  } else {
    return findElementRecursive(root.right, data);
  }
};

const findElementNonRecursive = (root, data) => {
  if (!root) {
    return null;
  }

  while (root) {
    if (root.data === data) {
      return root;
    } else {
      if (root.left && data < root.data) {
        root = root.left;
      } else if (root.right && data > root.data) {
        root = root.right;
      }
    }
  }

  return null;
};

const findMaxElementRecursive = (root) => {
  if (!root) {
    return null;
  }

  if (root.right) {
    return root.right;
  } else {
    return root;
  }
};

const findMinElementRecursive = (root) => {
  if (!root) {
    return null
  }

  if (root.left) {
    return findMinElementRecursive(root.left);
  } else {
    return root;
  }
};

const findMinElementNonRecursive = (root) => {
  if (!root) {
    return null;
  }

  while (root) {
    if (root.left) {
      root = root.left;
    } else {
      return root;
    }
  }
};

// element always will be inserted at the end of the tree
// the question is just defined which sub-tree: left or right
const insertElement = (root, data) => {
  if (!root) {
    return new BinaryTreeNode(data);
  }

  if (root.data === data) {
    // element already inserted, do nothing
  } else {
    if (data < root.data) {
      root.left = insertElement(root.left, data);
    } else if (data > root.data) {
      root.right = insertElement(root.right, data);
    }
  }

  return root;
};

const deleteElement = (root, data) => {
  if (!root) {
    return null;
  }

  if (root.data === data) {
    if (root.left || root.right) {
      if (root.left && root.right) {
        // has both children
        const tempMaxLeftNode = findMaxElementRecursive(root.left);
        root.left = deleteElement(root, tempMaxLeftNode.data);
        root.data = tempMaxLeftNode.data;
      } else {
        // has one children
        return root.left || root.right;
      }
    } else {
      // has no children
      return null;
    }
  } else {
    if (data < root.data) {
      root.left = deleteElement(root.left, data);
    } else if (data > root.data) {
      root.right = deleteElement(root.right, data);
    }
  }

  return root;
};

// Base Tree
//            20
//          /    \
//        10      30
//       / \     / \
//      5  15   25  35
//         /\
//       13  17

describe('Binary search simple tasks', () => {
  it('findElementRecursive', () => {
    expect(findElementRecursive(buildTree([20, [10, [5], [15, [13], [17]]], [30, [25], [35]]]), 15).data).to.equal(15);
  });

  it('findElementNonRecursive', () => {
    expect(findElementNonRecursive(buildTree([20, [10, [5], [15, [13], [17]]], [30, [25], [35]]]), 15).data).to.equal(15);
  });

  it('findMinElementRecursive', () => {
    expect(findMinElementRecursive(buildTree([20, [10, [5], [15, [13], [17]]], [30, [25], [35]]])).data).to.equal(5);
  });

  it('findMinElementNonRecursive', () => {
    expect(findMinElementNonRecursive(buildTree([20, [10, [5], [15, [13], [17]]], [30, [25], [35]]])).data).to.equal(5);
  });

  it('insertElement', () => {
    // insert in most right position
    let newTree = insertElement(
      buildTree([20, [10, [5], [15, [13], [17]]], [30, [25], [35]]]),
      13
    );
    expect(findElementRecursive(newTree, 13).data).to.equal(13);
    // expect(newTree.right.right.right.data).to.equal(40);

    // insert in most left position
    newTree = insertElement(
      buildTree([20, [10, [5], [15, [13], [17]]], [30, [25], [35]]]),
      2
    );
    expect(findElementRecursive(newTree, 2).data).to.equal(2);
    expect(newTree.left.left.left.data).to.equal(2);

    // insert in the middle
    newTree = insertElement(
      buildTree([20, [10, [5], [15, [13], [17]]], [30, [25], [35]]]),
      32
    );
    expect(findElementRecursive(newTree, 32).data).to.equal(32);
    expect(newTree.right.right.left.data).to.equal(32);
  });

  it('deleteElement', () => {
    let tree;
    // delete node without children
    tree = buildTree([20, [10, [5], [15, [13], [17]]], [30, [25], [35]]]);
    tree = deleteElement(tree, 35);
    expect(findElementRecursive(tree, 35)).to.equal(null);
    expect(tree.right.right).to.equal(null);

    // delete node with one child
    tree = buildTree([20, [10, [5], [15, [13], [17]]], [30, [25], [35, [], [37]]]]);
    tree = deleteElement(tree, 35);
    expect(findElementRecursive(tree, 35)).to.equal(null);
    expect(tree.right.right.data).to.equal(37);

    // delete node at the middle
    tree = buildTree([20, [10, [5, [3], [8]], [15, [13], [17]]], [30, [25], [35]]]);
    tree = deleteElement(tree, 10);
    expect(findElementRecursive(tree, 10)).to.equal(null);
    expect(tree.left.data).to.equal(8);
  });
});
