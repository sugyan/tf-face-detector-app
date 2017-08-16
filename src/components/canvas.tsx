import * as React from "react";

export default class Canvas extends React.Component {

    private canvas: HTMLCanvasElement;

    public componentDidMount() {
        this.canvas.height = this.canvas.width;
        const ctx: CanvasRenderingContext2D | null = this.canvas.getContext("2d");
        if (ctx === null) {
            return;
        }
        ctx.fillStyle = "#999999";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public render() {
        return (
            <div>
              <canvas ref={(c: HTMLCanvasElement) => { this.canvas = c; }} style={{ width: "100%" }} />
            </div>
        );
    }
}
