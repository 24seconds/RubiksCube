/* eslint-env browser */

import SimulatorButton from './SimulatorButton';
import SolveButton from './SolveButton';

export default class CubeSimulator {
  constructor(tag, name, props, propsFunction) {
    const element = document.createElement(tag);
    element.className = name;
    this.element = element;

    this.props = props;
    this.propsFunction = propsFunction;

    this.solvePath = null;
  }

  setSolvePath(solvePath) {
    this.solvePath = solvePath;
  }

  onSimulate() {
    const { onSolve } = this.propsFunction;

    onSolve(this.solvePath);
  }

  render() {
    const propsFunctionSolveButton = { setSolvePath: this.setSolvePath.bind(this) };
    const propsFunctionSimulateButton = { onSimulate: this.onSimulate.bind(this) };

    const solveButton = new SolveButton('button', 'solve-button', 'Get Solution', this.element, propsFunctionSolveButton);
    const simulatorButton = new SimulatorButton('button', 'simulator-button', 'Simulate Solution', this.element, propsFunctionSimulateButton);

    solveButton.render();
    simulatorButton.render();

    this.props.appendChild(this.element);
  }
}
