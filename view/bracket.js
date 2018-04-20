import * as tree from './binaryTree.js';


const translateCoordinates = {
  1: 'translate(800px, 300px)',
  2: 'translate(400px, 100px)',
  3: 'translate(400px, 500px)',
  4: 'translate(0px, 0px)',
  5: 'translate(0px, 200px)',
  6: 'translate(0px, 400px)',
  7: 'translate(00px, 600px)',
};
const containerNode = document.getElementById('container');
// const buttonL = document.createElement('button');
// buttonL.innerHTML = '+';
// buttonL.onclick = () => {
//   alert('node.childInfo()');
//   console.log('bottonL');
//   return false;
// };
// containerNode.appendChild(buttonL);
function createDiv(index, node) {
  const newDiv = document.createElement('div');
  newDiv.classList.add('nodeDiv');
  containerNode.appendChild(newDiv);
  newDiv.style.webkitTransform = translateCoordinates[index];
  newDiv.style.transform = newDiv.style.webkitTransform;

  // const buttonL = document.createElement('button');
  // buttonL.innerHTML = '+';
  // buttonL.onclick = () => {
  //   alert('node.childInfo()');
  //   console.log('bottonL');
  //   return false;
  // };
  // newDiv.appendChild(buttonL);


  const leftChild = document.createElement('div');
  const rightChild = document.createElement('div');
  leftChild.classList.add('childDiv');
  leftChild.innerHTML = `Slot ${index * 2 - 1}:` + node.childInfo();
  rightChild.classList.add('childDiv');
  rightChild.innerHTML = `Slot ${index * 2}:` + node.childInfo(false);
  // const buttonL = document.createElement('button');
  // buttonL.innerHTML = '+';
  // buttonL.onclick = () => {
  //   alert(node.leftChild.toString());
  // };
  // leftChild.insertBefore(buttonL, leftChild.firstChild);

  // const buttonR = document.createElement('button');
  // buttonR.innerHTML = '+';
  // rightChild.appendChild(buttonR);


  newDiv.appendChild(leftChild);
  newDiv.appendChild(rightChild);
}

function createEmptyDiv(index) {
  const newDiv = document.createElement('div');
  newDiv.classList.add('nodeDiv');
  containerNode.appendChild(newDiv);
  newDiv.style.webkitTransform = translateCoordinates[index];
  newDiv.style.transform = newDiv.style.webkitTransform;
}

const rootNode = new tree.BinaryNode('Grand Final');
// if (rootNode) {
//   if (rootNode === true) {
//     console.log(true);
//   } else {
//     console.log(rootNode.toString());
//   }
// }

const semiA = rootNode.insertNode('semi A');
const semiB = rootNode.insertNode('semi B', false);

const team1 = new tree.EndPoint('team 1');
const team2 = new tree.EndPoint('team 2');
const team3 = new tree.EndPoint('team 3');
const team4 = new tree.EndPoint('team 4');
const team5 = new tree.EndPoint('team 5');
const team6 = new tree.EndPoint('team 6');


const match1 = semiA.insertNode('match 1');
match1.replaceEndPoint(team1);
match1.replaceEndPoint(team2, false);
// semiA.insertNode('match 2', false);
semiA.replaceEndPoint(team3, false);
// const match3 = semiB.insertNode('match 3', false);
// match3.replaceEndPoint(team4);
// match3.replaceEndPoint(team5, false);
const match4 = semiB.insertNode('match 4', false);
match4.replaceEndPoint(team4);
match4.replaceEndPoint(team5, false);
// semiB.replaceEndPoint(team6);

semiB.replaceSpecialChild(match1);

// match1.nodeSwitch = -1;
// // match3.nodeSwitch = -1;
// match4.nodeSwitch = 1;
// semiA.nodeSwitch = 1;
// semiB.nodeSwitch = 1;
// rootNode.nodeSwitch = 1;

