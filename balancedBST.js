class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(arr) {
    // sort and remove dupes
    arr = [...new Set(arr)].sort((a, b) => a - b);

    this.root = this.#buildTree(arr, 0, arr.length - 1);
  }

  #buildTree(arr, start, end) {
    // base
    if (start > end) return null;

    // recursive solution
    const mid = Math.floor((start + end) / 2);

    const node = new Node(
      arr[mid],
      this.#buildTree(arr, start, mid - 1),
      this.#buildTree(arr, mid + 1, end),
    );

    return node;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }

    this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }

  includes(value) {
    let cur = this.root;

    while (cur != null) {
      if (value < cur.data) {
        cur = cur.left;
      } else if (value > cur.data) {
        cur = cur.right;
      } else {
        return true;
      }
    }

    return false;
  }

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    let cur = this.root;

    while (cur != null) {
      if (value < cur.data) {
        if (cur.left === null) {
          cur.left = new Node(value);
          return;
        }
        cur = cur.left;
      } else if (value > cur.data) {
        if (cur.right === null) {
          cur.right = new Node(value);
          return;
        }
        cur = cur.right;
      } else {
        return; // already exists
      }
    }
  }

  deleteItem(value) {
    this.root = this.#deleteRec(this.root, value);
  }

  #deleteRec(node, value) {
    // traverse
    if (node === null) return null;

    if (value < node.data) {
      node.left = this.#deleteRec(node.left, value);
      return node;
    } else if (value > node.data) {
      node.right = this.#deleteRec(node.right, value);
      return node;
    }

    // 2 child
    if (node.left !== null && node.right !== null) {
      node.data = this.#min(node.right);
      node.right = this.#deleteRec(node.right, node.data);
      return node;
    }

    // 0 or 1 child
    return node.left !== null ? node.left : node.right;
  }

  #min(node) {
    while (node.left !== null) node = node.left;
    return node.data;
  }

  levelOrderForEach(callback) {
    if (!callback) {
      throw new Error("Callback required");
    }

    if (this.root === null) return;

    const q = [this.root];

    while (q.length > 0) {
      const node = q.shift();

      callback(node.data);

      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
  }

  inOrderForEach(callback) {
    if (!callback) {
      throw new Error("Callback required");
    }
    this.#inOrderRec(this.root, callback);
  }

  #inOrderRec(node, callback) {
    if (node === null) return;

    this.#inOrderRec(node.left, callback);
    callback(node.data);
    this.#inOrderRec(node.right, callback);
  }

  preOrderForEach(callback) {
    if (!callback) {
      throw new Error("Callback required");
    }
    this.#preOrderRec(this.root, callback);
  }

  #preOrderRec(node, callback) {
    if (node === null) return;

    callback(node.data);
    this.#preOrderRec(node.left, callback);
    this.#preOrderRec(node.right, callback);
  }

  postOrderForEach(callback) {
    if (!callback) {
      throw new Error("Callback required");
    }
    this.#postOrderRec(this.root, callback);
  }

  #postOrderRec(node, callback) {
    if (node === null) return;

    this.#postOrderRec(node.left, callback);
    this.#postOrderRec(node.right, callback);
    callback(node.data);
  }

  height(value) {
    let cur = this.root;

    // find node
    while (cur != null) {
      if (value < cur.data) {
        cur = cur.left;
      } else if (value > cur.data) {
        cur = cur.right;
      } else {
        break; // found node
      }
    }

    if (cur === null) return undefined;

    // dfs
    return this.#heightOfNode(cur);
  }

  #heightOfNode(node) {
    if (node === null) return -1;
    return (
      Math.max(this.#heightOfNode(node.left), this.#heightOfNode(node.right)) +
      1
    );
  }

  depth(value) {
    let cur = this.root;
    let depth = 0;

    // find node
    while (cur != null) {
      if (value < cur.data) {
        depth++;
        cur = cur.left;
      } else if (value > cur.data) {
        depth++;
        cur = cur.right;
      } else {
        break; // found node
      }
    }

    if (cur === null) return undefined;

    return depth;
  }

  isBalanced() {
    return this.#isBalancedRec(this.root)[0];
  }

  #isBalancedRec(node) {
    if (node === null) return [true, -1];

    const left = this.#isBalancedRec(node.left);
    const right = this.#isBalancedRec(node.right);

    const balanced = left[0] && right[0] && Math.abs(left[1] - right[1]) <= 1;

    const height = 1 + Math.max(left[1], right[1]);

    return [balanced, height];
  }

  rebalance() {
    const arr = [];

    this.inOrderForEach((value) => {
      arr.push(value);
    });

    this.root = this.#buildTree(arr, 0, arr.length - 1);
  }
}

export { Tree };
