/* eslint-env browser */
import CubePiece from './CubePiece';
import { positionArray, storeClassObject } from './shared';

export default class CubeCanvas {
  constructor(tag, name, props) {
    const element = document.createElement(tag);
    element.className = name;
    this.element = element;
    this.props = props;
    this.cubeArray = [];
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
