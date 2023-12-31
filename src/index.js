import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from "./components/App";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {setupStore} from "./store/store";

const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
        </Provider>
);
