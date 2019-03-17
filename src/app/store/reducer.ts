import * as models from "../models";
import * as fromActions from './action'


export interface SignInState {
    data: models.LoginData;
    loaded: boolean;
    hasError: boolean
};

export const InitialSignInState: SignInState = {
    data: null,
    loaded: false,
    hasError: false
};

export function SignInReducer(state: SignInState = InitialSignInState, action: fromActions.LoginActions) :SignInState{

    switch (action.type) {

        case fromActions.SIGN_IN:
            return {
                ...state,
            };
        case fromActions.SIGN_IN_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loaded: true,
                hasError: false
            }
        case fromActions.SIGN_IN_FAIL:
            return {
                ...state,
                loaded: false,
                hasError: true
            }
        default:
            return state;
    }
}