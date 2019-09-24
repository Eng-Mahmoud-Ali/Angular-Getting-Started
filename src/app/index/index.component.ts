import { Component, OnInit } from '@angular/core';

@Component({
  // selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  pageTitle : string = "Inventory Products Management System"
  pageDescription : string = 'This system to manage the data of whole items in the company inventory'

 

}
