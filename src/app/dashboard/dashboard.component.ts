import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_service/api.service'
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class DashboardComponent implements OnInit {

  constructor(private apiService: ApiService, private message: MessageService, private route: Router, private confirmationService: ConfirmationService) { }

  resultData: Array<Object> = []
  products = []
  columns: any;
  loading: boolean = true;
  totalCount: Number = 0;
  closeResult: string;
  first = 0;
  rows = 10;
  showLoader: boolean = false;
  productDialog: boolean = false;
  product: any = {};
  productStatus = [
    { label: 'Select Status', value: null },
    { label: 'In Stock', value: 'InStock' },
    { label: 'Sold Out', value: 'SoldOut' }
  ];
  submitted: boolean;
  ngOnInit(): void {
    this.getData();
    this.loading = false;
    this.products = [{ "id": 1, "name": "Cookies - Englishbay Oatmeal", "description": "Resection of Right Hip Tendon, Open Approach", "price": "$9.59", "category": "Industrial", "status": true }, { "id": 2, "name": "Maple Syrup", "description": "Drainage of Rectum, Via Natural or Artificial Opening", "price": "$2.68", "category": "Kids", "status": false }, { "id": 3, "name": "Eggplant Oriental", "description": "Repair Right Ethmoid Sinus, Percutaneous Approach", "price": "$6.57", "category": "Garden", "status": false }, { "id": 4, "name": "Cheese - St. Paulin", "description": "Therapeutic Exercise Treatment of Neurological System - Head and Neck using Aerobic Endurance and Conditioning Equipment", "price": "$9.70", "category": "Beauty", "status": true }, { "id": 5, "name": "Persimmons", "description": "Replacement of Right Lower Eyelid with Autologous Tissue Substitute, Open Approach", "price": "$7.39", "category": "Clothing", "status": true }, { "id": 6, "name": "Spaghetti Squash", "description": "Bypass Gallbladder to Right Hepatic Duct with Intraluminal Device, Percutaneous Endoscopic Approach", "price": "$3.75", "category": "Music", "status": false }, { "id": 7, "name": "Bar Special K", "description": "Drainage of Thymus, Open Approach, Diagnostic", "price": "$0.86", "category": "Music", "status": false }, { "id": 8, "name": "Appetizer - Sausage Rolls", "description": "Repair Right Trunk Bursa and Ligament, Open Approach", "price": "$7.04", "category": "Electronics", "status": false }, { "id": 9, "name": "Salt - Rock, Course", "description": "Drainage of Right Axilla with Drainage Device, Percutaneous Approach", "price": "$2.03", "category": "Kids", "status": true }, { "id": 10, "name": "Tart - Lemon", "description": "Replacement of Right Fibula with Autologous Tissue Substitute, Percutaneous Endoscopic Approach", "price": "$1.89", "category": "Industrial", "status": true }]
  }

  getData() {
    this.apiService.getMembersData().subscribe((result: any) => {
      console.log('result', result)
      if (result.length != 0) {
        this.showLoader = false;
        this.loading = false;
      }
      this.products = result;
    },
      error => {
        console.log('from component', error)
        this.message.add({ severity: 'error', summary: 'Error', detail: error });
      }
    );
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.first === (this.products.length - this.rows);
  }

  isFirstPage(): boolean {
    return this.first === 0;
  }

  clear(table: any) {
    table.clear();
  }

  backToHome(logout?: boolean) {
    if (logout) {
      //this.message.add({ severity: 'success', summary: 'Success', detail: 'Loggged out successfully!', life: 5000, sticky: true });
    }
    setTimeout(() => {
      localStorage.setItem('access-token', "")
      this.route.navigateByUrl('/login')
    }, 500);

  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  saveProduct() {
    this.submitted = true;
    if (this.product.name.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.message.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      }
      else {
        this.product.id = this.products.length + 1;
        console.log('product', this.product)
        this.products.push(this.product);
        this.message.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
      console.log('after add ', this.products)
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  editProduct(product: any) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(val => val.id !== product.id);
        this.product = {};
        this.message.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

}
