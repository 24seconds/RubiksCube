/* eslint-env browser */
import { buttonLockAcquire } from './shared';

export default class ScrambleButton {
  constructor(tag, name, text, props, propsFunction) {
    const element = document.createElement(tag);
    element.className = name;
    element.textContent = text;
    element.onclick = this.onScramble.bind(this);
    this.element = element;

    this.props = props;
    this.propsFunction = propsFunction;
  }

  onScramble() {
    const { onScramble } = this.propsFunction;
    if (buttonLockAcquire()) {
      onScramble();
    }
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
