class BinaryNode {
  constructor(name, payload = null) {
    this.name = name;
    this.leftChild = null;
    this.rightChild = null;
    this.payload = payload;
    this.altered = false;
    this.nodeSwitch = null;
    this.specialLeftChild = false;
    this.specialRightChild = false;
  }
  get BasicInfo() {
    return `Name: ${this.name}, leftChild: ${this.leftChild}, rightChild: ${this.rightChild}`;
  }

  set Payload(payload) {
    if (payload !== this.payload) {
      this.payload = payload;
      this.altered = true;
    }
  }


  static printNode(binaryNode) {
    if (binaryNode instanceof BinaryNode) {
      console.log(binaryNode.BasicInfo, '\n Ascendant:' + binaryNode.controlSwitch());
    }
  }

  static checkNodeChildren(binaryNode) {
    if (binaryNode instanceof BinaryNode) {
      if (binaryNode.leftChild === null || binaryNode.rightChild === null) {
        return false;
      }
      return true;
    }
  }

  static buildBinaryTree(nodeData, endPoints) {
    // let endPoints = [
    //   new binaryTree.EndPoint('Candidate 1'),
    //   new binaryTree.EndPoint('Candidate 2'),
    //   new binaryTree.EndPoint('Candidate 3'),
    //   new binaryTree.EndPoint('Candidate 4'),
    //   new binaryTree.EndPoint('Candidate 5'),
    //   new binaryTree.EndPoint('Candidate 6'),
    // ];

    // let nodeRecords = [
    //   {name:'match 1', leftChild:'match 2', rightChild: 'match 3', specialLeftChild: false, specialRightChild: false, leftEndPoint: null, rightEndPoint: null},
    //   {name:'match 2', leftChild: null, rightChild: null, specialLeftChild: false, specialRightChild: false, leftEndPoint: 'Candidate 1', rightEndPoint: 'Candidate 2'},
    //   {name:'match 3', leftChild:'match 2', rightChild: 'match 3', specialLeftChild: false, specialRightChild: false, leftEndPoint: null, rightEndPoint: null},
    //   {name:'match 6', leftChild: null, rightChild: null, specialLeftChild: false, specialRightChild: false, leftEndPoint: 'Candidate 3', rightEndPoint: 'Candidate 4'},
    //   {name:'match 7', leftChild: null, rightChild: null, specialLeftChild: false, specialRightChild: false, leftEndPoint: 'Candidate 5', rightEndPoint: 'Candidate 6'},
    //   // {name:'match 1', parent:null, leftChild:'match 2', rightChild: 'match 3', specialLeftChild: null, specialRightChild: false, leftEndPoint: null, rightEndPoint: null},
    //   // {name:'match 1', parent:null, leftChild:'match 2', rightChild: 'match 3', specialLeftChild: null, specialRightChild: false, leftEndPoint: null, rightEndPoint: null},
    // ];

    const nodeRecords = nodeData;
    // console.log(endPoints, nodeRecords)
    for (let i = 0; i < nodeRecords.length; i++) {
      nodeRecords[i] = new BinaryNode(nodeRecords[i].name, nodeRecords[i]);
      nodeRecords[i].specialLeftChild = nodeRecords[i].payload.specialLeftChild;
      nodeRecords[i].specialRightChild = nodeRecords[i].payload.specialRightChild;
    }

    for (let i = 0; i < nodeRecords.length; i++) {
      if (nodeRecords[i].payload.leftChild !== null) {
        for (let j = 0; j < nodeRecords.length; j++) {
          if (nodeRecords[j].name === nodeRecords[i].payload.leftChild) {
            nodeRecords[i].leftChild = nodeRecords[j];
            break;
          }
        }
      } else if (nodeRecords[i].payload.leftEndPoint !== null) {
        for (let j = 0; j < endPoints.length; j++) {
          if (endPoints[j].name === nodeRecords[i].payload.leftEndPoint) {
            nodeRecords[i].leftChild = endPoints[j];
            break;
          }
        }
      }

      if (nodeRecords[i].payload.rightChild !== null) {
        for (let j = 0; j < nodeRecords.length; j++) {
          if (nodeRecords[j].name === nodeRecords[i].payload.rightChild) {
            nodeRecords[i].rightChild = nodeRecords[j];
            break;
          }
        }
      } else if (nodeRecords[i].payload.rightEndPoint !== null) {
        for (let j = 0; j < endPoints.length; j++) {
          if (endPoints[j].name === nodeRecords[i].payload.rightEndPoint) {
            nodeRecords[i].rightChild = endPoints[j];
            break;
          }
        }
      }

      nodeRecords[i].payload = null;
    }
    return nodeRecords[0].Root;
  }

