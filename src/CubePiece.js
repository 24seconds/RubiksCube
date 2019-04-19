/* eslint-disable class-methods-use-this */
/* eslint-env browser */

export default class CubePiece {
  constructor(tag, id, name, parent) {
    const element = document.createElement(tag);
    element.className = name;
    element.id = id;
    this.element = element;
    this.parent = parent;
    this.id = id;
    this.name = name;

    const [x, y, z] = this.id.split(' ').map(key => parseInt(key, 10));
    this.originPosition = { x, y, z };
    this.currentPosition = this.originPosition;

    this.currentRotation = {
      x: 0,
      y: 0,
      z: 0,
    };

    this.element.style.transform = `translate3d(${this.originPosition.x}px, ${this.originPosition.y}px, ${this.originPosition.z}px)`;
  }

  addRotation(addedRotatoin) {
    const { x, y, z } = this.currentRotation;

    const newRotation = {
      x: (x + addedRotatoin.x) % 360,
      y: (y + addedRotatoin.y) % 360,
      z: (z + addedRotatoin.z) % 360,
    };
    this.element.style.transform = `translate3d(${this.currentPosition.x}px, ${this.currentPosition.y}px, ${this.currentPosition.z}px) rotateX(${newRotation.x}deg) rotateY(${newRotation.y}deg) rotateZ(${newRotation.z}deg)`;
    this.currentRotation = newRotation;
  }

  setPosition(position) {
    const { x, y, z } = this.currentRotation;
    const { x: newX, y: newY, z: newZ } = position;

    this.currentPosition = position;
    this.element.style.transform = `translate3d(${newX}px, ${newY}px, ${newZ}px) rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`;
  }

  updatePosition() {
    const { x, y, z } = this.currentPosition;
    this.currentPosition = {
      x: Math.round(x),
      y: Math.round(y),
      z: Math.round(z),
    };
  }

  render() {
    const { x, y, z } = this.originPosition;

    const frontElement = document.createElement('div');
    const backElement = document.createElement('div');
    const upElement = document.createElement('div');
    const downElement = document.createElement('div');
    const rightElement = document.createElement('div');
    const leftElement = document.createElement('div');

    frontElement.className = 'face front';
    frontElement.textContent = 'front';
    frontElement.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotate3d(0, 1, 0, 90deg) translate3d(0, 0, -50px)`;

    if (x === -100) {
      frontElement.style.backgroundColor = 'red';
      frontElement.style.border = 'solid #000000';
      frontElement.style.borderWidth = '2px';
    }

    backElement.className = 'face back';
    backElement.textContent = 'back';
    backElement.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotate3d(0, 1, 0, 90deg) translate3d(0, 0, 50px)`;

    if (x === 100) {
      backElement.style.backgroundColor = 'orange';
      backElement.style.border = 'solid #000000';
      backElement.style.borderWidth = '2px';
    }

    upElement.className = 'face up';
    upElement.textContent = 'up';
    upElement.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotate3d(1, 0, 0, 90deg) translate3d(0, 0, 50px)`;

    if (y === -100) {
      upElement.style.backgroundColor = 'yellow';
      upElement.style.border = 'solid #000000';
      upElement.style.borderWidth = '2px';
    }

    downElement.className = 'face down';
    downElement.textContent = 'down';
    downElement.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotate3d(1, 0, 0, 90deg) translate3d(0, 0, -50px)`;

    if (y === 100) {
      downElement.style.backgroundColor = 'white';
      downElement.style.border = 'solid #000000';
      downElement.style.borderWidth = '2px';
    }

    leftElement.className = 'face left';
    leftElement.textContent = 'left';
    leftElement.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotate3d(0,0,1,90deg) translate3d(0, 0, -50px)`;

    if (z === -100) {
      leftElement.style.backgroundColor = 'blue';
      leftElement.style.border = 'solid #000000';
      leftElement.style.borderWidth = '2px';
    }

    rightElement.className = 'face right';
    rightElement.textContent = 'right';
    rightElement.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotate3d(0,0,1,90deg) translate3d(0, 0, 50px)`;

    if (z === 100) {
      rightElement.style.backgroundColor = 'green';
      rightElement.style.border = 'solid #000000';
      rightElement.style.borderWidth = '2px';
    }

    frontElement.style.transform = 'rotate3d(0, 1, 0, 90deg) translate3d(0, 0, -50px)';
    backElement.style.transform = 'rotate3d(0, 1, 0, 90deg) translate3d(0, 0, 50px)';
    upElement.style.transform = 'rotate3d(1, 0, 0, 90deg) translate3d(0, 0, 50px)';
    downElement.style.transform = 'rotate3d(1, 0, 0, 90deg) translate3d(0, 0, -50px)';
    leftElement.style.transform = 'rotate3d(0,0,1,90deg) translate3d(0, 0, -50px)';
    rightElement.style.transform = 'rotate3d(0,0,1,90deg) translate3d(0, 0, 50px)';

    this.element.appendChild(frontElement);
    this.element.appendChild(backElement);
    this.element.appendChild(upElement);
    this.element.appendChild(downElement);
    this.element.appendChild(leftElement);
    this.element.appendChild(rightElement);
    this.parent.appendChild(this.element);
  }
}
