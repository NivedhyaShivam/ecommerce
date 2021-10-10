import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//import { NgxDatatableModule } from '@swimlane/ngx-datatable';
//import { SimpleNotificationsModule , NotificationsService} from 'angular2-notifications';

import { LoaderInterceptor } from './_service/loaderInterceptor';
import {TableModule} from 'primeng/table';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToolbarModule} from 'primeng/toolbar';
import {ToastModule} from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { appRoutes } from './app.routing';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { PageBannerComponent } from './page-banner/page-banner.component';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';


import { HttpInterceptorService} from './_service/httpInterceptors';
import { LoaderService } from './_service/loader.service';
import { AuthGaurd } from './_service/authGaurd';
import { SideBarComponent } from './side-bar/side-bar.component';
import { LoaderComponent } from './loader/loader.component';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputNumberModule} from 'primeng/inputnumber';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DropdownModule} from 'primeng/dropdown';
import {ConfirmDialogModule} from 'primeng/confirmdialog';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    PageBannerComponent,
    SideBarComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    ToolbarModule,
    DialogModule,
    ButtonModule,
    InputTextareaModule,
    InputTextModule,
    DynamicDialogModule,
    RadioButtonModule,
    InputNumberModule,
    DropdownModule,
    ConfirmDialogModule,
    //NgxDatatableModule,
    TableModule,
    ProgressSpinnerModule,
    BrowserAnimationsModule,
    ToastModule,
    FormsModule,
    //SimpleNotificationsModule,
    RouterModule.forRoot(appRoutes) 
  ],
  providers: [LoaderService,AuthGaurd,
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},{provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
