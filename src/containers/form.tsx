import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { ActionDispatcher, AppActions } from "../redux/actions";
import { IDetectorState } from "../redux/reducers";

interface IProps {
    actions: ActionDispatcher;
}
interface IState {
    filename: string;
}

class Form extends React.Component<IProps, IState> {

    private input: HTMLInputElement;

    public constructor(props: IProps) {
        super(props);
        this.handleChangeFile = this.handleChangeFile.bind(this);
        this.state = {
            filename: "",
        };
    }

    public render(): JSX.Element {
        return (
            <form>
              <div className="file-field input-field">
                <div className="btn">
                  <span>File</span>
                  <input type="file" onChange={this.handleChangeFile} />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" value={this.state.filename} />
                </div>
              </div>
            </form>
        );
    }

    private handleChangeFile(formEvent: React.FormEvent<HTMLInputElement>): void {
        const files: FileList | null = formEvent.currentTarget.files;
        if (files === null) {
            return;
        }
        const file: File = files[0];
        this.setState({
            filename: file.name,
        });

        const reader: FileReader = new FileReader();
        reader.onload = (event: Event) => {
            // cannot retrieve event.target.result...
            this.props.actions.setImage(reader.result);
        };
        reader.readAsDataURL(file);
    }
}

export default connect(
    (state: IDetectorState) => state,
    (dispatch: Dispatch<AppActions>) => {
        return {
            actions: new ActionDispatcher(dispatch),
        };
    },
)(Form);
