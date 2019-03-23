/* eslint-env browser */
import positionValue from './shared';

export default class CubePiece {
  constructor(tag, id, name, parent) {
    const element = document.createElement(tag);
    element.className = name;
    element.id = id;
    this.element = element;
    this.parent = parent;
    this.id = id;
    this.name = name;
  }

  setTranslate3d() {
    const [x, y, z] = this.id.split(' ').map(key => `${positionValue[key]}px`);
    this.element.style.transform = `translate3d(${x}, ${y}, ${z})`;
  }

  render() {
    const frontElement = document.createElement('div');
    const backElement = document.createElement('div');
    const upElement = document.createElement('div');
    const downElement = document.createElement('div');
    const rightElement = document.createElement('div');
    const leftElement = document.createElement('div');

    frontElement.className = 'face front';
    frontElement.textContent = 'front';

    backElement.className = 'face back';
    backElement.textContent = 'back';

    upElement.className = 'face up';
    upElement.textContent = 'up';

    downElement.className = 'face down';
    downElement.textContent = 'down';

    leftElement.className = 'face left';
    leftElement.textContent = 'left';

    rightElement.className = 'face right';
    rightElement.textContent = 'right';

    this.element.appendChild(frontElement);
    this.element.appendChild(backElement);
    this.element.appendChild(upElement);
    this.element.appendChild(downElement);
    this.element.appendChild(leftElement);
    this.element.appendChild(rightElement);
    this.parent.appendChild(this.element);

    this.setTranslate3d();
  }
}
