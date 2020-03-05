import { Injectable } from "@angular/core";
import { CommonHttpService } from './common-http.service';
import { Country } from '../model/country-model';

@Injectable()
export class CountryDetailService {
    constructor(private httpService: CommonHttpService) {
    }

    getCountries() {
        //const url = 'https://restcountries.eu/rest/v2/all';
        const url = 'assets/countries.json';
        return this.httpService.get<Country[]>(url);
    }
}