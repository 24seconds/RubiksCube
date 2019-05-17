/* eslint-env browser */
import {
  initializeSolver,
  getSolvePath,
  operationStack,
  buttonLockAcquire,
} from './shared';
import Loading from './Loading';

export default class SimulatorButton {
  constructor(tag, name, text, props, propsFunction) {
    const element = document.createElement(tag);
    element.className = name;
    element.textContent = text;
    element.onclick = this.onSimulate.bind(this);
    this.element = element;

    this.props = props;
    this.propsFunction = propsFunction;

    this.isInitialized = false;
    this.loading = new Loading('div', 'loading-background', document.body);
  }

  async onSimulate() {
    const { onSimulate } = this.propsFunction;

    if (buttonLockAcquire()) {
      await this.loading.onLoading();

      this.onSolve();
      this.loading.remove();
      onSimulate();
    }
  }

  onSolve() {
    if (!this.isInitialized) {
      this.isInitialized = true;
      initializeSolver();
    }

    const solvePath = getSolvePath(operationStack);
    const { setSolvePath } = this.propsFunction;
    setSolvePath(solvePath);
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
