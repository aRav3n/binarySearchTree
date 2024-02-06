// nodeFactory return { data, leftNode, rightNode }
const nodeFactory = function (data, leftBranch, rightBranch, nodeLevel) {
  return { data, leftBranch, rightBranch, nodeLevel };
};

// buildTree(array) return { rootNode }
const buildTree = function (array) {
  const filterArray = function (array) {
    const arrayDuplicatesRemoved = [];

    array.forEach((item) => {
      if (!arrayDuplicatesRemoved.includes(item)) {
        arrayDuplicatesRemoved.push(item);
      }
    });

    const arraySorted = array.sort(function (a, b) {
      return a - b;
    });

    return arraySorted;
  };

  const getRootNode = function (array, startPoint, endPoint, parentLevel) {
    if (startPoint > endPoint) {
      return null;
    }
    let thisLevel;
    if (parentLevel === undefined) {
      thisLevel = 0;
    } else {
      thisLevel = parentLevel + 1;
    }
    const midPoint = (startPoint + endPoint) / 2;
    const leftBranch = getRootNode(array, startPoint, midPoint - 1, thisLevel);
    const rightBranch = getRootNode(array, midPoint + 1, endPoint, thisLevel);

    const rootNode = nodeFactory(
      array[midPoint],
      leftBranch,
      rightBranch,
      thisLevel
    );

    return { rootNode };
  };

  const arrayEnd = array.length - 1;

  const rootNode = getRootNode(filterArray(array), 0, arrayEnd);

  return rootNode;
};

// treeFactory(array) return { rootNode }
const treeFactory = function (array) {
  const rootNode = buildTree(array);

  return { rootNode };
};

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
const inOrder = function (rootNode, callback) {
  if (callback !== undefined) {
    inOrder(rootNode.leftBranch, callback);
    callback(rootNode);
    inOrder(rootNode.rightBranch, callback);
  } else {
    const array = [];
    inOrder(rootNode.leftBranch);
    array.push(rootNode.data);
    inOrder(rootNode.rightBranch);
    return array;
  }
};

// preOrder(callback) if !callback return { array }
const preOrder = function (rootNode, callback) {
  if (callback !== undefined) {
    callback(rootNode);
    preOrder(rootNode.leftBranch, callback);
    preOrder(rootNode.rightBranch, callback);
  } else {
    const array = [];
    array.push(rootNode.data);
    preOrder(rootNode.leftBranch);
    preOrder(rootNode.rightBranch);
    return array;
  }
}

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
