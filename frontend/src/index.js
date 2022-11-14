import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { HashRouter as Router } from "react-router-dom"
import { Provider } from 'react-redux'
import store from "./store"
import "./i18next"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <Provider store={store}>
            <Router>
                <Suspense fallback={<div>Loading</div>}>
                    <App />
                </Suspense>
            </Router>
        </Provider>
);