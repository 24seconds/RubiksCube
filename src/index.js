/* eslint-env browser */
import './style.css';
import CubeContainer from './CubeContainer';
import ControlButton from './ControlButton';

const cubeContainer = new CubeContainer('div', 'cube-container');
cubeContainer.render();

const controlButton = new ControlButton('div', 'control-button', document.body);
controlButton.render();
