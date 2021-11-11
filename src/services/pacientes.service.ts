import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Paciente } from '../interfaces/paciente';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = "http://apipacientes.patelecomsrl.com/api/pacientes";

@Injectable({
  providedIn: 'root'
})



export class PacientesService {



  constructor(private http: HttpClient) { }

  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(apiUrl)
      .pipe(
        tap(product => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }


  getPaciente(id: number): Observable<Paciente> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Paciente>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<Paciente>(`getProduct id=${id}`))
    );
  }

  addPaciente(product: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(apiUrl, product, httpOptions).pipe(
      tap((prod: Paciente) => console.log(`added product w/ id=${product.id}`)),
      catchError(this.handleError<Paciente>('addProduct'))
    );
  }

  // updateProduct(id: any, product: Product): Observable<any> {
  //   const url = `${apiUrl}/${id}`;
  //   return this.http.put(url, product, httpOptions).pipe(
  //     tap(_ => console.log(`updated product id=${id}`)),
  //     catchError(this.handleError<any>('updateProduct'))
  //   );
  // }

  // deleteProduct(id: any): Observable<Product> {
  //   const url = `${apiUrl}/${id}`;
  //   return this.http.delete<Product>(url, httpOptions).pipe(
  //     tap(_ => console.log(`deleted product id=${id}`)),
  //     catchError(this.handleError<Product>('deleteProduct'))
  //   );
  // }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}


