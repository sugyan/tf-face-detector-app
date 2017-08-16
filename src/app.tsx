import * as React from "react";

import Canvas from "./components/canvas";

export default class App extends React.Component {
    public render() {
        return (
            <div>
              <div className="col s12 m10 l8">
                <Canvas />
              </div>
            </div>
        );
    }
}
