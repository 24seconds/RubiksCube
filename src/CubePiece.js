/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
/* eslint-env browser */
import Qauternion from 'quaternion';
import { rotateUsingQuaternion } from './shared';

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

    this.currentMatrix = {
      x: [1, 0, 0, 0],
      y: [0, 1, 0, 0],
      z: [0, 0, 1, 0],
    };

    this.currentQuaternion = new Qauternion([1, 0, 0, 0]);
    this.element.style.transform = `translate3d(${this.originPosition.x}px, ${this.originPosition.y}px, ${this.originPosition.z}px) matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,0, 0, 0, 0, 1)`;
  }

  addRotation(addedRotatoin) {
    const [r, newQuaternion] = rotateUsingQuaternion(addedRotatoin, this.currentQuaternion);

    const x = [r[0], r[1], r[2], r[3]];
    const y = [r[4], r[5], r[6], r[7]];
    const z = [r[8], r[9], r[10], r[11]];

    const { x: xP, y: yP, z: zP } = this.currentPosition;

    this.element.style.transform = `translate3d(${xP}px, ${yP}px, ${zP}px) matrix3d(${r}, 0, 0, 0, 1)`;
    this.currentQuaternion = newQuaternion;

    this.currentMatrix = { x, y, z };
  }

  setPosition(position) {
    const { x, y, z } = this.currentMatrix;
    const { x: newX, y: newY, z: newZ } = position;

    this.currentPosition = position;
    this.element.style.transform = `translate3d(${newX}px, ${newY}px, ${newZ}px) matrix3d(${x}, ${y}, ${z}, 0, 0, 0, 1)`;
  }

  updatePosition() {
    const { x, y, z } = this.currentPosition;
    this.currentPosition = {
      x: Math.round(x),
      y: Math.round(y),
      z: Math.round(z),
    };
  }

  updateMatrix() {
    const { x, y, z } = this.currentMatrix;
    const { x: xP, y: yP, z: zP } = this.currentPosition;
    this.currentMatrix = {
      x: x.map(value => Math.round(value)),
      y: y.map(value => Math.round(value)),
      z: z.map(value => Math.round(value)),
    };

    const { x: xM, y: yM, z: zM } = this.currentMatrix;
    this.element.style.transform = `translate3d(${xP}px, ${yP}px, ${zP}px) matrix3d(${xM}, ${yM}, ${zM}, 0, 0, 0, 1)`;
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
      frontElement.style.boxShadow = '0px 0px 0px 2px black inset';
    }

    backElement.className = 'face back';
    backElement.textContent = 'back';
    backElement.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotate3d(0, 1, 0, 90deg) translate3d(0, 0, 50px)`;

    if (x === 100) {
      backElement.style.backgroundColor = 'orange';
      backElement.style.boxShadow = '0px 0px 0px 2px black inset';
    }

    upElement.className = 'face up';
    upElement.textContent = 'up';
    upElement.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotate3d(1, 0, 0, 90deg) translate3d(0, 0, 50px)`;

    if (y === -100) {
      upElement.style.backgroundColor = 'yellow';
      upElement.style.boxShadow = '0px 0px 0px 2px black inset';
    }

    downElement.className = 'face down';
    downElement.textContent = 'down';
    downElement.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotate3d(1, 0, 0, 90deg) translate3d(0, 0, -50px)`;

    if (y === 100) {
      downElement.style.backgroundColor = 'white';
      downElement.style.boxShadow = '0px 0px 0px 2px black inset';
    }

    leftElement.className = 'face left';
    leftElement.textContent = 'left';
    leftElement.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotate3d(0,0,1,90deg) translate3d(0, 0, -50px)`;

    if (z === -100) {
      leftElement.style.backgroundColor = 'blue';
      leftElement.style.boxShadow = '0px 0px 0px 2px black inset';
    }

    rightElement.className = 'face right';
    rightElement.textContent = 'right';
    rightElement.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotate3d(0,0,1,90deg) translate3d(0, 0, 50px)`;

    if (z === 100) {
      rightElement.style.backgroundColor = 'green';
      rightElement.style.boxShadow = '0px 0px 0px 2px black inset';
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
