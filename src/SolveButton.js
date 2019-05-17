/* eslint-env browser */
import { initializeSolver, getSolvePath, operationStack } from './shared';

export default class SolveButton {
  constructor(tag, name, text, props, propsFunction) {
    const element = document.createElement(tag);
    element.className = name;
    element.textContent = text;
    element.onclick = this.onClick.bind(this);
    this.element = element;

    this.props = props;
    this.propsFunction = propsFunction;
    this.isInitialized = false;
  }

  // initilizeSolver takes around 4~5 seconds. Loading should be needed in here.
  onClick() {
    if (!this.isInitialized) {
      this.isInitialized = true;
      initializeSolver();
    }

    const solvePath = getSolvePath(operationStack);
    const { setSolvePath } = this.propsFunction;
    setSolvePath(solvePath);
  }

  render() {
    this.props.appendChild(this.element);
  }
}
