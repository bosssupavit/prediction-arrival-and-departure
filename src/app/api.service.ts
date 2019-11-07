import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry, catchError, map } from 'rxjs/operators';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL = '';

  constructor(private http: HttpClient, private router: Router) {
    this.URL = environment.apiURL;
  }

  getMonth(): Observable<any> {
    return this.http.get<any>(this.URL + '/api?q=month').pipe(delay(200),
      retry(1), catchError(this.handleError));
  }

  getDataTH(iso): Observable<any> {
    return this.http.get<any>(this.URL + `/api?month=${iso}&region=thailand`).pipe(delay(200),
      retry(1), catchError(this.handleError));
  }

  getDataNA(iso): Observable<any> {
    return this.http.get<any>(this.URL + `/api?month=${iso}&region=national`).pipe(delay(200),
      retry(1), catchError(this.handleError));
  }

  getYearTH(year) {
    return this.http.get<any>(this.URL + `/api?year=${year}&region=thailand`).pipe(delay(200),
      retry(1), catchError(this.handleError));
  }

  getYearNA(year) {
    return this.http.get<any>(this.URL + `/api?year=${year}&region=national`).pipe(delay(200),
      retry(1), catchError(this.handleError));
  }

  getStaticTH() {
    return this.http.get<any>(this.URL + '/static?region=thailand').pipe(delay(200),
      retry(1), catchError(this.handleError));
  }

  getStaticNA() {
    return this.http.get<any>(this.URL + '/static?region=national').pipe(delay(200),
      retry(1), catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
