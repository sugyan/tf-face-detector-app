import * as React from "react";

export default class Form extends React.Component<{}, {}> {

    private input: HTMLInputElement;

    public constructor(props: {}) {
        super(props);
        this.handleChangeFile = this.handleChangeFile.bind(this);
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
                  <input className="file-path validate" type="text" value="" />
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
        const reader: FileReader = new FileReader();
        reader.onload = (event: Event) => {
            // cannot retrieve event.target.result...
            const image: HTMLImageElement = new Image();
            image.onload = (ev: Event) => {
                console.log(image);
            };
            image.onerror = (ev: Event) => {
                window.console.error(ev);
            };
            image.src = reader.result;
        };
        reader.readAsDataURL(file);
    }
}
