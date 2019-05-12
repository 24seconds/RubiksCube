/* eslint-env browser */
import { stringToKeyCode } from './shared';

export default class CubeButton {
  constructor(tag, name, props, text, propsFunction) {
    const element = document.createElement(tag);
    element.className = name;
    element.textContent = text;
    element.onmousedown = this.onMouseDown.bind(this);
    element.ontouchstart = this.onMouseDown.bind(this);
    this.element = element;
    this.props = props;
    this.propsFunction = propsFunction;
  }

  onMouseDown() {
    const {
      onKeyDown: onPropsKeyDown,
      onKeyUp: onPropsKeyUp,
    } = this.propsFunction;
    const keyCode = stringToKeyCode[this.element.textContent];
    const event = { keyCode };
    const shiftKeyEvent = { keyCode: 16, type: 'keyup' };

    onPropsKeyDown(event);
    onPropsKeyUp(shiftKeyEvent);
  }

  render() {
    this.props.appendChild(this.element);
  }
}
