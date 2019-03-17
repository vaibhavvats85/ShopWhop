import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

import { ProductComponent } from './product/product.component';
import { ContactComponent } from './contact/contact.component';
import { appRoutes } from './routerConfig'
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { FirstService } from 'services/first.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter'
import { FormsModule } from '@angular/forms'
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { QuickComponent } from './quick/quick.component';
import { DoughnutChartComponent, PieChartComponent, BarChartComponent } from 'angular-d3-charts';
import { SigninComponent } from './signin/signin.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'; 
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";
import { CookieService } from 'ngx-cookie-service';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SignInEffects } from './store/effects';

import { LoginService } from './service/LoginService';

import { environment } from 'src/environments/environment.prod';
import { reducers, loginReducer } from './store/login.reducer';
import { SignInReducer } from './store/reducer';


//Provider for AuthService 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [

      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("222450474907-g830prphh19kju178ijg3jmrpires4e3.apps.googleusercontent.com")
      }

    ]
  )
  return config;
}

@NgModule({
  declarations: [
    DoughnutChartComponent,
    PieChartComponent,
    BarChartComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductComponent,
    ContactComponent,
    AboutComponent,
    ProductDetailComponent,
    ProductCategoryComponent,
    QuickComponent,
    SigninComponent,

  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), HttpClientModule, FormsModule, Ng2SearchPipeModule, NgxPaginationModule, SocialLoginModule,StoreModule.forRoot({}), StoreModule.forFeature('login',loginReducer), EffectsModule.forRoot(
      [SignInEffects]),
      !environment.production ? StoreDevtoolsModule.instrument() : []
    
  ],
  providers: [FirstService, {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }, CookieService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }



