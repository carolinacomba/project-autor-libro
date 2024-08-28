import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Autor } from '../models/Autor';

@Injectable({
  providedIn: 'root',
})
export class AutorService {
  private api = 'http://localhost:8080/api/autor';

  constructor(private http: HttpClient) {
    
  }

  saveAutor(autor: Autor): Observable<any> {
    return this.http.post<Autor>(this.api+'/saveAutor/', autor);
  }

  getAutores(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.api+'/getAutores');
  }

  updateAutor(dni: number, autor: Autor): Observable<any> {
    return this.http.put<Autor>(this.api+'/updateAutor/'+dni, autor);
  }

  deleteAutor(dni: number): Observable<any> {
    return this.http.delete<Autor>(this.api+'/deleteByDni/'+dni);
  }

  getAutorByDni(dni: number): Observable<Autor> {
    return this.http.get<Autor>(this.api+'/getAutorByDni/'+dni);
  }

  getAutorById(id: number): Observable<Autor> {
    return this.http.get<Autor>(this.api+'/getAutorById/'+id);
  }

  validarDni(dni: number): Observable<boolean> {
    return this.getAutores().pipe(
      map((autores: Autor[]) => {
        return !autores.some(autor => autor.dni === dni);
      })
    );
  }
}