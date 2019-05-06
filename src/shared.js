/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
// import { Quaternion } from 'quaternion';
// const Qauternion = require('quaternion');
import Qauternion from 'quaternion';
import Cube from 'cubejs';

export const cubeLenth = 50;
// export const cubeLenth = 80;

export const initializeSolver = () => {
  console.log('start!');
  Cube.initSolver();
  console.log('done!');
};

export const printCube = (operationStack) => {
  const cube = new Cube();
  cube.move(operationStack.join(' '));
  // console.log('printCube ', cube.asString().match(/.{9}/g).join(' / '));
};

export const getSolvePath = (operationStack) => {
  const cube = new Cube();
  cube.move(operationStack.join(' '));

  const solvePath = cube.solve();

  const returnSolvePath = solvePath.split(' ');

  return returnSolvePath;
};

export const convertPath = (solvePath) => {
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
};

let isLocked = false;

export const lockAquire = () => { isLocked = true; };
export const lockRelease = () => { isLocked = false; };
export const isLockAvailable = () => !isLocked;

let buttonLocked = false;
const buttonLockWatchList = [];

export const registerButtonLockWatchList = (element) => {
  buttonLockWatchList.push(element);
};

export const buttonLockAcquire = () => {
  if (buttonLocked) { return false; }

  buttonLocked = true;

  buttonLockWatchList.forEach((component) => {
    component.onDisabled();
  });

  return buttonLocked;
};

export const buttonLockRelease = () => {
  buttonLocked = false;

  buttonLockWatchList.forEach((component) => {
    component.onEnabled();
  });

  return true;
};

export const butttonLockAvailable = () => !buttonLocked;

export const operationStack = [];
export const flushOperationStack = () => {
  const len = operationStack.length;
  for (let i = 0; i < len; i += 1) {
    operationStack.pop();
  }
};

export const positionArray = [
  [-cubeLenth, -cubeLenth, -cubeLenth], [-cubeLenth, -cubeLenth, 0], [-cubeLenth, -cubeLenth, cubeLenth],
  [-cubeLenth, 0, -cubeLenth], [-cubeLenth, 0, 0], [-cubeLenth, 0, cubeLenth],
  [-cubeLenth, cubeLenth, -cubeLenth], [-cubeLenth, cubeLenth, 0], [-cubeLenth, cubeLenth, cubeLenth],
  [0, -cubeLenth, -cubeLenth], [0, -cubeLenth, 0], [0, -cubeLenth, cubeLenth],
  [0, 0, -cubeLenth], [0, 0, 0], [0, 0, cubeLenth],
  [0, cubeLenth, -cubeLenth], [0, cubeLenth, 0], [0, cubeLenth, cubeLenth],
  [cubeLenth, -cubeLenth, -cubeLenth], [cubeLenth, -cubeLenth, 0], [cubeLenth, -cubeLenth, cubeLenth],
  [cubeLenth, 0, -cubeLenth], [cubeLenth, 0, 0], [cubeLenth, 0, cubeLenth],
  [cubeLenth, cubeLenth, -cubeLenth], [cubeLenth, cubeLenth, 0], [cubeLenth, cubeLenth, cubeLenth],
];

export const cubePieceArray = [];

export const storeClassObject = (array) => {
  array.forEach((element) => {
    cubePieceArray.push(element);
  });
};

export const rotate = (x, y, rotatePlane, isClockwise) => {
  const sign = isClockwise ? -1 : 1;
  return {
    x: sign * y,
    y: -sign * x,
  };
};

export const keyCodeToString = {
  76: 'L',
  82: 'R',
  85: 'U',
  68: 'D',
  70: 'F',
  66: 'B',
};

export const stringToKeyCode = {
  L: 76,
  R: 82,
  U: 85,
  D: 68,
  F: 70,
  B: 66,
};

export const keyCodeToRotation = rotation => ({
  L: { x: 0, y: 0, z: -rotation },
  R: { x: 0, y: 0, z: rotation },
  U: { x: 0, y: -rotation, z: 0 },
  D: { x: 0, y: rotation, z: 0 },
  F: { x: -rotation, y: 0, z: 0 },
  B: { x: rotation, y: 0, z: 0 },
});

