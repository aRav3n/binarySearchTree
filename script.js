// nodeFactory return { data, leftNode, rightNode }
const nodeFactory = function (data) {
  let leftBranch = null;
  let rightBranch = null;
  return { data, leftBranch, rightBranch };
};

// buildTree(array) return rootNode
const buildTree = function (array) {
  const filterArray = function (array) {
    const arraySorted = array.sort(function (a, b) {
      return a - b;
    });
    const arrayDuplicatesRemoved = [];
    while (arraySorted.length > 0) {
      const nextNumber = arraySorted.shift();
      const newArrayTopSpot = arrayDuplicatesRemoved.length - 1;
      if (
        nextNumber !== arrayDuplicatesRemoved[newArrayTopSpot] ||
        arrayDuplicatesRemoved.length === 0
      ) {
        arrayDuplicatesRemoved.push(nextNumber);
      }
    }

    return arrayDuplicatesRemoved;
  };

  const getRootNode = function (array, startPoint, endPoint) {
    if (startPoint > endPoint) {
      return null;
    }
    const midPoint = Math.floor((startPoint + endPoint) / 2);
    const midPointData = array[midPoint];

    let rootNode = nodeFactory(midPointData);
    rootNode.leftBranch = getRootNode(array, startPoint, midPoint - 1);
    rootNode.rightBranch = getRootNode(array, midPoint + 1, endPoint);

    return rootNode;
  };

  const filteredArray = filterArray(array);
  const arrayEnd = filteredArray.length - 1;
  const rootNode = getRootNode(filteredArray, 0, arrayEnd);
  return rootNode;
};

// treeFactory(array) return rootNode
const treeFactory = function (array) {
  const rootNode = buildTree(array);

  return rootNode;
};

