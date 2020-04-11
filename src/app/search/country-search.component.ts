import { Component, OnInit } from '@angular/core';
import { CountrySearchCriteria } from '../model/country-model';
import { CountrySearchService } from '../services/country-search.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'country-search',
    templateUrl: './country-search.component.html',
    styleUrls: ['./country-search.component.sass']
})
export class CountrySearchComponent implements OnInit {

    countryName = new FormControl('', []);
    population = new FormControl('', []);
    
    constructor(private countrySearchService: CountrySearchService) {
    }

    ngOnInit(): void {
    }

    public publishSearchCriteria() {
        var searchCriteria = new CountrySearchCriteria();
        searchCriteria.countryName = this.countryName.value;
        searchCriteria.population = this.population.value;
        this.countrySearchService.publishSearch(searchCriteria);
    }
}