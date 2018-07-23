import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { FirstService } from 'services/first.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  data: any = '';
  msg = ""
  sign = ''
  cookieValue = 'UNKNOWN';

  //Router-Lets you link to specific routes in your app.
  //ActivatedRoute-Contains the information about a route associated with a component loaded in an outlet.
  //FirstService-Access service methods.
  constructor(private socialAuthService: AuthService, private firstservice: FirstService, private cookieService: CookieService) { }


  //Sign in for Gmail Account
  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider = '';
    if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        this.data = userData;

        localStorage.setItem('currentUser', JSON.stringify(this.data));
        if (localStorage.getItem('currentUser') != undefined) {
          this.msg = "Thanks " + this.data.name + ". You're successfully Logged in."
          this.sign=''
        }
        // Now sign-in with userData
        // ...     
      }
    );




  }


  //Sign Out Gmail Account
  socialSignOut() {

    localStorage.removeItem('currentUser');
    if (localStorage.getItem('currentUser') == undefined)
      this.sign = 'You are successfully logged out'
      this.msg=''
    this.cookieService.delete('https://accounts.google.com');
  }

}
