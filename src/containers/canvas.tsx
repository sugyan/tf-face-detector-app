import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { IDetected } from "../interfaces/detector";
import { ActionDispatcher, AppActions } from "../redux/actions";
import { IDetectorState } from "../redux/reducers";

const COLORS: any = {
    1: "Chartreuse",
    2: "Aqua",
};

interface IProps {
    actions: ActionDispatcher;
    image: HTMLImageElement;
    detected: IDetected[];
}

class Canvas extends React.Component<IProps, {}> {

    private size: number = 1024;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    public componentDidMount(): void {
        this.canvas.height = this.canvas.width = this.size;
        const ctx: CanvasRenderingContext2D | null = this.canvas.getContext("2d");
        if (ctx === null) {
            return;
        }
        this.ctx = ctx;
        this.props.actions.reset();
    }

    public render(): JSX.Element {
        if (this.props.image) {
            const h: number = this.props.image.height;
            const w: number = this.props.image.width;
            const scale: number = Math.max(w / this.size, h / this.size);
            const xOffset: number = (this.size - w / scale) / 2.0;
            const yOffset: number = (this.size - h / scale) / 2.0;
            this.ctx.drawImage(this.props.image, xOffset, yOffset, w / scale, h / scale);

            if (this.props.detected.length > 0) {
                this.props.detected.forEach((detected: IDetected) => {
                    this.ctx.lineWidth = 4;
                    this.ctx.strokeStyle = COLORS[detected.class];
                    this.ctx.strokeRect(
                        detected.bbox[1] * w / scale + xOffset,
                        detected.bbox[0] * h / scale + yOffset,
                        (detected.bbox[3] - detected.bbox[1]) * w / scale,
                        (detected.bbox[2] - detected.bbox[0]) * h / scale,
                    );
                });
            }
        } else if (this.ctx) {
            this.ctx.fillStyle = "#ABCDEF";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
        return (
            <div>
              <canvas ref={(c: HTMLCanvasElement) => { this.canvas = c; }} style={{ width: "100%" }} />
            </div>
        );
    }
}

export default connect(
    (state: IDetectorState): any => {
        return {
            detected: state.detected,
            image: state.image,
            initialized: state.initialized,
        };
    },
    (dispatch: Dispatch<AppActions>): any => {
        return {
            actions: new ActionDispatcher(dispatch),
        };
    },
)(Canvas);
