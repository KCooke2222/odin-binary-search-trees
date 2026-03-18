class Node {
  constructor(data, left, right) {
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
}

export { Tree };
