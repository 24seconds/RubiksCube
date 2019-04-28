/* eslint-env browser */
import CubeButton from './CubeButton';

export default class CubeControllerContainer {
  constructor(tag, name, props) {
    const element = document.createElement(tag);
    element.className = name;
    this.element = element;
    this.props = props;
  }

  render() {
    this.props.appendChild(this.element);

    const cubeButtonR = new CubeButton('button', 'cube-button', this.element, 'R');
    const cubeButtonF = new CubeButton('button', 'cube-button', this.element, 'F');
    const cubeButtonU = new CubeButton('button', 'cube-button', this.element, 'U');
    const cubeButtonL = new CubeButton('button', 'cube-button', this.element, 'L');
    const cubeButtonD = new CubeButton('button', 'cube-button', this.element, 'D');
    const cubeButtonB = new CubeButton('button', 'cube-button', this.element, 'B');

    cubeButtonR.render();
    cubeButtonU.render();
    cubeButtonF.render();
    cubeButtonL.render();
    cubeButtonD.render();
    cubeButtonB.render();
  }
}
