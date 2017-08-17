import * as React from "react";

export default class Canvas extends React.Component {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    public componentDidMount(): void {
        this.canvas.height = this.canvas.width;
        const ctx: CanvasRenderingContext2D | null = this.canvas.getContext("2d");
        if (ctx === null) {
            return;
        }
        this.ctx = ctx;
        ctx.fillStyle = "#ABCDEF";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public render(): JSX.Element {
        return (
            <div>
              <canvas ref={(c: HTMLCanvasElement) => { this.canvas = c; }} style={{ width: "100%" }} />
            </div>
        );
    }
}
