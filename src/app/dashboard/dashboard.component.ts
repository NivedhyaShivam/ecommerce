import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_service/api.service'
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import * as $ from 'jquery'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {

  constructor(private apiService: ApiService, private message: MessageService, private route: Router, private http: HttpClient) { }

  resultData: Array<Object> = []
  cars = []
  columns: any;
  loading: boolean = true;
  totalCount: Number = 0;
  closeResult: string;
  first = 0;
  rows = 10;
  showLoader: boolean = true;
  translatedText: string;
  supportedLanguages: any[];

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.apiService.getMembersData().subscribe((result: any) => {
      result.forEach(val => {
        val['name'] = val['firstName'] + ' ' + val['lastName']
      })
      if (result.length != 0) {
        this.showLoader = false;
        this.loading = false;
      }
      this.totalCount = result.length;
      console.log('result', this.resultData)
      this.cars = result;
      this.columns = [{ prop: 'id' }, { name: 'firstName' }, { name: 'lastName' }, { name: 'email' }, { name: 'project' }, { name: 'projectDescription' }, { name: 'designation' }];
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
    return this.first === (this.cars.length - this.rows);
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
      this.route.navigateByUrl('/login')
    }, 500);

  }

}
