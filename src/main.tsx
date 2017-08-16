import * as React from "react";
import * as ReactDOM from "react-dom";

import { bar } from "./foo";

window.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        <div>Hello, {bar}</div>,
        document.getElementById("main"),
    );
});
