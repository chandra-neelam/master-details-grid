import { Injectable } from "@angular/core";
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { CountrySearchCriteria } from '../model/country-model';

@Injectable()
export class CountrySearchService {
    private searchSubject = new Subject<CountrySearchCriteria>();

    publishSearch(searchCriteria: CountrySearchCriteria) {
        this.searchSubject.next(searchCriteria);
    }

    subscribeSearch(): Observable<CountrySearchCriteria> {
        return this.searchSubject.asObservable();
    }
}