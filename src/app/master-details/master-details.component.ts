import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CountryDetailService } from '../services/country-detail.service';
import { Country, CountrySearchCriteria, Language } from '../model/country-model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { trigger, style, state, animate, transition } from '@angular/animations';
import { CountrySearchService } from '../services/country-search.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormControl } from '@angular/forms';

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

  searchTerm = new FormControl('', []);
  filters: any;
  globalFilter: string = '';

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
        this.countryDataSource.filterPredicate = this.filterPredicate;
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

  applyFilter(columnName: string, filterValue: string) {
    this.resetExpandableFlags();

    this.filters = {
      ...this.filters,
      [columnName]: filterValue.trim().toLowerCase()
    };

    if (!filterValue) delete this.filters[columnName];

    this.countryDataSource.filter = JSON.stringify(this.filters);
    if (this.countryDataSource.paginator) {
      this.countryDataSource.paginator.firstPage();
    }
  }

  filterPredicate(data: Country, filters: string) {
    let validGlobal = true;
    let mainGridColumns = ['name', 'capital', 'region', 'population'];
    let nestedGridColumns = ['name', 'iso639_2'];

    // [1] Parse Filters
    const parsedFilters = JSON.parse(filters);
    let filterColumns = Object.keys(parsedFilters);

    // [2] Check Global Filter Valid
    if (filterColumns.includes('Global')) {
      let globalFilterValue = parsedFilters['Global'];

      validGlobal = mainGridColumns
        .map(column => data[column] && data[column].toString().toLowerCase().includes(globalFilterValue))
        .reduce((acc: boolean, curr: boolean) => acc = (curr || acc), false);

      if (!validGlobal && data.languages && data.languages.length > 0) {
        validGlobal = data.languages
          .map(lan => nestedGridColumns
            .map(column => lan[column] && lan[column].toString().toLowerCase().includes(globalFilterValue))
            .reduce((acc: boolean, curr: boolean) => acc = (curr || acc), false))
          .reduce((acc: boolean, curr: boolean) => acc = (curr || acc), false);
      }
    }

    // [3] Remove Global filter if exists
    const index = filterColumns.indexOf('Global', 0);
    if (index > -1) {
      filterColumns.splice(index, 1);
    }

    // [4] Check Individual Filter Valid
    var validIndividual = filterColumns
      .map(column => data[column] && data[column].toString().toLowerCase().includes(parsedFilters[column]))
      .reduce((acc: boolean, curr: boolean) => acc = (curr && acc), true);

    // [5] Apply Both filters
    return validGlobal && validIndividual;
  }

  filterLanguages(languages: Array<Language>, globalFilter: string) {
    globalFilter = globalFilter.toLowerCase();
    return languages.filter(x => globalFilter == "" ||
                                 x.iso639_2.toString().toLowerCase().includes(globalFilter) || 
                                 x.name.toString().toLowerCase().includes(globalFilter) ||
                                 x.nativeName.toString().toLowerCase().includes(globalFilter));
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}