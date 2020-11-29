import 'bootstrap/dist/css/bootstrap.css';
import "./styles/style.scss"
import React from 'react';
import ReactDOM from 'react-dom';
import {HomeMap} from "./components/HomeMap"


ReactDOM.render(
  <React.StrictMode>
    <HomeMap />
  </React.StrictMode>,
  document.getElementById('root')
);
