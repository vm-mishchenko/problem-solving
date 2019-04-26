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

// simple insert in left free side
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

const getSizeRecursion = (root) => {
  if (!root) {
    return 0;
  }

  return getSizeRecursion(root.left) + 1 + getSizeRecursion(root.right);
};

const levelOrderReverse = (root, fn) => {
  if (!root) {
    return;
  }

  let current;
  const nodes = [];
  const stack = [root];

  while (stack.length) {
    current = stack.pop();

    nodes.push(current);

    if (current.left) {
      stack.push(current.left);
    }

    if (current.right) {
      stack.push(current.right);
    }
  }

  nodes.reverse().forEach((node) => {
    fn(node);
  });
};

const getHeightRecursive = (root) => {
  if (!root) {
    return 0;
  }

  const leftTreeHeight = getHeightRecursive(root.left);
  const rightTreeHeight = getHeightRecursive(root.right);

  if (leftTreeHeight > rightTreeHeight) {
    return leftTreeHeight + 1;
  } else {
    return rightTreeHeight + 1;
  }
};

const getHeightNonRecursive = (root) => {
  if (!root) {
    return 0;
  }

  let level = 1;

  let current;
  const stack = [root];

  while (stack.length) {
    current = stack.pop();

    if (current.left) {
      stack.push(current.left);
    }

    if (current.right) {
      stack.push(current.right);
    }

    if (current.left || current.right) {
      level++;
    }
  }

  return level;
};

const deepestNode = (root) => {
  if (!root) {
    return;
  }

  let deepest;
  const stack = [root];

  while (stack.length) {
    deepest = stack.pop();

    if (deepest.left) {
      stack.push(deepest.left);
    }

    if (deepest.right) {
      stack.push(deepest.right);
    }
  }

  return deepest;
};

const isTwoTreeStructurallyIdentical = (tree1, tree2) => {
  if (!tree1 && !tree2) {
    return true;
  }

  if (!tree1 || !tree2) {
    return false;
  }

  return tree1.data === tree2.data &&
    isTwoTreeStructurallyIdentical(tree1.left) === isTwoTreeStructurallyIdentical(tree2.left) &&
    isTwoTreeStructurallyIdentical(tree1.right) === isTwoTreeStructurallyIdentical(tree2.right)
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

  it('getSizeRecursion ', () => {
    expect(getSizeRecursion(buildTree([1, [2, [3], [4]], [3, [5], [6]]]))).to.equal(7);
  });

  it('levelOrderReverse', () => {
    const values = [];

    levelOrderReverse(buildTree([1, [2, [4], [5]], [3]]), (node) => {
      values.push(node.data)
    });

    expect(values).to.eql([4, 5, 2, 3, 1]);
  });

  it('getHeightRecursive', () => {
    expect(getHeightRecursive(buildTree([1, [2, [4], [5]], [3]]))).to.equal(3);
  });

  it('getTreeHeight', () => {
    expect(getHeightNonRecursive(buildTree([1, [2, [4], [5]], [3]]))).to.equal(3);
  });

  it('deepestNode', () => {
    expect(deepestNode(buildTree([1, [2, [4], [5]], [3]])).data).to.equal(4);
  });

  it('isTwoTreeStructurallyIdentical', () => {
    const tree1 = buildTree([1, [2, [4], [5]], [3]]);
    expect(isTwoTreeStructurallyIdentical(tree1, tree1)).to.equal(true);

    const tree2 = buildTree([9, [2, [4], [5]], [3]]);
    expect(isTwoTreeStructurallyIdentical(tree1, tree2)).to.equal(false);
  });
});
