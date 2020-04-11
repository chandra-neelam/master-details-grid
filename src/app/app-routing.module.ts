import { Routes, } from '@angular/router';
import { AppHomeComponent } from './home/app-home.component';

export const routes: Routes = [
  { path: 'masterdetails', component: AppHomeComponent },
  { path: '',
    redirectTo: '/masterdetails',
    pathMatch: 'full'
  },  
  { path: '**', component: AppHomeComponent }
];