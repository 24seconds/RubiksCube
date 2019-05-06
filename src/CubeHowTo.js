/* eslint-env browser */

export default class CubeHowTo {
  constructor(tag, name, props) {
    const element = document.createElement(tag);
    element.className = name;
    element.innerHTML = `
      <div>
        KeyBoard : (R, U, F, L, D, B) + SHIFT
      </div>
      <div>
        Mouse/Touch : Buttons + SHIFT
      </div>
      `;
    this.element = element;

    this.props = props;
  }

  render() {
    this.props.appendChild(this.element);
  }
}
