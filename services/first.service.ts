import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http'



@Injectable({
  providedIn: 'root'
})
export class FirstService {

  constructor(private http : HttpClient) { }
  baseUrl:string="http://localhost:3000/find/"
  setUrl:string="http://localhost:3000/set/"
  Review="http://localhost:3000/reviewSet/"
  ReviewGet="http://localhost:3000/reviewGet/"
  sort="http://localhost:3000/Sorting/"
  filter="http://localhost:3000/filterByQuery/"
  cartSet="http://localhost:3000/cartSet/"
 cartGet:string="http://localhost:3000/findCart"
 cartClear="http://localhost:3000/clearCart"

  userData:any={};
  cartId;
  getProduct(){
    return this.http.get<any>(this.baseUrl);
  }
  getProductById(id){
    return this.http.get<any>(this.baseUrl+id);
  }
  getProductByCategory(category){
    return this.http.get<any>(this.baseUrl+"cat/"+category);
  }
  
  setUserById(message,Email,Pno){
    var body={
        email:Email,
        Message:message,
        pno:Pno
    }
    return this.http.get<any>(this.setUrl+message+"/"+Email+"/"+Pno)
  }

  setReviews(review,name,email,id){
    return this.http.get<any>(this.Review+review+"/"+name+"/"+email+"/"+id)
  }
  getReviewById(id){
    return this.http.get<any>(this.ReviewGet+id);
  }

  getFilteredList(findQuery,sortQuery){
    var body={
      find:findQuery,
      sort:sortQuery
    }
    return this.http.post<any>(this.filter,body);
  }

  setGoogleUser(userData){
this.userData=userData
  }
  getGoogleUser(){
    return this.userData
  }

  setCartData(name,price,image,id){
   var body:any={
    name:name,
    price:price,
    image:image,
    id:id
    }
    return this.http.post<any>(this.cartSet,body)
  }
  
  getCartData(){
    return this.http.get<any>(this.cartGet)
  }

  clearCartData(){
    return this.http.get<any>(this.cartClear)
  }

  getSpecsData(cat){
    return this.http.get<any>(this.baseUrl+"specification/"+cat)
  }

  
}
