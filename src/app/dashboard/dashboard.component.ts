import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_service/api.service'
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import * as $ from 'jquery'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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
  //rows:any;
  loading: boolean = true;
  totalCount: Number = 0;
  closeResult: string;
  first = 0;
  rows = 10;
  dataParams: any = {
    page_num: '',
    page_size: ''
  };
  
  showLoader: boolean = true;
  translatedText: string;
  supportedLanguages: any[];
  apiKey = ''
  url = 'https://translation.googleapis.com/language/translate';
  result: any;
  q = 'Reprehenderit enim occaecat adipisicing enim.';
  ngOnInit(): void {
    this.dataParams.page_num = 1;
    this.dataParams.page_size = 10;
    this.getData();
    this.supportedLanguages = [
      { display: 'English', value: 'en' },
      { display: 'Español', value: 'es' },
      { display: '华语', value: 'zh' },
      ];

      // set current langage
      // this.selectLang('es');

      $('#trans').click(function() {
         this.url.language.translate($('#some').html(), 'en', 'fr', function(result) {
            $('#some').html(result.translation);
        });
      });

    //   this.url.language.translate(text, 'es', 'en', function(result) {
    //     var translated = document.getElementById("translation");
    //     if (result.translation) {
    //         translated.innerHTML = result.translation;
    //     }
    // });


    let params = new HttpParams();
    params = params.append('q', this.q);
    params = params.append('target', 'es');
    params = params.append('key ', this.apiKey);

    this.http.get(this.url, {params: params})
      .subscribe(response => this.result = response);
  }


  getData() {
    this.apiService.getMembersData().subscribe((result: any) => {
      //setTimeout(() => {
      result.forEach(val => {
        val['name'] = val['firstName'] + ' ' + val['lastName']
      })
      $('body').translate({lang: "en",});
      if (result.length != 0) {
        this.showLoader = false;
        this.loading = false;
      }
      this.totalCount = result.length;
      //this.rows = result;
      //this.columns = Object.keys(this.rows[0])
      console.log('result', this.resultData)
      this.cars = result;

      this.columns = [{ prop: 'id' }, { name: 'firstName' }, { name: 'lastName' }, { name: 'email' }, { name: 'project' }, { name: 'projectDescription' }, { name: 'designation' }];
      // }, 2000);
    },
      error => {
        console.log('from component', error)
        //this.notify.error(error)
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

  backToHome(){
    this.route.navigateByUrl('/home')
  }
//   isCurrentLang(lang: string) {
//     // check if the selected lang is current lang
//     return lang === this._translate.currentLang;
// }

// selectLang(lang: string) {
//     // set current lang;
//     this._translate.use(lang);
//     this.refreshText();
// }

// refreshText() {
//     // refresh translation when language change
//     this.translatedText = this._translate.instant('hello world');
// }

}
