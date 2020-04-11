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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterDetailsComponent } from './master-details/master-details.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CountrySearchComponent } from './search/country-search.component';
import { CountrySearchService } from './services/country-search.service';
import { AppHomeComponent } from './home/app-home.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    AppHomeComponent,
    MasterDetailsComponent,
    CountrySearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatRippleModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    CommonHttpService,
    CountryDetailService,
    CountrySearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
