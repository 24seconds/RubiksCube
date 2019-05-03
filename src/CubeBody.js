/* eslint-env browser */
import CubeContainer from './CubeContainer';
import CubeSimulator from './CubeSimulator';
import CubeOperationStack from './CubeOperationStack';
import CubeOperationStackHeader from './CubeOperationStackHeader';
import ControlButton from './ControlButton';
import { convertPath } from './shared';

export default class CubeBody {
  constructor(tag, name, props) {
    const element = document.createElement(tag);
    element.className = name;
    element.tabIndex = -1;
    element.onkeydown = this.onKeyDown.bind(this);
    element.onkeyup = this.onKeyUp.bind(this);

    this.element = element;
    this.props = props;
    this.child = null;
  }

  onKeyDown(event) {
    this.child.onKeyDown(event);
  }

  onKeyUp(event) {
    this.child.onKeyUp(event);
  }

  onSolve(solvePath) {
    const convertedPatah = convertPath(solvePath);
    this.child.onSolve(convertedPatah);
  }

  render() {
    const propsFunctionCubeSimulator = { onSolve: this.onSolve.bind(this) };

    const cubeSimulator = new CubeSimulator('div', 'cube-simulator', this.element, propsFunctionCubeSimulator);
    cubeSimulator.render();

    const cubeContainer = new CubeContainer('div', 'cube-container', this.element);
    cubeContainer.render();

    const cubeOperationStackHeader = new CubeOperationStackHeader('div', 'cube-operation-stack-header', 'Operation Stack', this.element);
    cubeOperationStackHeader.render();

    const cubeOperationStack = new CubeOperationStack('ul', 'cube-operation-stack', this.element);
    cubeOperationStack.render();

    const controlButton = new ControlButton('div', 'control-button', this.element, cubeOperationStack);
    controlButton.render();

    this.child = controlButton;

    this.props.appendChild(this.element);
  }
}
