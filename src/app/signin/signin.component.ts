import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { FirstService } from 'services/first.service';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import * as fromActions from '../store/action'
import * as fromReducer from '../store/reducer'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  data: any = '';
  msg = '';
  sign = '';
  cookieValue = 'UNKNOWN';

  //Router-Lets you link to specific routes in your app.
  //ActivatedRoute-Contains the information about a route associated with a component loaded in an outlet.
  //FirstService-Access service methods.
  constructor(private socialAuthService: AuthService, private firstservice: FirstService, private cookieService: CookieService, private store$:Store<fromReducer.SignInState>) { }

  public InitiateSignIn(){
    this.store$.dispatch(new fromActions.SignIn("google"));
  }
  
  socialSignOut() {
    localStorage.clear();
    sessionStorage.clear();
    if (localStorage.getItem('currentUser') == undefined)
      this.sign = 'You are successfully logged out'
      this.msg=''
    this.cookieService.delete('https://accounts.google.com');
  }

}
