import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoginState } from "./login.reducer";


export const loginFeature = createFeatureSelector<LoginState>('login');

export const loginData=createSelector(
    loginFeature,
    (state)=> state.signIn.data
);




    
 