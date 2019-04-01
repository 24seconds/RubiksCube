/* eslint-disable class-methods-use-this */
/* eslint-env browser */

import {
  keyCodeToString, cubePieceArray, keyCodeToRotation, getRotationcondition,
} from './shared';

export default class ControlButton {
  constructor(tag, name, props) {
    this.props = props;

    const element = document.createElement(tag);
    element.className = name;
    element.textContent = 'Control Button';
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
      filteredCubePiceArray, 0, keyCodeToRotation[keyCodeString], keyCodeString));
  }

  rotationCallback(array, iteration, rotation, keyCodeString) {
    if (iteration >= 90) {
      this.setCubePiecePosition(array, keyCodeString);
      return;
    }

    array.forEach((cubePiece) => {
      cubePiece.addRotation(rotation);
    });

    requestAnimationFrame(
      this.rotationCallback.bind(this, array, iteration + 5, rotation, keyCodeString),
    );
  }

  setCubePiecePosition(array, keyCodeString) {
    if (keyCodeString === 'L') {
      array.forEach((cubePiece) => {
        const { x, y, z } = cubePiece.currentPosition;
        cubePiece.setPosition({ x: y, y: -x, z });
      });
    }

    if (keyCodeString === 'R') {
      array.forEach((cubePiece) => {
        const { x, y, z } = cubePiece.currentPosition;
        cubePiece.setPosition({ x: -y, y: x, z });
      });
    }

    if (keyCodeString === 'U') {
      array.forEach((cubePiece) => {
        const { x, y, z } = cubePiece.currentPosition;
        cubePiece.setPosition({ x: -z, y, z: x });
      });
    }

    if (keyCodeString === 'D') {
      array.forEach((cubePiece) => {
        const { x, y, z } = cubePiece.currentPosition;
        cubePiece.setPosition({ x: z, y, z: -x });
      });
    }

    if (keyCodeString === 'F') {
      array.forEach((cubePiece) => {
        const { x, y, z } = cubePiece.currentPosition;
        cubePiece.setPosition({ x, y: z, z: -y });
      });
    }

    if (keyCodeString === 'B') {
      array.forEach((cubePiece) => {
        const { x, y, z } = cubePiece.currentPosition;
        cubePiece.setPosition({ x, y: -z, z: y });
      });
    }
  }

  addEvent() {
    this.element.addEventListener('click', this.onClick.bind(this));
  }

  render() {
    this.props.appendChild(this.element);
  }
}
