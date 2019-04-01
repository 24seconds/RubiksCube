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

export const keyCodeToRotation = {
  L: { x: 0, y: 0, z: -5 },
  R: { x: 0, y: 0, z: 5 },
  U: { x: 0, y: -5, z: 0 },
  D: { x: 0, y: 5, z: 0 },
  F: { x: -5, y: 0, z: 0 },
  B: { x: 5, y: 0, z: 0 },
};

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
