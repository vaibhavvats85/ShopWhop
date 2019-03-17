import { Injectable } from '@angular/core';
import {
    AuthService,
    GoogleLoginProvider
} from 'angular-6-social-login';
import { Observable} from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { LoginData } from '../models';

@Injectable()
export class LoginService {

    constructor(private socialAuthService: AuthService) { }

    loginData:LoginData;
    UserDataModel:any;
    

    getLogindata(socialPlatform: String): Observable<LoginData> {

        const mockData: LoginData={
            name:"Vaibhav Vats",
            image:"https://lh6.googleusercontent.com/-aYvL99hF5dQ/AAAAAAAAAAI/AAAAAAAAB2o/QfQua0RrJZQ/s96-c/photo.jpg",
            email:"vaibhavvats@gmail.com"
        };

        let socialPlatformProvider = '';
        if (socialPlatform == "google") {
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }

        
        this.socialAuthService.signIn(socialPlatformProvider).then(
            (userData) => {
                // this.UserDataModel=userData;

                this.loginData = {
                    name: userData.name,
                    image: userData.image,
                    email: userData.email
                }
                console.log(this.loginData);
                
            });
        return of(mockData);
    }

    getLoginDataObservable(data: LoginData) {
        console.log(data);
    }
}
