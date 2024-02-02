// nodeFactory return { data, leftNode, rightNode }

// treeFactory(array) return { rootNode }

// buildTree(array) return { rootNode }

// test function. src: https://www.theodinproject.com/lessons/javascript-binary-search-trees#assignment
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// inOrder(callback) if !callback return { array }

// preOrder(callback) if !callback return { array }

// postOrder(callback) if !callback return { array }

/* reBalance(rootNode)
Use a traversal method to provide a sorted array then create new tree from this array
*/

/* insert(value) 
Don't use an array to do this, traverse and manipulate the nodes instead */

/* delete(value) 
Don't use an array to do this, traverse and manipulate the nodes instead */

// find(value) return { nodeWithValue }

/* levelOrder(callbackFunction)
Traverse in breadth first, execute callback on all nodes at this level
If no callback return { [values] }
Use an array as a queue to keep track of all child nodes yet to traverse
*/

// height(node) return { height }

// depth(node) return { depthOfThisNode }

// isBalanced() return { boolean }

/* test()
Create BST from random array.length <100
Call isBalanced() to confirm
Print out all elements in level, pre, post, and in order
Unbalance the tree by adding several numbers > 100
Confirm that the tree is unbalanced by calling isBalanced
Balance the tree by calling reBalance()
Confirm that the tree is balanced by calling isBalanced()
Print out all elements in level, pre, post, and in order
*/
