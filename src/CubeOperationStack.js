/* eslint-env browser */
import CubeOperationList from './CubeOperationList';

export default class CubeOperationStack {
  constructor(tag, name, props) {
    const element = document.createElement(tag);
    element.className = name;
    this.element = element;

    this.props = props;
  }

  render() {
    const test1 = new CubeOperationList('li', 'test1', 'test1', this.element);
    const test2 = new CubeOperationList('li', 'test2', 'test2', this.element);
    const test3 = new CubeOperationList('li', 'test3', 'test3', this.element);
    const test4 = new CubeOperationList('li', 'test4', 'test4', this.element);
    const test5 = new CubeOperationList('li', 'test5', 'test5', this.element);
    const test6 = new CubeOperationList('li', 'test6', 'test6', this.element);
    const test11 = new CubeOperationList('li', 'test1', 'test1', this.element);
    const test12 = new CubeOperationList('li', 'test2', 'test2', this.element);
    const test13 = new CubeOperationList('li', 'test3', 'test3', this.element);
    const test14 = new CubeOperationList('li', 'test4', 'test4', this.element);
    const test15 = new CubeOperationList('li', 'test5', 'test5', this.element);
    const test16 = new CubeOperationList('li', 'test6', 'test6', this.element);

    test1.render();
    test2.render();
    test3.render();
    test4.render();
    test5.render();
    test6.render();
    test11.render();
    test12.render();
    test13.render();
    test14.render();
    test15.render();
    test16.render();

    this.props.appendChild(this.element);
  }
}
