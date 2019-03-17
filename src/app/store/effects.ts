import { Injectable } from "@angular/core";
import { Actions, Effect } from '@ngrx/effects'
import * as fromActions from './action'
import { LoginService } from '../service/LoginService'
import { of } from 'rxjs/observable/of';
import { Action } from "@ngrx/store";
import { map } from 'rxjs/operators/map';
import { catchError} from 'rxjs/operators/catchError';
import { HttpErrorResponse } from "@angular/common/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import { Observable } from "rxjs/Observable";


@Injectable()
export class SignInEffects {

    @Effect()
    loadSignIndata$ :Observable<Action>= this.actions$
        .ofType(fromActions.SIGN_IN)
        .map((action: fromActions.SignIn) => action.payload)
        .switchMap((payload) => {
            return this.signInService.getLogindata(payload)
                .pipe(
                    map((res: any) => new fromActions.SignInSuccess(res)),
                    catchError((error: HttpErrorResponse) =>
                        of(new fromActions.SignInFail({ statusCode: error.status }))));
        });

    constructor(private actions$: Actions,
        private signInService: LoginService) {        
    }
}