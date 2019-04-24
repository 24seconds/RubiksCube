/* eslint-disable import/no-extraneous-dependencies */
// import { Quaternion } from 'quaternion';
// const Qauternion = require('quaternion');
import Qauternion from 'quaternion';

let isLocked = false;

export const lockAquire = () => { isLocked = true; };
export const lockRelease = () => { isLocked = false; };
export const isLockAvailable = () => !isLocked;

export const operationStack = [];
export const flushOperationStack = () => {
  const len = operationStack.length;
  for (let i = 0; i < len; i += 1) {
    operationStack.pop();
  }
};

export const positionArray = [
  [-100, -100, -100], [-100, -100, 0], [-100, -100, 100],
  [-100, 0, -100], [-100, 0, 0], [-100, 0, 100],
  [-100, 100, -100], [-100, 100, 0], [-100, 100, 100],
  [0, -100, -100], [0, -100, 0], [0, -100, 100],
  [0, 0, -100], [0, 0, 0], [0, 0, 100],
  [0, 100, -100], [0, 100, 0], [0, 100, 100],
  [100, -100, -100], [100, -100, 0], [100, -100, 100],
  [100, 0, -100], [100, 0, 0], [100, 0, 100],
  [100, 100, -100], [100, 100, 0], [100, 100, 100],
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
      return cubePiece.currentPosition.z === -100;
    case 'R':
      return cubePiece.currentPosition.z === 100;
    case 'U':
      return cubePiece.currentPosition.y === -100;
    case 'D':
      return cubePiece.currentPosition.y === 100;
    case 'F':
      return cubePiece.currentPosition.x === -100;
    case 'B':
      return cubePiece.currentPosition.x === 100;
    default:
      return false;
  }
};

export const getRotationAndPosition = (cubePiece, _theta, keyCodeString) => {
  const { x: currentX, y: currentY, z: currentZ } = cubePiece.currentPosition;
  const degToRad = Math.PI / 180;

  const theta = ['F', 'R', 'U'].includes(keyCodeString) ? -1 * _theta : _theta;
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
