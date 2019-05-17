/* eslint-env browser */
import CubePiece from './CubePiece';
import { positionArray, storeClassObject } from './shared';

const rotationSmoothness = 0.1;
export default class CubeCanvas {
  constructor(tag, name, props) {
    const element = document.createElement(tag);
    element.className = name;
    element.style.transform = 'rotate3d(1, 0, 0, -32deg) rotate3d(0, 1, 0, 45deg)';
    this.element = element;

    this.props = props;
    this.cubeArray = [];

    this.currentX = -32; // deg
    this.currentY = 45; // deg
  }

  setRotate3d(x, y) {
    this.element.style.transform = `rotate3d(1, 0, 0, ${this.currentX + rotationSmoothness * y}deg) rotate3d(0, 1, 0, ${this.currentY + rotationSmoothness * x}deg)`;
  }

  updateRotate3d(x, y) {
    this.currentY += rotationSmoothness * x;
    this.currentX += rotationSmoothness * y;
  }

  render() {
    positionArray.forEach((element) => {
      const cubePiece = new CubePiece('div', `${element[0]} ${element[1]} ${element[2]}`, 'wrapper', this.element);
      cubePiece.render();

      this.cubeArray.push(cubePiece);
    });
    this.props.appendChild(this.element);

    storeClassObject(this.cubeArray);
  }
}