export const getRotationcondition = (cubePiece, keyString) => {
  switch (keyString) {
    case 'L':
      return cubePiece.currentPosition.z === -cubeLenth;
    case 'R':
      return cubePiece.currentPosition.z === cubeLenth;
    case 'U':
      return cubePiece.currentPosition.y === -cubeLenth;
    case 'D':
      return cubePiece.currentPosition.y === cubeLenth;
    case 'F':
      return cubePiece.currentPosition.x === -cubeLenth;
    case 'B':
      return cubePiece.currentPosition.x === cubeLenth;
    default:
      return false;
  }
};

export const getRotationAndPosition = (cubePiece, _theta, keyCodeString) => {
  const { x: currentX, y: currentY, z: currentZ } = cubePiece.currentPosition;
  const degToRad = Math.PI / 180;

  const theta = ['F', 'R', 'D'].includes(keyCodeString) ? -1 * _theta : _theta;
  const cos = Math.cos(theta * degToRad);
  const sin = Math.sin(theta * degToRad);

  switch (keyCodeString) {
    case 'L': {
      const newPosition = {
        x: sin * currentY + cos * currentX,
        y: cos * currentY - sin * currentX,
        z: currentZ,
      };

      const newRotation = {
        x: -theta,
        y: 0,
        z: 0,
      };
      return [newPosition, newRotation];
    }
    case 'R': {
      const newPosition = {
        x: sin * currentY + cos * currentX,
        y: cos * currentY - sin * currentX,
        z: currentZ,
      };

      const newRotation = {
        x: -theta,
        y: 0,
        z: 0,
      };
      return [newPosition, newRotation];
    }
    case 'U': {
      const newPosition = {
        x: cos * currentX - sin * currentZ,
        y: currentY,
        z: sin * currentX + cos * currentZ,
      };

      const newRotation = {
        x: 0,
        y: 0,
        z: -theta,
      };
      return [newPosition, newRotation];
    }
    case 'D': {
      const newPosition = {
        x: cos * currentX - sin * currentZ,
        y: currentY,
        z: sin * currentX + cos * currentZ,
      };

      const newRotation = {
        x: 0,
        y: 0,
        z: -theta,
      };
      return [newPosition, newRotation];
    }
    case 'F': {
      const newPosition = {
        x: currentX,
        y: cos * currentY - sin * currentZ,
        z: sin * currentY + cos * currentZ,
      };

      const newRotation = {
        x: 0,
        y: theta,
        z: 0,
      };
      return [newPosition, newRotation];
    }
    case 'B': {
      const newPosition = {
        x: currentX,
        y: cos * currentY - sin * currentZ,
        z: sin * currentY + cos * currentZ,
      };

      const newRotation = {
        x: 0,
        y: theta,
        z: 0,
      };
      return [newPosition, newRotation];
    }
    default:
      return [{ x: currentX, y: currentY, z: currentZ }, { x: 0, y: 0, z: 0 }];
  }
};

export const rotateUsingQuaternion = (rotationAngle, currentQuaternion) => {
  const [theta, direction] = ((angle) => {
    const { x, y, z } = angle;
    const degToRad = Math.PI / 180;

    if (Math.abs(x) > 0) return [x * degToRad, [1, 0, 0]];
    if (Math.abs(y) > 0) return [y * degToRad, [0, 1, 0]];
    if (Math.abs(z) > 0) return [z * degToRad, [0, 0, 1]];

    return [0, [0, 0, 0]];
  })(rotationAngle);

  const q = Qauternion.fromEuler(direction[0] * theta, direction[1] * theta, direction[2] * theta, 'ZXY');
  const newQuaternion = q.mul(currentQuaternion);

  return [newQuaternion.conjugate().toMatrix4(), newQuaternion];
};

export const possibleOperation = ['R', 'L', 'U', 'D', 'F', 'B'];
