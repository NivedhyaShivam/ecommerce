import { Routes} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path:'dashboard', component: DashboardComponent},
    { path: 'home', component: HomeComponent },
   
];
export const APP_DECLARATIONS=[
    DashboardComponent,
    HomeComponent
]