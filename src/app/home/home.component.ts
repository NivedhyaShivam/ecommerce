import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {

  constructor(private route: Router, private message: MessageService) { }

  username: string = "";
  password: string = '';
  isDisabled: boolean = true;
  ngOnInit(): void {
  }

  goToDashboard() {

    var rand = function () {
      return Math.random().toString(36).substr(2);
    };
    var token = function () {
      return rand() + rand();
    };
    token();
    localStorage.setItem("access-token", token());
    console.log('localStorage', localStorage)
    if ((this.username != '') && (this.password != '')) {
      if ((this.username == 'Nivedhya') && (this.password != 'Nive@123')) {
        this.message.add({ severity: 'error', summary: 'Error', detail: 'Username and Password does not match' });
      } else {
        this.route.navigateByUrl('/dashboard')
      }
    } else {
      this.message.add({ severity: 'error', summary: 'Error', detail: 'Please Enter Username and Password' });
    }

  }

}
