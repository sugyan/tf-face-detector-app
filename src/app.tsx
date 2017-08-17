import * as React from "react";

import Canvas from "./containers/canvas";
import Form from "./containers/form";

export default class App extends React.Component<{}, {}> {
    public render(): JSX.Element {
        return (
            <div>
              <div className="col s12 m10 l8">
                <Canvas />
                <Form />
              </div>
            </div>
        );
    }
}
