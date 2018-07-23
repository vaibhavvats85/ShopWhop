import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirstService } from 'services/first.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  cartData: any=[];
  msg='No Product Available'
  sum:number
  currentUser:any

  cartLength:number;

  
//Router-Lets you link to specific routes in your app.
//FirstService-Access service methods.
  constructor(private router:Router,
    private firstservice:FirstService) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')!=undefined){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  getCart(){
    this.sum=0
    this.firstservice.getCartData().subscribe(data=>{
      this.cartData=data     
      for(let i=0;i<this.cartData.length;i++){
        this.sum+=this.cartData[i].price
      }
      this.cartLength=this.cartData.length;
    })
   
   
  }
 
 clearCart(){
   this.firstservice.clearCartData().subscribe(data=>{
     this.getCart();
   })
 }

}
export function  getCartLength(){
  return this.cartLength
}