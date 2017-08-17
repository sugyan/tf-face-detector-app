import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

import App from "./app";
import { reducer } from "./redux/reducers";

window.addEventListener("DOMContentLoaded", (): void => {
    const store = createStore(reducer);
    ReactDOM.render(
        <Provider store={store}>
          <App />
        </Provider>,
        document.getElementById("main"),
    );
});
