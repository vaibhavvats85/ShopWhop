import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FirstService } from 'services/first.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  //Router-Lets you link to specific routes in your app.
  //ActivatedRoute-Contains the information about a route associated with a component loaded in an outlet.
  //FirstService-Access service methods.
  constructor(private activatedRoute: ActivatedRoute, private _router: Router,
    private firstservice: FirstService) { }
  product = [];


  //Getting category data 
  ngOnInit() {
    if (this.activatedRoute.snapshot.params['category'] == 'women' || this.activatedRoute.snapshot.params['category'] == 'men') {

      this.firstservice.getSpecsData(this.activatedRoute.snapshot.params['category']).subscribe(data => {
        this.product = data
      })
    }
    else {
      this.firstservice.getProductByCategory(this.activatedRoute.snapshot.params['category']).subscribe(data => {
        this.product = data
      })
    }
  }
  emp = '';
  product1: any;
  colorQuery: any
  tagsQuery: any
  priceQuery: any;
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
  

  tags = ['Clothing', 'Sports & Fitness', 'Jewellery', 'Footwear', 'Baby Care', 'Computers', 'Furniture', 'Mobiles & Accessories']

  priceLow: number = 500
  priceHigh: number = 25000
  low = 0
  high = 50000
  colorng = ''
  tagsng = ''
  priceng = ''
  sortng = ''

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
