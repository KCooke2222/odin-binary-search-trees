import { Tree } from "./balancedBST.js";

function randomArray(size = 10, max = 100) {
  const arr = [];

  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * max));
  }

  return arr;
}

function printAllTraversals(tree) {
  const level = [];
  const pre = [];
  const post = [];
  const inorder = [];

  tree.levelOrderForEach((value) => level.push(value));
  tree.preOrderForEach((value) => pre.push(value));
  tree.postOrderForEach((value) => post.push(value));
  tree.inOrderForEach((value) => inorder.push(value));

  console.log("Level order:", level.join(", "));
  console.log("Preorder:", pre.join(", "));
  console.log("Postorder:", post.join(", "));
  console.log("Inorder:", inorder.join(", "));
}

const arr = randomArray(100, 10000);
console.log("Random array:", arr);

const tree = new Tree(arr);

console.log("\nBalanced?", tree.isBalanced());
printAllTraversals(tree);
tree.prettyPrint();

// unbalance tree
tree.insert(101);
tree.insert(102);
tree.insert(103);
tree.insert(104);
tree.insert(105);

console.log("\nBalanced after inserts?", tree.isBalanced());
printAllTraversals(tree);
tree.prettyPrint();

// rebalance
tree.rebalance();

console.log("\nBalanced after rebalance?", tree.isBalanced());
printAllTraversals(tree);
tree.prettyPrint();
