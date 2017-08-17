import * as React from "react";
import { connect } from "react-redux";

import { IDetectorState } from "../redux/reducers";

interface IProps {
    detector: IDetectorState;
}

class Canvas extends React.Component<IDetectorState, {}> {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    public componentDidMount(): void {
        this.canvas.height = this.canvas.width = 1024;
        const ctx: CanvasRenderingContext2D | null = this.canvas.getContext("2d");
        if (ctx === null) {
            return;
        }
        this.ctx = ctx;
        ctx.fillStyle = "#ABCDEF";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public render(): JSX.Element {
        if (this.props.image) {
            const image: HTMLImageElement = new Image();
            image.onload = (ev: Event): void => {
                const size: number = this.canvas.width;
                const h: number = image.height;
                const w: number = image.width;
                const scale: number = Math.max(w / size, h / size);
                const xOffset: number = (size - w / scale) / 2.0;
                const yOffset: number = (size - h / scale) / 2.0;
                this.ctx.drawImage(image, xOffset, yOffset, w / scale, h / scale);
            };
            image.onerror = (ev: Event): void => {
                window.console.error(ev);
            };
            image.src = this.props.image;
        }
        return (
            <div>
              <canvas ref={(c: HTMLCanvasElement) => { this.canvas = c; }} style={{ width: "100%" }} />
            </div>
        );
    }
}
export default connect(
    (state: IDetectorState) => state,
)(Canvas);
