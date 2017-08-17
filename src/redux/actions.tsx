import { Action } from "redux";

export enum ActionNames {
  SET_IMAGE = "SET_IMAGE",
}

interface ISetImageAction extends Action {
    image: string;
}

export type AppActions = ISetImageAction;

const setImage = (image: string): ISetImageAction => {
    return {
        image,
        type: ActionNames.SET_IMAGE,
    };
};

export class ActionDispatcher {

    constructor(private dispatch: (action: AppActions) => void) {}

    public setImage(image: string) {
        this.dispatch(setImage(image));
    }
}
