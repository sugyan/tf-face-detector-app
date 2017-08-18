import { ActionTypes, AppActions } from "./actions";

import { IDetected } from "../interfaces/detector";

export interface IDetectorState {
    initialized: boolean;
    image?: HTMLImageElement;
    detected: IDetected[];
}

const initialState: IDetectorState = {
    detected: [],
    initialized: false,
};

export const reducer = (state: IDetectorState = initialState, action: AppActions): IDetectorState => {
    switch (action.type) {
        case ActionTypes.RESET:
            return {
                ...initialState,
                initialized: true,
            };
        case ActionTypes.SET_IMAGE:
            return {
                ...state,
                image: action.image,
            };
        case ActionTypes.SET_DETECTED:
            return {
                ...state,
                detected: action.detected,
            };
        default:
            return state;
    }
};

export interface IRootState {
    detectorState: IDetectorState;
}
