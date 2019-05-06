/* eslint-env browser */

import SimulatorButton from './SimulatorButton';
import ScrambleButton from './ScrambleButton';

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
    this.solvePath = null;
  }

  onScramble() {
    const { onScramble } = this.propsFunction;
    onScramble();
  }

  render() {
    const propsFunctionSolveButton = { setSolvePath: this.setSolvePath.bind(this) };
    const propsFunctionSimulateButton = {
      onSimulate: this.onSimulate.bind(this),
      setSolvePath: this.setSolvePath.bind(this),
    };
    const propsFunctionScrambleButton = { onScramble: this.onScramble.bind(this) };

    const simulatorButton = new SimulatorButton('button', 'simulator-button', 'Simulate Solution', this.element, propsFunctionSimulateButton);
    const scrambleButton = new ScrambleButton('button', 'scramble-button', 'Scramble Cube', this.element, propsFunctionScrambleButton);

    simulatorButton.render();
    scrambleButton.render();

    this.props.appendChild(this.element);
  }
}
