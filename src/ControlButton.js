/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-env browser */

import {
  keyCodeToString, cubePieceArray, keyCodeToRotation, getRotationcondition, getRotationAndPosition, isLockAvailable, lockAquire, lockRelease,
} from './shared';

const rotationPerFrame = 30;

export default class ControlButton {
  constructor(tag, name, props) {
    this.props = props;

    const element = document.createElement(tag);
    element.className = name;
    element.textContent = 'R L F B U D , (x,y,z) = (-100, -100, 0)';
    element.tabIndex = -1;
    element.onkeydown = this.onKeyDown.bind(this);
    element.onkeyup = this.onKeyUp.bind(this);

    this.element = element;
    this.addEvent();

    this.dummy = '';
    this.keyCombineMap = {};
  }

  onClick() {
    this.dummy = 'asdf';
  }

  onKeyDown(event) {
    const { keyCode } = event;

    this.keyCombineMap[keyCode] = event.type === 'keydown';

    if (this.keyCombineMap[16] && [82, 76, 85, 68, 70, 66].includes(keyCode) && isLockAvailable()) {
      lockAquire();
      this.rotateOneSide(keyCode, -1);
      return;
    }

    if ([82, 76, 85, 68, 70, 66].includes(keyCode) && isLockAvailable()) {
      lockAquire();
      this.rotateOneSide(keyCode);
    }
  }

  onKeyUp(event) {
    const { keyCode } = event;

    this.keyCombineMap[keyCode] = event.type === 'keydown';
  }

  rotateOneSide(keyCode, isPrime = 1) {
    const keyCodeString = keyCodeToString[keyCode];
    const filteredCubePiceArray = cubePieceArray.filter(
      cubePiece => getRotationcondition(cubePiece, keyCodeString),
    );

    requestAnimationFrame(this.rotationCallback.bind(this,
      filteredCubePiceArray, 0, keyCodeToRotation(rotationPerFrame)[keyCodeString], keyCodeString, isPrime));
  }

  rotationCallback(array, iteration, rotation, keyCodeString, isPrime) {
    if (Math.abs(iteration) >= 90) {
      array.forEach((cubePiece) => {
        cubePiece.updatePosition();
        cubePiece.updateMatrix();
      });

      lockRelease();
      return;
    }

    array.forEach((cubePiece) => {
      const [newPosition, newRotation] = getRotationAndPosition(cubePiece, rotationPerFrame * isPrime, keyCodeString);

      cubePiece.addRotation(newRotation);
      cubePiece.setPosition(newPosition);
    });

    requestAnimationFrame(
      this.rotationCallback.bind(this, array, iteration + rotationPerFrame * isPrime, rotation, keyCodeString, isPrime),
    );
  }

  addEvent() {
    this.element.addEventListener('click', this.onClick.bind(this));
  }

  render() {
    this.props.appendChild(this.element);
  }
}
