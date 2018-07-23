import {Routes} from '@angular/router'
import { componentRefresh } from '@angular/core/src/render3/instructions';
import { HomeComponent } from 'src/app/home/home.component';
import { ProductComponent } from 'src/app/product/product.component';
import { ContactComponent } from 'src/app/contact/contact.component';
import { AboutComponent } from 'src/app/about/about.component';
import { ProductDetailComponent } from 'src/app/product-detail/product-detail.component';
import { ProductCategoryComponent } from 'src/app/product-category/product-category.component';
import { SigninComponent } from 'src/app/signin/signin.component';




export const appRoutes:Routes=[
    {path:'',
    component: HomeComponent 
   },
   {path:'signin',
   component: SigninComponent 
  },
    {path:'home',
     component: HomeComponent 
    },
    {path:'shop',
     component: ProductComponent
         },
         {path:'detailByCategory/:category',component: ProductCategoryComponent},
         
         {path:'detail/:id',component: ProductDetailComponent},
         
    {path:'about',
    component:AboutComponent},
    {path:'contact',
     component: ContactComponent
    }
]