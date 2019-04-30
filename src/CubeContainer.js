/* eslint-env browser */

import CubeCanvas from './CubeCanvas';

export default class CubeContainer {
  constructor(tag, name, props) {
    const element = document.createElement(tag);
    element.className = name;
    element.onmousedown = this.onMouseDown.bind(this);
    element.onmouseup = this.onMouseUp.bind(this);
    element.onmousemove = this.onMouseMove.bind(this);
    element.style.transform = 'rotate3d(1, 0, 0, 0deg) rotate3d(0, 1, 0, 0deg)';
    this.element = element;
    this.props = props;
    this.name = name;
    this.defaultRotation = {
      x: 0,
      y: 0,
      z: 0,
    };
    this.mouselock = false;

    this.mouseX = 0;
    this.mouseY = 0;
  }

  lockAcquire() {
    this.mouselock = true;
  }

  lockRelaese() {
    this.mouselock = false;
  }

  onMouseDown(event) {
    this.lockAcquire();

    const centerX = this.element.clientWidth / 2;
    const centerY = this.element.clientHeight / 2;

    const rect = event.target.getBoundingClientRect();

    const x = event.pageX - rect.left;
    const y = event.pageY - rect.top;

    this.mouseX = x - centerX;
    this.mouseY = centerY - y;
  }

  onMouseUp() {
    this.lockRelaese();

    this.child.updateRotate3d(this.vectorX, this.vectorY);
  }

  onMouseMove(event) {
    if (!this.mouselock) return;

    const centerX = this.element.clientWidth / 2;
    const centerY = this.element.clientHeight / 2;

    const rect = event.target.getBoundingClientRect();

    const x = event.pageX - rect.left;
    const y = event.pageY - rect.top;

    const currentX = x - centerX;
    const currentY = centerY - y;

    this.vectorX = currentX - this.mouseX;
    this.vectorY = currentY - this.mouseY;

    this.setRotation(currentX - this.mouseX, currentY - this.mouseY);
  }

  setRotation(x, y) {
    this.child.setRotate3d(x, y);
  }

  render() {
    this.props.appendChild(this.element);

    const cubeCanvas = new CubeCanvas('div', 'cube-canvas', this.element);
    cubeCanvas.render();

    this.child = cubeCanvas;
  }
}
