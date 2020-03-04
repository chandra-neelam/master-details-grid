import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CommonHttpService {
    constructor(private http: HttpClient) {
    }

    get<T>(url: string, httpParams?: HttpParams) {
        const httpOptions = {
            // headers: new HttpHeaders({
            //     'Content-Type': 'application/json'
            // }),
            params: httpParams
        };

        return this.http.get<T>(url, httpOptions).pipe(catchError(err => this.handleError(err)))
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error(error.error.message);
        } else {
            console.error(JSON.stringify(error.error));
        }
        
        return throwError('Internal Server Error');
    }
}