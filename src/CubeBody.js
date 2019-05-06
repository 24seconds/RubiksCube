/* eslint-env browser */
import CubeContainer from './CubeContainer';
import CubeSimulator from './CubeSimulator';
import CubeOperationStack from './CubeOperationStack';
import CubeOperationStackHeader from './CubeOperationStackHeader';
import ControlButton from './ControlButton';
import CubeHowTo from './CubeHowTo';
import ClassTemplate from './ClassTemplate';
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
    this.childControlButton = null;
    this.childCubeOperationStack = null;
  }

  onKeyDown(event) {
    this.childControlButton.onKeyDown(event);
  }

  onKeyUp(event) {
    this.childControlButton.onKeyUp(event);
  }

  onSolve(solvePath) {
    const convertedPatah = convertPath(solvePath);
    this.childControlButton.onSolve(convertedPatah);
    this.childCubeOperationStack.flushOperationStack();
  }

  onScramble() {
    this.childControlButton.onScramble();
  }

  render() {
    const propsFunctionCubeSimulator = {
      onSolve: this.onSolve.bind(this), onScramble: this.onScramble.bind(this),
    };

    const cubeSimulator = new CubeSimulator('div', 'cube-simulator', this.element, propsFunctionCubeSimulator);
    cubeSimulator.render();

    const cubeContainer = new CubeContainer('div', 'cube-container', this.element);
    cubeContainer.render();

    const cubeOperationStackHeader = new CubeOperationStackHeader('div', 'cube-operation-stack-header', 'Operation Stack', this.element);
    cubeOperationStackHeader.render();

    const cubeOperationStack = new CubeOperationStack('ul', 'cube-operation-stack', this.element);
    cubeOperationStack.render();

    const cubeHowTo = new CubeHowTo('div', 'cube-how-to-operate', this.element);
    cubeHowTo.render();

    const controlButton = new ControlButton('div', 'control-button', this.element, cubeOperationStack);
    controlButton.render();

    const cubeBackground = new ClassTemplate('div', 'cube-background', '', this.element);
    cubeBackground.render();

    this.childControlButton = controlButton;
    this.childCubeOperationStack = cubeOperationStack;

    this.props.appendChild(this.element);
  }
}
