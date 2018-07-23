import { Component, OnInit } from '@angular/core';
import { FirstService } from 'services/first.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


message:string='';
Email:string='';
Pno:string='';

//Router-Lets you link to specific routes in your app.
//ActivatedRoute-Contains the information about a route associated with a component loaded in an outlet.
//FirstService-Access service methods.
  constructor(private firstservice:FirstService) { }
msg:string;
  ngOnInit() {
    
  }
  setUser(){
    this.firstservice.setUserById(this.message,this.Email,this.Pno).subscribe(data=>{
      this.msg=data
      
    })

    this.message=''
    this.Email=''
    this.Pno=''
  }

}
