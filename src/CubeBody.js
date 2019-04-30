/* eslint-env browser */
import CubeContainer from './CubeContainer';
import CubeSimulator from './CubeSimulator';
import CubeOperationStack from './CubeOperationStack';
import CubeOperationStackHeader from './CubeOperationStackHeader';
import ControlButton from './ControlButton';

export default class CubeBody {
  constructor(tag, name, props) {
    const element = document.createElement(tag);
    element.className = name;
    this.element = element;
    this.props = props;
  }

  render() {
    const cubeSimulator = new CubeSimulator('div', 'cube-simulator', this.element);
    cubeSimulator.render();

    const cubeContainer = new CubeContainer('div', 'cube-container', this.element);
    cubeContainer.render();

    const cubeOperationStackHeader = new CubeOperationStackHeader('div', 'cube-operation-stack-header', 'Operation Stack', this.element);
    cubeOperationStackHeader.render();

    const cubeOperationStack = new CubeOperationStack('ul', 'cube-operation-stack', this.element);
    cubeOperationStack.render();

    const controlButton = new ControlButton('div', 'control-button', this.element);
    controlButton.render();

    this.props.appendChild(this.element);
  }
}
