import { Component, OnInit, ViewChild } from '@angular/core';
import { CountryDetailService } from '../services/country-detail.service';
import { Country } from '../model/country-model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { trigger, style, state, animate, transition } from '@angular/animations';

@Component({
  selector: 'master-details',
  templateUrl: './master-details.component.html',
  styleUrls: ['./master-details.component.sass'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class MasterDetailsComponent implements OnInit {
  countryColumns = ['name', 'capital', 'region', 'population', 'flag'];
  languageColumns = ['iso639_2', 'name', 'nativeName'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  countries: MatTableDataSource<Country>;

  constructor(private countryDetailService: CountryDetailService) {
  }

  ngOnInit(): void {
    this.loadCountries();
  }

  private loadCountries() {
    this.countryDetailService.getCountries().subscribe(data => {
      if (data) {
        data.forEach(x => {
          x.displayDetails = false;
        });
        this.countries = new MatTableDataSource<Country>(data);
        this.countries.paginator = this.paginator;
        this.countries.sort = this.sort;
      }
    });
  }

  isExpansionDetailRow = (index, item) => item.languages;
  expandedElement: any;

  setDetailRow(row: Country, flag: boolean) {
    this.resetExpandableFlags();
    row.displayDetails = flag;
  }

  resetExpandableFlags() {
    this.countries.data.forEach(x => {x.displayDetails = false;});
  }
}

// export class CountryDataSource extends DataSource<any> {
//   constructor(private countryDetailService: CountryDetailService) {
//     super();
//   }

//   connect(): Observable<Country[]> {
//     return this.countryDetailService.getCountries();
//   }

//   disconnect() {}
// }