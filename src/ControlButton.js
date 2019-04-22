/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-env browser */

import {
  keyCodeToString, cubePieceArray, keyCodeToRotation, getRotationcondition, getRotationAndPosition,
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

    this.element = element;
    this.addEvent();

    this.dummy = '';
  }

  onClick() {
    this.dummy = 'asdf';
  }

  onKeyDown(event) {
    const { keyCode } = event;

    if ([82, 76, 85, 68, 70, 66].includes(keyCode)) {
      this.rotateOneSide(keyCode);
    }
  }

  rotateOneSide(keyCode) {
    const keyCodeString = keyCodeToString[keyCode];
    const filteredCubePiceArray = cubePieceArray.filter(
      cubePiece => getRotationcondition(cubePiece, keyCodeString),
    );

    requestAnimationFrame(this.rotationCallback.bind(this,
      filteredCubePiceArray, 0, keyCodeToRotation(rotationPerFrame)[keyCodeString], keyCodeString));
  }

  rotationCallback(array, iteration, rotation, keyCodeString) {
    if (iteration >= 90) {
      array.forEach((cubePiece) => {
        cubePiece.updatePosition();
      });
      return;
    }

    array.forEach((cubePiece) => {
      const [newPosition, newRotation] = getRotationAndPosition(cubePiece, rotationPerFrame, keyCodeString);

      cubePiece.addRotation(newRotation);
      cubePiece.setPosition(newPosition);
    });

    requestAnimationFrame(
      this.rotationCallback.bind(this, array, iteration + rotationPerFrame, rotation, keyCodeString),
    );
  }

  addEvent() {
    this.element.addEventListener('click', this.onClick.bind(this));
  }

  render() {
    this.props.appendChild(this.element);
  }
}
