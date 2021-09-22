import { Routes} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AuthGaurd } from './_service/authGaurd';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path:'dashboard',canActivate: [AuthGaurd], component: DashboardComponent},
    { path: 'login', component: HomeComponent },
   
];
export const APP_DECLARATIONS=[
    DashboardComponent,
    HomeComponent
]