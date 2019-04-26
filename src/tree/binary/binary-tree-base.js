const expect = require('chai').expect;

class BinaryTreeNode {
  constructor(data, left, right) {
    this.left = left;
    this.right = right;
    this.data = data;
  }
}

exports.BinaryTreeNode = BinaryTreeNode;

const preOrderRecursive = (root, fn) => {
  if (root) {
    fn(root);
    preOrderRecursive(root.left, fn);
    preOrderRecursive(root.right, fn);
  }
};

const preOrderNonRecursive = (root, fn) => {
  if (!root) {
    return;
  }

  let currentNode;
  const stack = [root];

  while (stack.length) {
    currentNode = stack.pop();

    fn(currentNode);

    if (currentNode.right) {
      stack.push(currentNode.right);
    }

    if (currentNode.left) {
      stack.push(currentNode.left);
    }
  }
};

const inOrderRecursive = (root, fn) => {
  if (!root) {
    return;
  }

  inOrderRecursive(root.left, fn);
  fn(root);
  inOrderRecursive(root.right, fn);
};

const inOrderNonRecursive = (root, fn) => {
  if (!root) {
    return;
  }

  const stack = [root];
  let currentNode = root.left;

  while (currentNode) {
    if (currentNode.left) {
      stack.push(currentNode);
      currentNode = currentNode.left;
    } else {
      fn(currentNode);
      currentNode = null;
    }
  }

  while (stack.length) {
    currentNode = stack.pop();

    fn(currentNode);

    if (currentNode.right) {
      stack.push(currentNode.right);

      currentNode = currentNode.right.left;

      while (currentNode) {
        if (currentNode.left) {
          stack.push(currentNode);
          currentNode = currentNode.left;
        } else {
          fn(currentNode);
          currentNode = null;
        }
      }
    }
  }
};

const postOrderRecursive = (root, fn) => {
  if (!root) {
    return;
  }

  postOrderRecursive(root.left, fn);
  postOrderRecursive(root.right, fn);
  fn(root);
};

const postOrderNonRecursive = (root, fn) => {
  if (!root) {
    return;
  }

  let prev;
  let currentNode;
  const stack = [root];

  while (stack.length) {
    currentNode = stack[stack.length - 1];

    if (!prev || prev.left === currentNode || prev.right === currentNode) {
      if (currentNode.left) {
        stack.push(currentNode.left);
      } else if (currentNode.right) {
        stack.push(currentNode.right);
      } else {
        fn(currentNode);
        stack.pop();
      }
    } else if (currentNode.left === prev) {
      if (currentNode.right) {
        stack.push(currentNode.right);
      }
    } else if (currentNode.right === prev) {
      fn(currentNode);
      stack.pop();
    }

    prev = currentNode;
  }
};

const levelOrderTraversal = (root, fn) => {
  const stack = [root];
  let currentNode;

  while (stack.length) {
    currentNode = stack.shift();

    if (currentNode.left) {
      stack.push(currentNode.left)
    }

    if (currentNode.right) {
      stack.push(currentNode.right)
    }

    fn(currentNode);
  }
};

exports.levelOrderTraversal = levelOrderTraversal;

const deleteElement = () => {
};

const buildTree = (metadata) => {
  if (!metadata) {
    return null;
  }

  const value = metadata[0];
  const left = metadata[1];
  const right = metadata[2];

  return new BinaryTreeNode(value, buildTree(left), buildTree(right));
};

exports.buildTree = buildTree;

describe('Binary tree base:', () => {
  it('preOrderRecursive', () => {
    const values = [];

    preOrderRecursive(buildTree([1, [2], [3]]), (node) => {
      values.push(node.data)
    });

    expect(values).to.eql([1, 2, 3]);
  });

  it('preOrderNonRecursive', () => {
    const values = [];

    preOrderNonRecursive(buildTree([1, [2, [3], [4]], [3, [5], [6]]]), (node) => {
      values.push(node.data)
    });

    expect(values).to.eql([1, 2, 3, 4, 3, 5, 6]);
  });

  it('inOrderRecursive', () => {
    const values = [];

    inOrderRecursive(buildTree([1, [2, [4], [5]], [3]]), (node) => {
      values.push(node.data)
    });

    expect(values).to.eql([4, 2, 5, 1, 3]);
  });

  it('inOrderNonRecursive', () => {
    const values = [];

    inOrderNonRecursive(buildTree([1, [2, [4], [5]], [3]]), (node) => {
      values.push(node.data)
    });

    expect(values).to.eql([4, 2, 5, 1, 3]);
  });

  it('postOrderRecursive', () => {
    const values = [];

    postOrderRecursive(buildTree([1, [2, [4], [5, [6], [7]]], [3]]), (node) => {
      values.push(node.data)
    });

    expect(values).to.eql([4, 6, 7, 5, 2, 3, 1]);
  });

  it('postOrderNonRecursive', () => {
    const values = [];

    postOrderNonRecursive(buildTree([1, [2, [4], [5, [6], [7]]], [3]]), (node) => {
      values.push(node.data)
    });

    expect(values).to.eql([4, 6, 7, 5, 2, 3, 1]);
  });

  it('levelOrderTraversal', () => {
    const values = [];

    levelOrderTraversal(buildTree([1, [2, [4], [5, [6], [7]]], [3]]), (node) => {
      values.push(node.data)
    });

    expect(values).to.eql([1, 2, 3, 4, 5, 6, 7]);
  });

  describe('tools', () => {
    it('build tree', () => {
      const tree = buildTree(
        [1, [2], [3]]
      );

      expect(tree.data).to.equal(1);
      expect(tree.left.data).to.equal(2);
      expect(tree.right.data).to.equal(3);
    });
  });
});
