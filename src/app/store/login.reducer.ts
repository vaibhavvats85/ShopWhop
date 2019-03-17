import { SignInState, InitialSignInState, SignInReducer } from "./reducer";
import { ActionReducerMap, combineReducers } from "@ngrx/store";
import * as fromSignIn from './reducer';

export  interface LoginState{
    signIn:SignInState
};


export const initialState: LoginState = {
    signIn: fromSignIn.InitialSignInState
};

export const reducers:ActionReducerMap<LoginState>={
    signIn:SignInReducer
}

export const loginReducer = combineReducers(reducers, initialState);
