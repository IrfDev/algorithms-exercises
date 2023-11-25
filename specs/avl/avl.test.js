/*
  AVL Tree
  
  Name you class/function (anything we can call new on) Tree
  
  I would suggest making a Node class as well (it will help _a lot_ with AVL trees) Whereas with BSTs we 
  could get away with most of the logic living in the Tree class, that will be a lot tougher with AVL
  trees dues how the function calls must be recursive in order to get the balancing correct.
  
  Tree must a method called add that takes a value and adds it to the tree and then correctly balances the
  tree. There is only one correct structure for any given order of adding numbers and the unit tests enforce
  that structure.
  
  If you have any questions conceptually about balancing the tree, refer to the class website.
  
  Make sure you are calling the properties
  of the Nodes as follows:
  value - integer - the value being store in the tree
  left  - Node    - the subtree containing Node's with values less than the current Node's value
  right - Node    - the subtree containing Node's with values greater than the current Node's value

*/

class Tree {
  root = null;

  add(newNodeValue) {
    let newNode = new TreeNode(newNodeValue);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    this.root.add(this.root, newNode);
  }

  toObject() {
    return this.root;
  }
}

class TreeNode {
  left = null;
  right = null;
  height = 1;
  value = null;

  constructor(value) {
    this.value = value;
  }

  get leftHeight() {
    return this.left ? this.left.leftHeight + this.height : 0;
  }

  get rightHeight() {
    return this.right ? this.right.rightHeight + this.height : 0;
  }

  get balanceFactor() {
    return this.leftHeight - this.rightHeight;
  }

  get needRotate() {
    return this.balanceFactor < 1 || this.balanceFactor < -1;
  }

  add(currentNode, newNode) {
    if (newNode.value < currentNode.value) {
      if (!currentNode.left) {
        currentNode.left = newNode;
      } else {
        this.add(currentNode.left, newNode);
      }
    } else {
      if (!currentNode.right) {
        currentNode.right = newNode;
      } else {
        this.add(currentNode.right, newNode);
      }
    }

    this.balance();
  }

  balance() {
    if (!this.needRotate) return;

    if (this.leftHeight > this.rightHeight) {
      this.rotateLL();
    } else {
      this.rotateRR();
    }
  }

  // If the right child is heavy
  rotateRR() {
    // Swap values with right
    let originalClone = new TreeNode(this.value);
    let rightNode = this.right;
    let leftNode = this.left;

    originalClone.right = this.right;
    originalClone.left = this.left;

    this.value = rightNode.value;
    this.right.value = originalClone.value;

    this.left = this.right;

    // Make new left.right||left.left (depending on balance factor) the right value of current node right = right.rigth||right.left

    if (this.left.leftHeight > this.left.rightHeight) {
      this.right = this.left.right;
    } else {
      this.right = this.left.left;
    }

    // Make left.right = left.left

    this.left.right = this.left.left;

    // Make original.left = left.left
    this.left.left = originalClone.left;
  }

  // If the left child is heavy
  rotateLL() {
    // Swap values with right
    let originalClone = new TreeNode(this.value);
    let rightNode = this.right;
    let leftNode = this.left;

    originalClone.right = this.right;
    originalClone.left = this.left;

    this.value = leftNode.value;
    this.left.value = originalClone.value;

    this.right = this.left;

    // Make new left.right||left.left (depending on balance factor) the right value of current node right = right.rigth||right.left

    if (this.right.leftHeight > this.right.rightHeight) {
      this.left = this.right.right;
    } else {
      this.left = this.right.left;
    }

    // Make left.right = left.left

    this.right.right = this.right.left;

    // Make original.left = left.left
    this.right.left = originalClone.left;
  }
}

// unit tests
// do not modify the below code
describe("AVL Tree", function () {
  test("creates a correct tree", () => {
    const nums = [3, 7, 4, 6, 5, 1, 10, 2, 9, 8];
    const tree = new Tree();
    nums.map((num) => tree.add(num));
    const objs = tree.toObject();

    expect(objs.value).toEqual(4);

    expect(objs.left.value).toEqual(2);

    expect(objs.left.left.value).toEqual(1);
    expect(objs.left.left.left).toBeNull();
    expect(objs.left.left.right).toBeNull();

    expect(objs.left.right.value).toEqual(3);
    expect(objs.left.right.left).toBeNull();
    expect(objs.left.right.right).toBeNull();

    expect(objs.right.value).toEqual(7);

    expect(objs.right.left.value).toEqual(6);
    expect(objs.right.left.right).toBeNull();

    expect(objs.right.left.left.value).toEqual(5);
    expect(objs.right.left.left.left).toBeNull();
    expect(objs.right.left.left.right).toBeNull();

    expect(objs.right.right.value).toEqual(9);

    expect(objs.right.right.left.value).toEqual(8);
    expect(objs.right.right.left.left).toBeNull();
    expect(objs.right.right.left.right).toBeNull();

    expect(objs.right.right.right.value).toEqual(10);
    expect(objs.right.right.right.left).toBeNull();
    expect(objs.right.right.right.right).toBeNull();
  });
});
