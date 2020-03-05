import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { routes } from './app-routing.module';
import { CommonHttpService } from './services/common-http.service';
import { CountryDetailService } from './services/country-detail.service';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MasterDetailsComponent } from './master-details/master-details.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    MasterDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatRippleModule,
    MatCheckboxModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    CommonHttpService,
    CountryDetailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
