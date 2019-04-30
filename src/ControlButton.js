/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-env browser */
import CubeControllerContainer from './CubeControllerContainer';
import ShiftButton from './ShiftButton';

import {
  keyCodeToString,
  stringToKeyCode,
  cubePieceArray,
  keyCodeToRotation,
  getRotationcondition,
  getRotationAndPosition,
  isLockAvailable,
  lockAquire,
  lockRelease,
  operationStack,
  getSolvePath,
  flushOperationStack,
} from './shared';

let rotationPerFrame = 5;

export default class ControlButton {
  constructor(tag, name, props) {
    this.props = props;

    const element = document.createElement(tag);
    element.className = name;
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
      operationStack.push(`${keyCodeToString[keyCode]}'`);

      this.rotateOneSide(keyCode, -1);
      return;
    }

    if ([82, 76, 85, 68, 70, 66].includes(keyCode) && isLockAvailable()) {
      lockAquire();
      operationStack.push(keyCodeToString[keyCode]);

      this.rotateOneSide(keyCode);
      return;
    }

    if (this.keyCombineMap[83] && isLockAvailable()) {
      const solvePath = getSolvePath(operationStack);

      lockAquire();
      const convertedPath = this.convertPath(solvePath);

      rotationPerFrame = 10;
      this.solveCube(convertedPath);
      lockRelease();
    }
  }

  onKeyUp(event) {
    const { keyCode } = event;

    this.keyCombineMap[keyCode] = event.type === 'keydown';
  }

  rotateOneSide(keyCode, isPrime = 1, solvePath = null) {
    const keyCodeString = keyCodeToString[keyCode];
    const filteredCubePiceArray = cubePieceArray.filter(
      cubePiece => getRotationcondition(cubePiece, keyCodeString),
    );

    requestAnimationFrame(this.rotationCallback.bind(this,
      filteredCubePiceArray, 0, keyCodeToRotation(rotationPerFrame)[keyCodeString], keyCodeString, isPrime, solvePath));

    return 1;
  }

  rotationCallback(array, iteration, rotation, keyCodeString, isPrime, solvePath) {
    if (Math.abs(iteration) >= 90) {
      array.forEach((cubePiece) => {
        cubePiece.updatePosition();
        cubePiece.updateMatrix();
      });

      lockRelease();

      if (solvePath) {
        this.solveCube(solvePath);
      }
      return;
    }

    array.forEach((cubePiece) => {
      const [newPosition, newRotation] = getRotationAndPosition(cubePiece, rotationPerFrame * isPrime, keyCodeString);

      cubePiece.addRotation(newRotation);
      cubePiece.setPosition(newPosition);
    });

    requestAnimationFrame(
      this.rotationCallback.bind(this, array, iteration + rotationPerFrame * isPrime, rotation, keyCodeString, isPrime, solvePath),
    );
  }

  addEvent() {
    this.element.addEventListener('click', this.onClick.bind(this));
  }

  convertPath(solvePath) {
    const returnPath = [];

    solvePath.forEach((value) => {
      switch (value.substr(-1)) {
        case '2': {
          returnPath.push(value.substring(0, 1));
          returnPath.push(value.substring(0, 1));
          break;
        }
        default: {
          returnPath.push(value);
          break;
        }
      }
    });

    return returnPath;
  }

  solveCube(solvePath) {
    if (solvePath.length === 0) {
      rotationPerFrame = 5;
      flushOperationStack();
      return 1;
    }

    const key = solvePath[0];
    solvePath.shift();

    switch (key.substr(-1)) {
      case "'": {
        this.rotateOneSide(stringToKeyCode[key.charAt(0)], -1, solvePath);
        break;
      }
      default: {
        this.rotateOneSide(stringToKeyCode[key.charAt(0)], 1, solvePath);
        break;
      }
    }

    return 1;
  }

  render() {
    this.props.appendChild(this.element);
    const propsFunctionCubeButton = { onKeyDown: this.onKeyDown.bind(this) };
    const propsFunctionShiftButton = { onKeyDown: this.onKeyDown.bind(this), onKeyUp: this.onKeyUp.bind(this) };

    const shiftButton = new ShiftButton('button', 'shift-button', this.element, 'SHIFT', propsFunctionShiftButton);
    shiftButton.render();

    const cubeControllerContainer1 = new CubeControllerContainer(
      'div', 'cube-controller-container one', this.element, propsFunctionCubeButton, ['R', 'U', 'F'],
    );
    cubeControllerContainer1.render();

    const cubeControllerContainer2 = new CubeControllerContainer(
      'div', 'cube-controller-container two', this.element, propsFunctionCubeButton, ['L', 'D', 'B'],
    );
    cubeControllerContainer2.render();
  }
}
