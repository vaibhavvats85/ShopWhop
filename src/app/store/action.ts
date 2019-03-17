import * as models from '../models';
import {Action} from '@ngrx/store';

export const SIGN_IN="[Sign In] Sign In";
export const SIGN_IN_SUCCESS="[Sign In] Sign In Success";
export const SIGN_IN_FAIL="[Sign In] Sign In Fail";

export class SignIn implements Action{
    readonly type=SIGN_IN;
    constructor(readonly payload:String){
    }
}

export class SignInSuccess implements Action{
    readonly type=SIGN_IN_SUCCESS;
    constructor(readonly payload:models.LoginData){  
    }
}

export class SignInFail implements Action{
    readonly type=SIGN_IN_FAIL;
    constructor(readonly payload:models.LoginFail){}
}

export type LoginActions=
    SignIn|
    SignInSuccess|
    SignInFail;