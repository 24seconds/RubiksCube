/* eslint-env browser */

export default class SimulatorButton {
  constructor(tag, name, text, props) {
    const element = document.createElement(tag);
    element.className = name;
    element.textContent = text;
    this.element = element;

    this.props = props;
  }

  render() {
    this.props.appendChild(this.element);
  }
}
