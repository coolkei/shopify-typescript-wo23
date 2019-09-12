import React from 'react';
import ReactDOM from 'react-dom';
import {showPage} from '@shopify/react-html';
import App from 'index';

const appContainer = document.getElementById('app');
ReactDOM.hydrate(React.createElement(App), appContainer);
showPage();
