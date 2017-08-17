import { ActionNames, AppActions } from "./actions";

export interface IDetectorState {
    image?: string;
}

const initialState: IDetectorState = {};

export const reducer = (state: IDetectorState = initialState, action: AppActions): IDetectorState => {
    switch (action.type) {
        case ActionNames.SET_IMAGE:
            return {
                ...state,
                image: action.image,
            };
        default:
            return state;
    }
};

export interface IRootState {
    detectorState: IDetectorState;
}
