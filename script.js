// nodeFactory return { data, leftNode, rightNode }
const nodeFactory = function (data, leftBranch, rightBranch) {
  return { data, leftBranch, rightBranch, nodeLevel };
};

// buildTree(array) return { rootNode }
const buildTree = function (array) {
  const filterArray = function (array) {
    const arrayDuplicatesRemoved = [];

    array.forEach((item) => {
      const number = Number(item);
      if (!arrayDuplicatesRemoved.includes(number)) {
        arrayDuplicatesRemoved.push(number);
      }
    });

    const arraySorted = array.sort(function (a, b) {
      return a - b;
    });

    return arraySorted;
  };

  const getRootNode = function (array, startPoint, endPoint) {
    if (startPoint > endPoint) {
      return null;
    }
    const midPoint = (startPoint + endPoint) / 2;
    const leftBranch = getRootNode(array, startPoint, midPoint - 1);
    const rightBranch = getRootNode(array, midPoint + 1, endPoint);

    const rootNode = nodeFactory(array[midPoint], leftBranch, rightBranch);

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
};

// postOrder(callback) if !callback return { array }
const postOrder = function (rootNode, callback) {
  if (callback !== undefined) {
    postOrder(rootNode.leftBranch);
    postOrder(rootNode.rightBranch);
    callback(rootNode);
  } else {
    const array = [];
    postOrder(rootNode.leftBranch);
    postOrder(rootNode.rightBranch);
    array.push(rootNode.data);
    return array;
  }
};

/* reBalance(rootNode)
Use a traversal method to provide a sorted array then create new tree from this array
*/
const reBalance = function (rootNode) {
  const array = inOrder(rootNode);
  const newTree = treeFactory(array);
  return newTree;
};

/* insert(value) 
Don't use an array to do this, traverse and manipulate the nodes instead */
const insert = function (value, rootNode) {
  const number = Number(value);
  if (number < rootNode.data) {
    if (rootNode.leftBranch === null) {
      const newNode = nodeFactory(number, null, null);
      rootNode.leftBranch = newNode;
      return true;
    } else {
      insert(value, rootNode.leftBranch);
    }
  } else if (number > rootNode.data) {
    if (rootNode.rightBranch === null) {
      const newNode = nodeFactory(number, null, null);
      rootNode.rightBranch = newNode;
      return true;
    } else {
      insert(value, rootNode.rightBranch);
    }
  } else {
    console.log(
      `Looks like you tried to insert an invalid item; ${value} is either already present in the BST or is not a number.`
    );
    return false;
  }
};

// height(node) return { height }
const height = function (rootNode) {
  let leftHeight = 0;
  let rightHeight = 0;
  let maxHeight;
  let rightBranchIsLonger = false;

  if (rootNode.leftBranch !== null) {
    leftHeight++;
    leftHeight += height(rootNode.leftBranch).maxHeight;
  }

  if (rootNode.rightBranch !== null) {
    rightHeight++;
    rightHeight += height(rootNode).maxHeight;
  }

  if (rightHeight > leftHeight) {
    maxHeight = rightHeight;
    rightBranchIsLonger = true;
  } else {
    maxHeight = leftHeight;
  }

  return { maxHeight, rightBranchIsLonger };
};

/* delete(value) 
Don't use an array to do this, traverse and manipulate the nodes instead */
const deleteItem = function (value, rootNode) {
  if (rootNode === null) {
    console.log(`Sorry, ${value} was not found in the BST`);
  }
  const number = Number(value);
  if (number === rootNode.data) {
    const findNodeWithNoLeftBranch = function (rootNode) {
      if (rootNode.leftBranch === null) {
        return rootNode;
      } else findNodeWithNoLeftBranch(rootNode.leftBranch);
    };
    const newParentForLeftBranch = findNodeWithNoLeftBranch(
      rootNode.rightBranch
    );
    newParentForLeftBranch.leftBranch = rootNode.leftBranch;
    const oldRightBranch = rootNode.rightBranch;
    rootNode = oldRightBranch;
    return true;
  } else if (number < rootNode.data) {
    deleteItem(value, rootNode.leftBranch);
  } else if (number > rootNode.data) {
    deleteItem(value, rootNode.rightBranch);
  }
};

// find(value) return { nodeWithValue }
const find = function (value, rootNode) {
  if (rootNode === null) {
    console.log(`Sorry, ${value} was not found in this BST`);
    return null;
  }
  const number = Number(value);
  if (number === rootNode.data) {
    return rootNode;
  } else if (number < rootNode.data) {
    find(value, rootNode.leftBranch);
  } else if (number > rootNode.data) {
    find(value, rootNode.rightBranch);
  } else {
    console.log(`${value} doesn't appear to be a valid value`);
    return null;
  }
};

/* levelOrder(callback)
Traverse in breadth first, execute callback on all nodes at this level
If no callback return { [values] }
Use an array as a queue to keep track of all child nodes yet to traverse
*/
const levelOrder = function (rootNode, callback) {
  const queue = [];
  const outputArray = [];
  const dealWithNode = function (node) {
    if (callback !== undefined) {
      callback(node);
    } else {
      outputArray.push(node.data);
    }
  };
  queue.push(rootNode);
  while (queue.length > 0) {
    const tempNode = queue[0];
    queue.shift();

    dealWithNode(tempNode);

    if (tempNode.leftBranch !== null) {
      queue.push(tempNode.leftBranch);
    }

    if (tempNode.rightBranch !== null) {
      queue.push(tempNode.rightBranch);
    }
  }

  if (outputArray.length > 0) {
    return outputArray;
  }
  return true;
};

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
