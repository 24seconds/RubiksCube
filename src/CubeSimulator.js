/* eslint-env browser */

import SimulatorButton from './SimulatorButton';
import SolveButton from './SolveButton';

export default class CubeSimulator {
  constructor(tag, name, props) {
    const element = document.createElement(tag);
    element.className = name;
    this.element = element;

    this.props = props;
  }

  render() {
    const solveButton = new SolveButton('button', 'solve-button', 'Solve', this.element);
    const simulatorButton = new SimulatorButton('button', 'simulator-button', 'Simulate', this.element);

    solveButton.render();
    simulatorButton.render();

    this.props.appendChild(this.element);
  }
}
