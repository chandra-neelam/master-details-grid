import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MasterDetailsComponent } from './master-details/master-details.component';

export const routes: Routes = [
  { path: 'masterdetails', component: MasterDetailsComponent },
  { path: '',
    redirectTo: '/masterdetails',
    pathMatch: 'full'
  },  
  { path: '**', component: MasterDetailsComponent }
];

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes)
//   ],
//   exports: [RouterModule],
//   providers: []
// })
// export class AppRoutingModule { }