import { Component, OnInit } from '@angular/core';
import { FirstService } from 'services/first.service';
import { Router } from '@angular/router';
// import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

//Router-Lets you link to specific routes in your app.
//FirstService-Access service methods.
  constructor(private firstservice:FirstService,private router:Router){
    
      
  }
  product=[];

  ngOnInit(){
    this.firstservice.getProduct().subscribe(data=>{
      this.product=data
    })
    
  }
  getProducts(category){
  window.location.href="/detailByCategory/"+category;
}

}
