import React from "react";
import "./tree.css";
import { TreeViz } from "./tree-visualizer";
import _ from "lodash";

class Tree {
  root = null;

  add(newNodeValue) {
    let newNode = new TreeNode(newNodeValue);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    this.root.add(this.root, newNode);
  }

  toJSON() {
    return JSON.stringify(this.root.serialize(), null, 4);
  }
  toObject() {
    return this.root.serialize();
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
    return (this.left ? this.left.leftHeight : 0) + this.height;
  }

  get rightHeight() {
    return (this.right ? this.right.rightHeight : 0) + this.height;
  }

  get balanceFactor() {
    return this.leftHeight - this.rightHeight;
  }

  get needRotate() {
    return this.balanceFactor > 1 || this.balanceFactor < -1;
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
    if (this.leftHeight > this.rightHeight + 1) {
      if (this.left.rightHeight > this.left.leftHeight) {
        this.left.rotateRR();
      }
      this.rotateLL();
    } else if (this.rightHeight > this.leftHeight + 1) {
      if (this.right.leftHeight > this.right.rightHeight) {
        this.right.rotateLL();
      }
      this.rotateRR();
    }
  }

  // If the right child is heavy
  rotateRR() {
    const valueBefore = this.value;
    const leftBefore = this.left;
    this.value = this.right.value;
    this.left = this.right;
    this.right = this.right.right;
    this.left.right = this.left.left;
    this.left.left = leftBefore;
    this.left.value = valueBefore;
  }

  // If the left child is heavy
  rotateLL() {
    const valueBefore = this.value;
    const rightBefore = this.right;
    this.value = this.left.value;
    this.right = this.left;
    this.left = this.left.left;
    this.right.left = this.right.right;
    this.right.right = rightBefore;
    this.right.value = valueBefore;
  }

  serialize() {
    const ans = { value: this.value };
    ans.left = this.left === null ? null : this.left.serialize();
    ans.right = this.right === null ? null : this.right.serialize();
    ans.height = this.height;
    return ans;
  }
}
export default function TreeComponent() {
  const nums = _.shuffle(_.range(50));
  const tree = new Tree();
  nums.map((num) => tree.add(num));
  const objs = tree.toObject();
  return <TreeViz root={objs} />;
}
