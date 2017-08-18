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

    private sendImageSize: number = 1024;
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
        // get file and filename
        const files: FileList | null = formEvent.currentTarget.files;
        if (files === null || files.length === 0) {
            return;
        }
        // reset view
        this.props.actions.reset();

        // read file content
        const file: File = files[0];
        const reader: FileReader = new FileReader();
        this.setState({
            filename: file.name,
        });
        reader.onload = (event: Event) => {
            // cannot retrieve event.target.result...
            const image: HTMLImageElement = new Image();
            image.crossOrigin = "anonymous";
            image.onload = (ev: Event): void => {
                // update canvas
                this.props.actions.setImage(image);

                // send data
                const scale: number = Math.max(
                    image.width  / this.sendImageSize,
                    image.height / this.sendImageSize,
                );
                const w: number = image.width  / scale;
                const h: number = image.height / scale;
                const canvas: HTMLCanvasElement = window.document.createElement("canvas");
                canvas.width  = w;
                canvas.height = h;
                const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
                if (ctx === null) {
                    return;
                }
                ctx.drawImage(image, 0, 0, w, h);
                fetch("/api/detect", {
                    body: canvas.toDataURL("image/jpeg"),
                    method: "POST",
                }).then((res) => {
                    return res.json();
                }).then((json) => {
                    this.props.actions.setDetected(json.results);
                });
            };
            image.onerror = (ev: Event): void => {
                window.console.error(ev);
            };
            image.src = reader.result;

        };
        reader.readAsDataURL(file);
    }
}

export default connect(
    (state: IDetectorState) => {
        return {};
    },
    (dispatch: Dispatch<AppActions>) => {
        return {
            actions: new ActionDispatcher(dispatch),
        };
    },
)(Form);
