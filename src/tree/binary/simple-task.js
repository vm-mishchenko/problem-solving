const expect = require('chai').expect;

const {buildTree, levelOrderTraversal, BinaryTreeNode} = require('./binary-tree-base');

const simpleTask = (root) => {
  let max;

  levelOrderTraversal(root, (node) => {
    if (!max || max < node.data) {
      max = node.data;
    }
  });

  return max;
};

const maxSizeRecursion = (root) => {
  if (!root) {
    return null;
  }

  const maxSizeLeft = maxSizeRecursion(root.left);
  const maxSizeRight = maxSizeRecursion(root.right);

  if (!maxSizeLeft && !maxSizeRight) {
    return root.data;
  }

  if (maxSizeLeft) {
    if (maxSizeLeft > root.data) {
      if (maxSizeRight) {
        return maxSizeLeft > maxSizeRight ? maxSizeLeft : maxSizeRight;
      }
    }
  } else {
    return maxSizeRight > root.data ? maxSizeRight : root.data;
  }
};

const maxSizeNonRecursion = (root) => {
  let max;
  let currentNode;
  const stack = [root];

  while (stack.length) {
    currentNode = stack.pop();

    if (!max || currentNode.data > max) {
      max = currentNode.data;
    }

    if (currentNode.left) {
      stack.push(currentNode.left);
    }

    if (currentNode.right) {
      stack.push(currentNode.right);
    }
  }

  return max;
};

const isPresentRecursion = (root, num) => {
  if (!root) {
    return false;
  }

  if (root.data === num) {
    return true;
  }

  return isPresentRecursion(root.left, num) || isPresentRecursion(root.right, num);
};

const isPresentNonRecursion = (root, num) => {
  if (!root) {
    return false;
  }

  let current;
  let isPresent = false;
  const stack = [root];

  while (stack.length && !isPresent) {
    current = stack.pop();

    if (current.data === num) {
      isPresent = true;
    }

    if (current.left) {
      stack.push(current.left);
    }

    if (current.right) {
      stack.push(current.right);
    }
  }

  return isPresent;
};

const insertNode = (root, num) => {
  const newNode = new BinaryTreeNode(num);

  if (!root) {
    return newNode;
  }

  let isInserted = false;
  let current;
  const stack = [root];

  while (stack.length && !isInserted) {
    current = stack.pop();

    if (current.left) {
      stack.push(current.left);
    }

    if (!current.left) {
      current.left = newNode;
      isInserted = true;
    } else if (!current.right) {
      current.right = newNode;
      isInserted = true;
    }
  }

  return root;
};

describe('Simple task', () => {
  it('simpleTask', () => {
    expect(simpleTask(buildTree([1, [2, [3], [4]], [3, [5], [6]]]))).to.equal(6);
  });

  it('maxSizeRecursion', () => {
    expect(maxSizeRecursion(buildTree([1, [2, [3], [4]], [3, [5], [6]]]))).to.equal(6);
  });

  it('maxSizeNonRecursion', () => {
    expect(maxSizeNonRecursion(buildTree([1, [2, [3], [4]], [3, [5], [6]]]))).to.equal(6);
  });

  it('isPresentRecursion', () => {
    expect(isPresentRecursion(buildTree([1, [2, [3], [4]], [3, [5], [6]]]), 5)).to.equal(true);
  });

  it('isPresentNonRecursion', () => {
    expect(isPresentNonRecursion(buildTree([1, [2, [3], [4]], [3, [5], [6]]]), 5)).to.equal(true);
  });

  it('insertNode as root', () => {
    const tree = insertNode(null, 1);

    expect(tree.data).to.equal(1);
  });

  it('insertNode as child', () => {
    const tree = insertNode(new BinaryTreeNode(1), 2);

    expect(tree.left.data).to.equal(2);
  });
});
