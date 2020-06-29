import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyA5rQSG4STdO2ECOiT_Cy5vB0f7fZWWICE",
  authDomain: "srvp-reader.firebaseapp.com",
  databaseURL: "https://srvp-reader.firebaseio.com",
  projectId: "srvp-reader",
  storageBucket: "srvp-reader.appspot.com",
  messagingSenderId: "214178307879",
  appId: "1:214178307879:web:cc32b224304b8c02119302"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
