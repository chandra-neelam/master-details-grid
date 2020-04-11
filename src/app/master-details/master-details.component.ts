import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CountryDetailService } from '../services/country-detail.service';
import { Country, CountrySearchCriteria } from '../model/country-model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { trigger, style, state, animate, transition } from '@angular/animations';
import { CountrySearchService } from '../services/country-search.service';
import { Subscription } from 'rxjs/internal/Subscription';

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
export class MasterDetailsComponent implements OnInit, OnDestroy {
  countryColumns = ['name', 'capital', 'region', 'population', 'flag'];
  languageColumns = ['actionColumn', 'iso639_2', 'name', 'nativeName'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  countryDataSource: MatTableDataSource<Country>;
  countries: Array<Country>;
  searchSubscription: Subscription;

  constructor(private countryDetailService: CountryDetailService,
    private countrySearchService: CountrySearchService) {
    this.searchSubscription = this.countrySearchService.subscribeSearch()
      .subscribe(searchCriteria => {
        this.filterCountries(searchCriteria);
      });
  }

  ngOnInit(): void {
    this.loadCountries();
  }

  private filterCountries(searchCriteria: CountrySearchCriteria) {
    var filteredCountries = this.countries.filter(x => (!searchCriteria.countryName || x.name.toUpperCase().startsWith(searchCriteria.countryName.toUpperCase())) && (!searchCriteria.population || x.population > searchCriteria.population));
    this.countryDataSource.data = filteredCountries;
    this.countryDataSource.connect().next(filteredCountries);
  }


  private loadCountries() {
    this.countryDetailService.getCountries().subscribe(data => {
      if (data) {
        data.forEach(x => {
          x.displayDetails = false;
        });
        this.countries = data;
        this.countryDataSource = new MatTableDataSource<Country>(data);
        this.countryDataSource.paginator = this.paginator;
        this.countryDataSource.sort = this.sort;
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
    this.countryDataSource.data.forEach(x => { x.displayDetails = false; });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}