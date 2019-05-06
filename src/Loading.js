/* eslint-env browser */

export default class Loading {
  constructor(tag, name, props) {
    const element = document.createElement(tag);
    element.className = name;
    element.innerHTML = `
    <div class='loading-ring'></div>`;
    this.element = element;

    this.props = props;
  }

  onLoading() {
    const returnPromise = new Promise((resolve) => {
      this.render();
      setTimeout(() => {
        resolve(1);
      }, 0);
    });

    return returnPromise;
  }

  remove() {
    this.props.removeChild(this.element);
  }

  render() {
    this.props.insertBefore(this.element, this.props.children[1]);
  }
}
