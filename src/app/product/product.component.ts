import { Component, OnInit } from '@angular/core';
import { FirstService } from 'services/first.service';
import { Router } from '@angular/router';
import { empty } from 'rxjs/internal/observable/empty';
import { Location } from '@angular/common';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  emp = '';
  product1: any;
  colorQuery: any
  tagsQuery: any
  priceQuery: any;
  product = [];
  p: number = 1
  sortQuery = {}
  findQuery = {
    $and: []
  }

  priceArray = []

  sort = ['Default', 'Popularity', 'Rating', 'Price', 'Newness']
  sortActual = ['product_name', 'overall_rating', 'product_rating', 'discounted_price', 'crawl_timestamp']

  price = ['All', ' ₹0- ₹700', ' ₹700- ₹1500', ' ₹1500- ₹5000', ' ₹5000- ₹10000', ' ₹10000+']

  color = ['Black', 'Blue', 'Grey', 'Green', 'Red', 'White']
  colorActual = ['black', 'blue', 'grey', 'green', 'red', 'white']

  tags = ['Clothing', 'Sports & Fitness', 'Jewellery', 'Footwear', 'Baby Care', 'Computers', 'Furniture', 'Mobiles & Accessories']

  priceLow: number = 500
  priceHigh: number = 25000
  low = 0
  high = 50000
  colorng = ''
  tagsng = ''
  priceng = ''
  sortng = ''

  sortBtn = ['s1', 's2', 's3', 's4', 's5']
  colorBtn = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']
  tagsBtn = ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8']

  //Router-Lets you link to specific routes in your app.
  //FirstService-Access service methods.
  constructor(private firstservice: FirstService, private router: Router) { }

  ngOnInit() {

    this.firstservice.getProduct().subscribe(data => {
      this.product = data
    })

  }


  //Generating JSON for filter query
  getFilterList() {

    //Sort by

    for (let i = 0; i < this.sort.length; i++) {

      if (this.sortng == this.sort[i]) {

        this.sortQuery = { [this.sortActual[i]]: 1 }
      }
    }

    //Price


    this.priceQuery = { $and: [{ "discounted_price": { $lte: this.high } }, { "discounted_price": { $gte: this.low } }] }


    this.findQuery.$and.push(this.priceQuery)


    //Color
    if (this.colorng != '') {
      for (let i = 0; i < this.color.length; i++) {

        if (this.colorng == this.color[i]) {
          var col = this.color[i]
          this.colorQuery = { "product_specifications.product_specification.value": col }
        }
      }
      this.findQuery.$and.push(this.colorQuery)
    }

    //Tags

    if (this.tagsng != '') {
      for (let i = 0; i < this.tags.length; i++) {

        if (this.tagsng == this.tags[i]) {
          var tag = this.tags[i] + " "
          this.tagsQuery = { "product_category_tree": tag }
        }
      }
      this.findQuery.$and.push(this.tagsQuery)
    }




    this.firstservice.getFilteredList(this.findQuery, this.sortQuery).subscribe(data => {
      this.product = data
      if (this.product.length == 0) {
        this.emp = "No products Available"


      }
      else {
        this.emp = ''
      }
    })

    this.findQuery = {
      $and: []
    }
    this.sortQuery = {}

  }

  getSort(list, event) {
    var elem: any = []
    elem = document.getElementsByName('sort')

    for (let i = 0; i < elem.length; i++) {
      elem[i].classList.remove('current')
    }
    this.sortng = list
    event.target.classList.toggle('current');



  }

  getTags(list, event) {
    var elem: any = []
    elem = document.getElementsByName('tags')
    for (let i = 0; i < elem.length; i++) {
      elem[i].classList.remove('current')
    }
    this.tagsng = list
    event.target.classList.toggle('current');


  }

  getColor(list, event) {
    var elem: any = []
    elem = document.getElementsByName('color')
    for (let i = 0; i < elem.length; i++) {
      elem[i].classList.remove('current')
    }
    this.colorng = list
    event.target.classList.toggle('current');



  }

}
