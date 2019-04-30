/* eslint-env browser */
import CubeButton from './CubeButton';

export default class CubeControllerContainer {
  constructor(tag, name, props, propsFunction, propsArray) {
    const element = document.createElement(tag);
    element.className = name;
    this.element = element;
    this.props = props;
    this.propsArray = propsArray;
    this.propsFunction = propsFunction;
  }

  render() {
    this.props.appendChild(this.element);

    this.propsArray.forEach((text) => {
      const cubeButton = new CubeButton('button', 'cube-button', this.element, text, this.propsFunction);
      cubeButton.render();
    });
  }
}
