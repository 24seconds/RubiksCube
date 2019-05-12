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
  flushOperationStack,
  possibleOperation,
  buttonLockRelease,
  butttonLockAvailable,
} from './shared';

let rotationPerFrame = 5;

export default class ControlButton {
  constructor(tag, name, props, propsFunction) {
    this.props = props;
    this.propsFunction = propsFunction;

    const element = document.createElement(tag);
    element.className = name;
    element.tabIndex = -1;
    element.onkeydown = this.onKeyDown.bind(this);
    element.onkeyup = this.onKeyUp.bind(this);

    this.element = element;
    this.addEvent();

    this.dummy = '';
    this.keyCombineMap = {};
    this.scramblePath = null;
    this.controlButtonLocked = false;
    this.controlButtonLockWatchList = [];
  }

  onClick() {
    this.dummy = 'asdf';
  }

  onKeyDown(event) {
    const { keyCode } = event;

    if (!butttonLockAvailable()) { return; }

    this.keyCombineMap[keyCode] = event.type === 'keydown';

    if (this.keyCombineMap[16] && [82, 76, 85, 68, 70, 66].includes(keyCode) && isLockAvailable()) {
      lockAquire();
      this.buttonLockAcquire();
      operationStack.push(`${keyCodeToString[keyCode]}'`);
      this.propsFunction.forceRender(`${keyCodeToString[keyCode]}'`);

      this.rotateOneSide(keyCode, -1);
      return;
    }

    if ([82, 76, 85, 68, 70, 66].includes(keyCode) && isLockAvailable()) {
      lockAquire();
      operationStack.push(keyCodeToString[keyCode]);
      this.propsFunction.forceRender(keyCodeToString[keyCode]);

      this.rotateOneSide(keyCode);
    }
  }

  onKeyUp(event) {
    const { keyCode } = event;

    this.keyCombineMap[keyCode] = event.type === 'keydown';

    if (keyCode === 16) {
      this.buttonLockRelease();
    }
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

      if (this.scramblePath) {
        this.scrambleCube(this.scramblePath);
      }

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

  onSolve(convertedPath) {
    lockAquire();
    rotationPerFrame = 10;
    this.solveCube(convertedPath);
    lockRelease();
  }

  solveCube(solvePath) {
    if (solvePath.length === 0) {
      rotationPerFrame = 5;
      flushOperationStack();
      buttonLockRelease();
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

  getRandom(min, max) {
    return Math.floor(Math.random() * Math.floor(max - min) + min);
  }

  onScramble() {
    const scrambleCount = this.getRandom(10, 20);
    const scramblePath = [];
    for (let i = 0; i < scrambleCount; i += 1) {
      const isClockwise = Math.random() > 1 / 2;
      const randomOperation = possibleOperation[this.getRandom(0, possibleOperation.length)];
      if (isClockwise) {
        scramblePath.push(randomOperation);
        operationStack.push(randomOperation);
        this.propsFunction.forceRender(randomOperation);
      } else {
        scramblePath.push(`${randomOperation}'`);
        operationStack.push(`${randomOperation}'`);
        this.propsFunction.forceRender(`${randomOperation}'`);
      }
    }

    this.scramblePath = scramblePath;

    rotationPerFrame = 10;
    this.scrambleCube(this.scramblePath);
  }

  scrambleCube(scramblePath) {
    if (scramblePath.length === 0) {
      this.scramblePath = null;
      rotationPerFrame = 5;
      buttonLockRelease();
      return 1;
    }

    const key = scramblePath[0];
    scramblePath.shift();

    switch (key.substr(-1)) {
      case "'": {
        this.rotateOneSide(stringToKeyCode[key.charAt(0)], -1);
        break;
      }
      default: {
        this.rotateOneSide(stringToKeyCode[key.charAt(0)], 1);
        break;
      }
    }

    return 1;
  }

  registerButtonLockWatchList(element) {
    this.controlButtonLockWatchList.push(element);
  }

  buttonLockAcquire() {
    if (this.controlButtonLocked) { return false; }

    this.controlButtonLocked = true;

    this.controlButtonLockWatchList.forEach((component) => {
      component.onDisabled();
    });

    return this.controlButtonLocked;
  }

  buttonLockRelease() {
    if (!this.controlButtonLocked) { return true; }
    this.controlButtonLocked = false;

    this.controlButtonLockWatchList.forEach((component) => {
      component.onEnabled();
    });

    return true;
  }

  render() {
    this.props.appendChild(this.element);
    const propsFunctionCubeButton = {
      onKeyDown: this.onKeyDown.bind(this),
      onKeyUp: this.onKeyUp.bind(this),
    };
    const propsFunctionShiftButton = {
      onKeyDown: this.onKeyDown.bind(this),
      onKeyUp: this.onKeyUp.bind(this),
      buttonLockAcquire: this.buttonLockAcquire.bind(this),
    };

    const shiftButton = new ShiftButton('button', 'shift-button', this.element, 'SHIFT', propsFunctionShiftButton);
    shiftButton.render();
    this.registerButtonLockWatchList(shiftButton);

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
