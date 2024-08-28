import { HttpClientModule } from '@angular/common/http';
import { LibroService } from './../../../services/libro.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Libro } from '../../../models/Libro';
import { EditarLibroComponent } from '../editar-libro/editar-libro.component';
import Swal from 'sweetalert2';
import { AddLibroComponent } from '../add-libro/add-libro.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-crud-libro',
  templateUrl: './crud-libro.component.html',
  styleUrls: ['./crud-libro.component.css'],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    EditarLibroComponent,
    AddLibroComponent,
  ],
  standalone: true,
  providers: [LibroService],
})
export class CrudLibroComponent implements OnInit {
  
  libros$: Observable<Libro[]>;
  librosFiltrados: Libro[] = [];
  busqueda = '';
  editingLibro: Libro | null = null;
  addLibroComponent = false;

  constructor(private libroService: LibroService) {
    this.libros$ = this.libroService.getLibros();
  }

  ngOnInit() {
    this.loadLibros();
  }

  loadLibros() {
    this.libros$.subscribe(libros => {
      this.librosFiltrados = libros;
    });
  }

  editLibro(libro: Libro) {
    this.editingLibro = { ...libro };
  }

  onLibroUpdated(updatedLibro: Libro) {
    this.editingLibro = null;
    this.loadLibros();
    this.busqueda = '';
  }

  cancelEdit() {
    this.editingLibro = null;
  }

  deleteLibro(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCloseButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.libroService.deleteLibro(id).subscribe(
          () => {
            Swal.fire('¡Exitoso!', 'El libro ha sido eliminado correctamente', 'success');
            this.loadLibros();
          },
          (error) => {
            Swal.fire('¡Error!', 'Hubo un error al intentar borrar el libro', 'error');
            console.error('Error al eliminar libro', error);
          }
        );
      }
    });
  }

  addLibro() {
    this.addLibroComponent = true;
  }

  onCancelAddLibro() {
    this.addLibroComponent = false;
  }

  onLibroAdded() {
    this.addLibroComponent = false;
    this.loadLibros();
  }

  buscarLibro(query: string): void {
    this.libros$.subscribe(libros => {
      this.librosFiltrados = libros.filter(libro =>
        libro.nombre.toLowerCase().includes(query.toLowerCase()) ||
        libro.editorial.toLowerCase().includes(query.toLowerCase()) ||
        libro.genero.toLowerCase().includes(query.toLowerCase()) ||
        libro.autor?.nombre.toLowerCase().includes(query.toLowerCase()) ||
        libro.autor?.apellido.toLowerCase().includes(query.toLowerCase())
      );
    });
  }
}