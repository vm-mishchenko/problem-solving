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
  /*1) Create an empty stack S.
    2) Initialize current node as root
    3) Push the current node to S and set current = current->left until current is NULL
    4) If current is NULL and stack is not empty then
    a) Pop the top item from stack.
      b) Print the popped item, set current = popped_item->right
    c) Go to step 3.
    5) If current is NULL and stack is empty then we are done.*/

  if (!root) {
    return;
  }

  const stack = [];
  let currentNode = root;

  while (currentNode) {
    stack.push(currentNode);
    currentNode = currentNode.left;
  }

  while (stack.length) {
    // take the deepest left node
    currentNode = stack.pop();

    fn(currentNode);

    currentNode = currentNode.right;

    while (currentNode) {
      stack.push(currentNode);
      currentNode = currentNode.left;
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
  if (!metadata || metadata.length === 0 || metadata[0] === null) {
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
