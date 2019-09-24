import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private apiUrl = 'assets/api/products.json';

    constructor(private http: HttpClient) {
    }

    getProductsList(): Observable<IProducts[]> {
        return this.http.get<IProducts[]>(this.apiUrl).pipe(
            // tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
    }
    //Console logging
    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            //client side of netowrk error occured
            errorMessage = `An error occured: ${err.error.message}`;
        }
        else {
            //The backend returned un successful response code
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

}