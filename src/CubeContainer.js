/* eslint-env browser */

import CubeCanvas from './CubeCanvas';

export default class CubeContainer {
  constructor(tag, name) {
    const element = document.createElement(tag);
    element.className = name;
    this.element = element;
    this.name = name;
  }

  render() {
    document.body.appendChild(this.element);

    const cubeCanvas = new CubeCanvas('div', 'cube-canvas', this.element);
    cubeCanvas.render();
  }
}
