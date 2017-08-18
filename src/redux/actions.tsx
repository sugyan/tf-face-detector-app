import { Action } from "redux";

import { IDetected } from "../interfaces/detector";

export enum ActionTypes {
    RESET        = "RESET",
    SET_IMAGE    = "SET_IMAGE",
    SET_DETECTED = "SET_DETECTED",
}

interface IReset {
    type: ActionTypes.RESET;
}
interface ISetImageAction {
    image: HTMLImageElement;
    type: ActionTypes.SET_IMAGE;
}
interface ISetDetectedAction {
    detected: IDetected[];
    type: ActionTypes.SET_DETECTED;
}

export type AppActions = IReset | ISetImageAction | ISetDetectedAction;

export class ActionDispatcher {

    constructor(private dispatch: (action: AppActions) => void) {}

    public reset(): void {
        this.dispatch({
            type: ActionTypes.RESET,
        });
    }

    public setImage(image: HTMLImageElement): void {
        this.dispatch({
            image,
            type: ActionTypes.SET_IMAGE,
        });
    }

    public setDetected(detected: IDetected[]): void {
        this.dispatch({
            detected,
            type: ActionTypes.SET_DETECTED,
        });
    }
}
