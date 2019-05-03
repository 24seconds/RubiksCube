/* eslint-env browser */
import CubeOperationList from './CubeOperationList';
import { operationStack } from './shared';

export default class CubeOperationStack {
  constructor(tag, name, props) {
    const element = document.createElement(tag);
    element.className = name;
    this.element = element;

    this.props = props;
  }

  flushOperationStack() {
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }
  }

  forceRender(text) {
    const OperationText = new CubeOperationList('li', 'operation-text', text, this.element);
    if (operationStack.length === 0) {
      OperationText.render();
    } else {
      this.element.insertBefore(OperationText.element, this.element.children[0]);
    }
  }

  render() {
    this.props.appendChild(this.element);
  }
}