// test function. src: https://www.theodinproject.com/lessons/javascript-binary-search-trees#assignment
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightBranch !== null) {
    prettyPrint(
      node.rightBranch,
      `${prefix}${isLeft ? "│   " : "    "}`,
      false
    );
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.leftBranch !== null) {
    prettyPrint(node.leftBranch, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// inOrder(callback) if !callback return { array }
const inOrder = function (rootNode, callback) {
  if (rootNode === null) {
    return;
  }
  if (callback !== undefined) {
    inOrder(rootNode.leftBranch, callback);
    callback(rootNode);
    inOrder(rootNode.rightBranch, callback);
  } else {
    const array = [];
    const buildArray = function (node) {
      if (node === null) {
        return;
      }
      buildArray(node.leftBranch);
      array.push(node.data);
      buildArray(node.rightBranch);
    };
    buildArray(rootNode);
    return array;
  }
};

// preOrder(callback) if !callback return { array }
const preOrder = function (rootNode, callback) {
  if (rootNode === null) {
    return;
  }
  if (callback !== undefined) {
    callback(rootNode);
    preOrder(rootNode.leftBranch, callback);
    preOrder(rootNode.rightBranch, callback);
  } else {
    const array = [];
    const buildArray = function (node) {
      if (node === null) {
        return;
      }
      array.push(node.data);
      buildArray(node.leftBranch);
      buildArray(node.rightBranch);
    };
    buildArray(rootNode);
    return array;
  }
};

// postOrder(callback) if !callback return { array }
const postOrder = function (rootNode, callback) {
  if (rootNode === null) {
    return;
  }
  if (callback !== undefined) {
    postOrder(rootNode.leftBranch);
    postOrder(rootNode.rightBranch);
    callback(rootNode);
  } else {
    const array = [];
    const buildArray = function (node) {
      if (node === null) {
        return;
      }
      buildArray(node.leftBranch);
      buildArray(node.rightBranch);
      array.push(node.data);
    };
    buildArray(rootNode);
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
      const newNode = nodeFactory(number);
      rootNode.leftBranch = newNode;
      return true;
    } else {
      insert(value, rootNode.leftBranch);
    }
  } else if (number > rootNode.data) {
    if (rootNode.rightBranch === null) {
      const newNode = nodeFactory(number);
      rootNode.rightBranch = newNode;
      return true;
    } else {
      insert(value, rootNode.rightBranch);
    }
  }
  return false;
};

// height(node) return height
const height = function (rootNode) {
  if (rootNode === null) {
    return -1;
  }

  let leftHeight = 1 + height(rootNode.leftBranch);
  let rightHeight = 1 + height(rootNode.rightBranch);

  const maxHeight = Math.max(leftHeight, rightHeight);
  return maxHeight;
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

// find(value) return nodeWithValue
const find = function (value, rootNode) {
  if (rootNode !== null) {
    const number = Number(value);
    if (number === rootNode.data) {
      console.log(rootNode);
      return rootNode;
    } else if (number < rootNode.data) {
      find(value, rootNode.leftBranch);
    } else if (number > rootNode.data) {
      find(value, rootNode.rightBranch);
    } else {
      console.log(`${value} doesn't appear to be a valid value`);
      return null;
    }
  }
  console.log(`${value} was not found in this BST`);
  return null;
};

/* levelOrder(callback)
Traverse in breadth first, execute callback on all nodes at this level
If no callback return { [values] }
Use an array as a queue to keep track of all child nodes yet to traverse
*/
const levelOrder = function (rootNode, callback) {
  if (rootNode === null) {
    return;
  }
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

// depth(node) return depthOfThisNode
const depth = function (node, rootNode) {
  let depthCount = 0;
  const traverseTree = function (thisNode) {
    if (thisNode === null) {
      console.log("This is awkward but that node wasn't found in the tree.");
      return;
    }
    if (thisNode === rootNode) {
      return depthCount;
    } else {
      const thisNodeValue = thisNode.data;
      const rootNodeValue = rootNode.data;
      if (thisNodeValue < rootNodeValue) {
        depthCount++;
        traverseTree(thisNode.leftBranch);
      } else if (thisNodeValue > rootNodeValue) {
        depthCount++;
        traverseTree(thisNode.rightBranch);
      } else {
        console.log(
          "There seems to be an issue with traverseTree() inside of depth()"
        );
      }
    }
  };
  traverseTree(node);
};

// isBalanced() return boolean
const isBalanced = function (node) {
  if (node === null) {
    console.log("You tried to check balance on a null node.");
    return undefined;
  }
  if (node.leftBranch === null) {
    const rightBranchHeight = height(node.rightBranch);
    if (rightBranchHeight > 1) {
      return false;
    }
  } else if (node.rightBranch === null) {
    const leftBranchHeight = height(node.leftBranch);
    if (leftBranchHeight > 1) {
      return false;
    }
  } else if (!isBalanced(node.leftBranch)) {
    return false;
  } else if (!isBalanced(node.rightBranch)) {
    return false;
  }
  return true;
};

// test()
const test = function () {
  // Create BST from random array.length <100
  const randomNumGen = function generateRandomNumberUnderOneHundred() {
    const randomNum = 1000 * Math.random();
    const roundedNum = Math.floor(randomNum);
    return roundedNum;
  };
  const randomArray = function () {
    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(randomNumGen());
    }
    return array;
  };
  const array = randomArray();
  let testTree = treeFactory(array);

  // Call isBalanced() to confirm balance of tree
  if (isBalanced(testTree)) {
    console.log("Good; the tree is balanced!");
  } else {
    console.log("Oh no; the tree is unbalanced!");
  }

  // Print out all elements in level, pre, post, and in order
  const printOrderArrays = function () {
    const arrayLevelOrder = levelOrder(testTree);
    const arrayPreOrder = preOrder(testTree);
    const arrayPostOrder = postOrder(testTree);
    const arrayInOrder = inOrder(testTree);
    console.log("level order array:");
    console.log(arrayLevelOrder);
    console.log("pre order array:");
    console.log(arrayPreOrder);
    console.log("post order array:");
    console.log(arrayPostOrder);
    console.log("in order array:");
    console.log(arrayInOrder);
  };
  printOrderArrays();

  // Unbalance the tree by adding several numbers > 100
  const addRandomNumbers = function addRandomNumbersToATree() {
    for (let i = 0; i < 100; i++) {
      const number = randomNumGen();
      insert(number, testTree);
    }
    console.log("Random numbers added to the tree.");
  };
  addRandomNumbers();

  const treeHeight = height(testTree);
  console.log(`testTree height: ${treeHeight}`);

  // Confirm that the tree is unbalanced by calling isBalanced
  if (isBalanced(testTree)) {
    console.log("Oh no; the tree is balanced! (it shouldn't be at this point)");
  } else {
    console.log(
      "Good; the tree is unbalanced! (it should be unbalanced here so good work)"
    );
  }
  console.log(isBalanced(testTree));

  /*  // Balance the tree by calling reBalance()
  testTree = reBalance(testTree);

  // Confirm that the tree is balanced by calling isBalanced()
  if (isBalanced(testTree)) {
    console.log("Cool cool cool; the tree is balanced!");
  } else {
    console.log("Oh no; the tree is unbalanced!");
  }

  // Print out all elements in level, pre, post, and in order
  printOrderArrays();
  */
};

test();