// rootNode.refineSubtree();
function drawBracket() {
  const treeArr = rootNode.binaryTreeToArray();
  console.log(treeArr);
  for (let i = 0; i < 8; i++) {
    if (treeArr[i] != null) {
      createDiv(i, treeArr[i]);
    } else {
      // createEmptyDiv(i);
    }
  }
  const winner = document.createElement('div');
  winner.classList.add('winner');
  winner.style.webkitTransform = 'translate(1100px, 325px)';
  winner.style.transform = winner.style.webkitTransform;
  winner.innerHTML = 'winner: ' + rootNode.controlSwitch();
  containerNode.appendChild(winner);

  const root2 = new tree.BinaryNode('consolation');
  root2.replaceSpecialChild(rootNode.leftChild);
  root2.replaceSpecialChild(rootNode.rightChild, false);
  const consolation = document.createElement('div');
  consolation.classList.add('nodeDiv');
  consolation.style.webkitTransform = 'translate(1100px, 125px)';
  consolation.style.transform = consolation.style.webkitTransform;
  // consolation.innerHTML = 'winner: ' + root2.controlSwitch();
  containerNode.appendChild(consolation);
  const loser1 = document.createElement('div');
  const loser2 = document.createElement('div');
  loser1.classList.add('childDiv');
  loser1.innerHTML = '' + root2.childInfo();
  loser2.classList.add('childDiv');
  loser2.innerHTML = '' + root2.childInfo(false);
  consolation.appendChild(loser1);
  consolation.appendChild(loser2);
}


function drawLines() {
// upper line2 no1
  let line1 = document.createElement('div');
  line1.classList.add('upperLine2');
  line1.style.webkitTransform = 'translate(200px, 49px)';
  line1.style.transform = line1.style.webkitTransform;
  containerNode.appendChild(line1);

  // // lower line2 no1
  line1 = document.createElement('div');
  line1.classList.add('lowerLine2');
  line1.style.webkitTransform = 'translate(200px, 200px)';
  line1.style.transform = line1.style.webkitTransform;
  containerNode.appendChild(line1);

  // // uppper line2 no2
  line1 = document.createElement('div');
  line1.classList.add('upperLine2');
  line1.style.webkitTransform = 'translate(200px, 449px)';
  line1.style.transform = line1.style.webkitTransform;
  containerNode.appendChild(line1);

  // lower line2 no2
  line1 = document.createElement('div');
  line1.classList.add('lowerLine2');
  line1.style.webkitTransform = 'translate(200px, 600px)';
  line1.style.transform = line1.style.webkitTransform;
  containerNode.appendChild(line1);


  // upper line1 no1
  line1 = document.createElement('div');
  line1.classList.add('upperLine1');
  line1.style.webkitTransform = 'translate(600px, 149px)';
  line1.style.transform = line1.style.webkitTransform;
  containerNode.appendChild(line1);

  // lower line1 no1
  line1 = document.createElement('div');
  line1.classList.add('lowerLine1');
  line1.style.webkitTransform = 'translate(600px, 400px)';
  line1.style.transform = line1.style.webkitTransform;
  containerNode.appendChild(line1);

  // straight line
  line1 = document.createElement('div');
  line1.classList.add('straightLine');
  line1.style.webkitTransform = 'translate(1000px, 349px)';
  line1.style.transform = line1.style.webkitTransform;
  containerNode.appendChild(line1);
}
function init() {
  drawBracket();
  drawLines();
}
init();
function clearChildNodes(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

window.addEventListener('keypress', (event) => {
  if (event.code === 'Digit1') {
    clearChildNodes(containerNode);
    rootNode.refineSubtree();
    init();
  }
  // if (event.code === 'Digit2') {

  // }
});

/* eslint-disable */
// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    snap: {
      targets: [
        interact.createSnapGrid({ x: 30, y: 30 })
      ],
      range: Infinity,
      relativePoints: [ { x: 0, y: 0 } ]
    },
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px');
    }
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;