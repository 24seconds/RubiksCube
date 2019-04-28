/* eslint-env browser */

export default class CubeButton {
  constructor(tag, name, props, text) {
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
