/* eslint-env browser */

export default class ShiftButton {
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
      buttonLockAcquire: onButtonLockAcquire,
    } = this.propsFunction;
    const keyCode = 16; // shift keyCode
    const event = { keyCode, type: 'keydown' };

    onButtonLockAcquire();
    onPropsKeyDown(event);
  }

  onDisabled() {
    this.element.disabled = true;
  }

  onEnabled() {
    this.element.disabled = false;
  }

  render() {
    this.props.appendChild(this.element);
  }
}
