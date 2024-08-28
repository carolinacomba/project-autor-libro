import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Libro } from '../models/Libro';
import { Observable } from 'rxjs';
import { LibroDTO } from '../models/LibroDTO';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  private api = 'http://localhost:8080/api/libro';

  constructor(private http: HttpClient) {}

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.api+'/getLibros');
  }

  updateLibro(id: number, libro: LibroDTO): Observable<any> {
    return this.http.put<Libro>(this.api+'/updateLibro/'+id, libro);
  }

  deleteLibro(id: number){
    return this.http.delete<Libro>(this.api+'/deleteLibro/'+id);
  }

  addLibro(libro: Libro, dni: number){
    return this.http.post<Libro>(this.api+'/saveLibro/'+dni, libro);
  }

}
