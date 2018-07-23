import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirstService } from 'services/first.service';
import { ProductComponent } from 'src/app/product/product.component';
import { log } from 'util';
import { getCartLength } from 'src/app/header/header.component'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  emp: any;

  product;
  id = this.activatedRoute.snapshot.params['id'];
  review: string = ''
  // name:string=''
  poleData;
  comment;

  counter;
  neg: number = 0;
  pos: number = 0;

  reviewData


  cartData;

  //Router-Lets you link to specific routes in your app.
  //ActivatedRoute-Contains the information about a route associated with a component loaded in an outlet.
  //FirstService-Access service methods.
  constructor(private activatedRoute: ActivatedRoute, private _router: Router,
    private firstservice: FirstService) {
  }

  //Getting Product details
  ngOnInit() {
    this.firstservice.getProductById(this.id).subscribe(data => {
      this.product = data

    })
    this.firstservice.getReviewById(this.id).subscribe(data => {
      this.reviewData = data


    })

  }

  //Getting reviews
  getPolarity() {

    if (localStorage.getItem('currentUser') != undefined) {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var name = currentUser.name;
      var email = currentUser.email // your token
    }
    else {
      name = "Anonymous"
      email = "No Email"
    }
    this.firstservice.setReviews(this.review, name, email, this.id).subscribe(data => {
      this.poleData = data
      this.comment = "Thanks for your Feedback"
    })

    this.firstservice.getReviewById(this.id).subscribe(data => {
      this.reviewData = data

    })

    this.review = ''

  }



  cartMsg: string = '';
  addToCart(name, price, image: string, id) {
    this.firstservice.getCartData().subscribe(data => {

      if (data.length < 3) {
        this.cartMsg = data.length + 1 + ' -Product Added to Cart'
        this.firstservice.setCartData(name, price, image, id).subscribe(data => {
          this.cartData = data

        })
      } else {
        this.cartMsg = 'No More Products Allowed (Only 3)'
      }
    })
  }

}

