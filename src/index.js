import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
//component file
import App from './App.jsx';

//stylesheet
import "./App.css"

  ReactDOM.render(
    <React.StrictMode>
      <Router>        
          <App />   
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );



