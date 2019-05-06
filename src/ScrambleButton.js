/* eslint-env browser */

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
    onScramble();
  }

  render() {
    this.props.appendChild(this.element);
  }
}
