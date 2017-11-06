import React from 'react';
import ReactDOM from 'react-dom';


import App from './components/App.JSX';
if(typeof window !== 'undefined') {
    ReactDOM.render(
        <App/>,
        document.getElementById('mount-point')
    );
};