  insertNode(name, left = true) {
    if (left) {
      this.leftChild = nonExported.insertNewNode(this.leftChild, name);
      this.specialLeftChild = false;
      return this.leftChild;
    } else {
      this.rightChild = nonExported.insertNewNode(this.rightChild, name);
      this.specialRightChild = false;
      return this.rightChild;
    }
  }

  dropNode(left = true) {
    if (left) {
      this.leftChild = nonExported.dropNode(this.leftChild);
      this.specialLeftChild = false;
    } else {
      this.rightChild = nonExported.dropNode(this.leftChild);
      this.specialRightChild = false;
    }
  }

  // replaceNode(node, left = true){
  //   if(left){
  //     this.leftChild = nonExported.replaceNode(this.leftChild);
  //   } else {
  //     this.rightChild = nonExported.replaceNode(this.rightChild);
  //   }
  // }
  replaceEndPoint(endPoint, left = true) {
    if (endPoint instanceof EndPoint) {
      if (left) {
        const tmp = this.leftChild;
        this.leftChild = endPoint;
        this.specialLeftChild = false;
        return tmp;
      } else {
        const tmp = this.rightChild;
        this.rightChild = endPoint;
        this.specialRightChild = false;
        return tmp;
      }
    } else {
      return null;
    }
  }

  replaceSpecialChild(nodeRef, left = true) {
    if (nodeRef instanceof BinaryNode) {
      if (left) {
        const tmp = this.leftChild;
        this.leftChild = nodeRef;
        this.specialLeftChild = true;
        return tmp;
      } else {
        const tmp = this.rightChild;
        this.rightChild = nodeRef;
        this.specialRightChild = true;
        return tmp;
      }
    }
    return false;
  }

  replaceSubTree(subRoot, left = true) {
    if (subRoot instanceof BinaryNode) {
      if (left) {
        const tmp = this.leftChild;
        this.leftChild = subRoot;
        return tmp;
      } else {
        const tmp = this.rightChild;
        this.rightChild = subRoot;
        return tmp;
      }
    } else {
      return null;
    }
  }

  iterateSubTree(fn) {
    let resultLeft = false;
    let resultRight = false;
    let resultThis = false;
    if ((this.leftChild instanceof BinaryNode) && !this.specialLeftChild) {
      resultLeft = this.leftChild.iterateSubTree(fn);
    }
    // console.log(this.BasicInfo, '\n Ascendant:' + this.controlSwitch());
    if ((this.rightChild instanceof BinaryNode) && !this.specialRightChild) {
      resultRight = this.rightChild.iterateSubTree(fn);
    }
    resultThis = fn(this);
    return resultLeft || resultRight || resultThis;
  }

  binaryTreeToArray(arr = [], nodeIndex = 1) {
    arr[nodeIndex] = this;
    if ((this.leftChild instanceof BinaryNode) && !this.specialLeftChild) {
      this.leftChild.binaryTreeToArray(arr, nodeIndex * 2);
    }
    if ((this.rightChild instanceof BinaryNode) && !this.specialRightChild) {
      this.rightChild.binaryTreeToArray(arr, nodeIndex * 2 + 1);
    }
    return arr;
  }

  searchName(name) {
    if (this.name === name) {
      return this;
    }
    let leftName;
    let rightName;
    if (this.leftChild !== null && !this.specialLeftChild) {
      leftName = this.leftChild.searchName(name);
    }
    if (this.rightChild !== null && !this.specialRightChild) {
      rightName = this.rightChild.searchName(name);
    }
    if (leftName) {
      return leftName;
    }
    if (rightName) {
      return rightName;
    }
    return null;
  }


  controlSwitch(reversed = false) {
    if (this.nodeSwitch === null) {
      if (reversed) {
        return 'loser of ' + this;
      } else {
        return 'winner of ' + this;
      }
    } else {
      let nodeSwitch = this.nodeSwitch;
      if (reversed) {
        nodeSwitch = -nodeSwitch;
      }
      if (nodeSwitch === -1) {
        if (this.leftChild instanceof BinaryNode) {
          if (this.specialLeftChild) {
            return this.leftChild.controlSwitch(true);
          } else {
            return this.leftChild.controlSwitch();
          }
        } else {
          return this.leftChild;
        }
      } else if (nodeSwitch === 1) {
        if (this.rightChild instanceof BinaryNode) {
          if (this.specialRightChild) {
            return this.rightChild.controlSwitch(true);
          } else {
            return this.rightChild.controlSwitch();
          }
        } else {
          return this.rightChild;
        }
      }
    }
  }

  childInfo(left = true) {
    if (left) {
      return nonExported.childInfo(this.specialLeftChild, this.leftChild);
    } else {
      return nonExported.childInfo(this.specialRightChild, this.rightChild);
    }
  }


  refineSubtree() {
    if ((this.leftChild instanceof BinaryNode) && !this.specialLeftChild) {
      this.leftChild.refineSubtree();
    }
    if ((this.rightChild instanceof BinaryNode) && !this.specialRightChild) {
      this.rightChild.refineSubtree();
    }
    const resultLeft = nonExported.refineChildNode(this.leftChild, this.specialLeftChild);
    if (resultLeft) {
      if (resultLeft === true) {
        this.leftChild = null;
        this.specialLeftChild = false;
      } else {
        // const name = this.leftChild.name;
        this.leftChild = resultLeft.replacement;
        // this.leftChild.name = name;
        this.specialLeftChild = resultLeft.isSpecial;
      }
    }
    const resultRight = nonExported.refineChildNode(this.rightChild, this.specialRightChild);
    if (resultRight) {
      if (resultRight === true) {
        this.rightChild = null;
        this.specialRightChild = false;
      } else {
        // const name = this.rightChild.name;
        this.rightChild = resultRight.replacement;
        // this.rightChild.name = name;
        this.specialRightChild = resultRight.isSpecial;
      }
    }
  }
}

let nonExported = {
  insertNewNode: (nodeRef, name = 'new node') => {
    if (nodeRef === null) {
      return new BinaryNode(name);
    } else {
      const newNode = new BinaryNode(name);
      newNode.leftChild = nodeRef;
      return newNode;
    }
  },

  // seems not needed
  // replaceNode: (nodeRef, newNode) =>{
  //   if(nodeRef === null){
  //     return newNode;
  //   } else if(nodeRef instanceof BinaryNode) {
  //     let tempLeft = nodeRef.leftChild
  //   }
  // }

  dropNode: (nodeRef) => {
    if (nodeRef instanceof BinaryNode) {
      if (nodeRef.leftChild !== null) {
        return nodeRef.leftChild;
      } else if (nodeRef.rightChild !== null) {
        return nodeRef.rightChild;
      }
    } else {
      return null;
    }
  },

  childInfo: (special = false, nodeRef) => {
    if (nodeRef instanceof BinaryNode) {
      return nodeRef.controlSwitch(special);
    } else if (nodeRef instanceof EndPoint) {
      return nodeRef.name;
    }
    return null;
  },

  refineChildNode: (nodeRef, special = false) => {
    if (nodeRef instanceof BinaryNode) {
      if (nodeRef.leftChild === null && nodeRef.rightChild === null) {
        return true;
      } else if (nodeRef.leftChild === null || nodeRef.rightChild === null) {
        // return nodeRef.leftChild === null ? nodeRef.rightChild : nodeRef.leftChild;
        if (special) {
          return true;
        } else {
          let replacement;
          let isSpecial;
          if (nodeRef.leftChild === null) {
            replacement = nodeRef.rightChild;
            isSpecial = nodeRef.specialRightChild;
          } else {
            replacement = nodeRef.leftChild;
            isSpecial = nodeRef.specialRightChild;
          }
          return { isSpecial, replacement };
        }
      }
    } else {
      return false;
    }
  },
};

class EndPoint {
  constructor(name, payload = null) {
    this.name = name;
    this.payload = payload;
  }
}

BinaryNode.prototype.toString = function nodeToString() {
  // return 'node:' + this.name;
  return this.name;
};

EndPoint.prototype.toString = function nodeToString() {
  // return 'End point:' + this.name;
  return this.name;
};

// let test = new BinaryNode('test');
// console.log(test.toString());

export {
  BinaryNode,
  EndPoint,
};
