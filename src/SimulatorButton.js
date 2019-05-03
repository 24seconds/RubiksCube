/* eslint-env browser */

export default class SimulatorButton {
  constructor(tag, name, text, props, propsFunction) {
    const element = document.createElement(tag);
    element.className = name;
    element.textContent = text;
    element.onclick = this.onSimulate.bind(this);
    this.element = element;

    this.props = props;
    this.propsFunction = propsFunction;
  }

  onSimulate() {
    const { onSimulate } = this.propsFunction;
    onSimulate();
  }

  render() {
    this.props.appendChild(this.element);
  }
}
