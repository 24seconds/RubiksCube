/* eslint-env browser */
import CubePiece from './CubePiece';

export default class CubeCanvas {
  constructor(tag, name, props) {
    const element = document.createElement(tag);
    element.className = name;
    this.element = element;
    this.props = props;
  }

  render() {
    this.props.appendChild(this.element);

    const oneCubePieceMMM = new CubePiece('div', 'minus minus minus', 'wrapper', this.element);
    const oneCubePieceMMZ = new CubePiece('div', 'minus minus zero', 'wrapper', this.element);
    const oneCubePieceMMP = new CubePiece('div', 'minus minus plus', 'wrapper', this.element);

    const oneCubePieceMZM = new CubePiece('div', 'minus zero minus', 'wrapper', this.element);
    const oneCubePieceMZZ = new CubePiece('div', 'minus zero zero', 'wrapper', this.element);
    const oneCubePieceMZP = new CubePiece('div', 'minus zero plus', 'wrapper', this.element);

    const oneCubePieceMPM = new CubePiece('div', 'minus plus minus', 'wrapper', this.element);
    const oneCubePieceMPZ = new CubePiece('div', 'minus plus zero', 'wrapper', this.element);
    const oneCubePieceMPP = new CubePiece('div', 'minus plus plus', 'wrapper', this.element);

    const oneCubePieceZMM = new CubePiece('div', 'zero minus minus', 'wrapper', this.element);
    const oneCubePieceZMZ = new CubePiece('div', 'zero minus zero', 'wrapper', this.element);
    const oneCubePieceZMP = new CubePiece('div', 'zero minus plus', 'wrapper', this.element);

    const oneCubePieceZZM = new CubePiece('div', 'zero zero minus', 'wrapper', this.element);
    const oneCubePieceZZZ = new CubePiece('div', 'zero zero zero', 'wrapper', this.element);
    const oneCubePieceZZP = new CubePiece('div', 'zero zero plus', 'wrapper', this.element);

    const oneCubePieceZPM = new CubePiece('div', 'zero plus minus', 'wrapper', this.element);
    const oneCubePieceZPZ = new CubePiece('div', 'zero plus zero', 'wrapper', this.element);
    const oneCubePieceZPP = new CubePiece('div', 'zero plus plus', 'wrapper', this.element);

    const oneCubePiecePMM = new CubePiece('div', 'plus minus minus', 'wrapper', this.element);
    const oneCubePiecePMZ = new CubePiece('div', 'plus minus zero', 'wrapper', this.element);
    const oneCubePiecePMP = new CubePiece('div', 'plus minus plus', 'wrapper', this.element);

    const oneCubePiecePZM = new CubePiece('div', 'plus zero minus', 'wrapper', this.element);
    const oneCubePiecePZZ = new CubePiece('div', 'plus zero zero', 'wrapper', this.element);
    const oneCubePiecePZP = new CubePiece('div', 'plus zero plus', 'wrapper', this.element);

    const oneCubePiecePPM = new CubePiece('div', 'plus plus minus', 'wrapper', this.element);
    const oneCubePiecePPZ = new CubePiece('div', 'plus plus zero', 'wrapper', this.element);
    const oneCubePiecePPP = new CubePiece('div', 'plus plus plus', 'wrapper', this.element);

    oneCubePieceMMM.render();
    oneCubePieceMMZ.render();
    oneCubePieceMMP.render();

    oneCubePieceMZM.render();
    oneCubePieceMZZ.render();
    oneCubePieceMZP.render();

    oneCubePieceMPM.render();
    oneCubePieceMPZ.render();
    oneCubePieceMPP.render();

    oneCubePieceZMM.render();
    oneCubePieceZMZ.render();
    oneCubePieceZMP.render();

    oneCubePieceZZM.render();
    oneCubePieceZZZ.render();
    oneCubePieceZZP.render();

    oneCubePieceZPM.render();
    oneCubePieceZPZ.render();
    oneCubePieceZPP.render();

    oneCubePiecePMM.render();
    oneCubePiecePMZ.render();
    oneCubePiecePMP.render();

    oneCubePiecePZM.render();
    oneCubePiecePZZ.render();
    oneCubePiecePZP.render();

    oneCubePiecePPM.render();
    oneCubePiecePPZ.render();
    oneCubePiecePPP.render();
  }
}
