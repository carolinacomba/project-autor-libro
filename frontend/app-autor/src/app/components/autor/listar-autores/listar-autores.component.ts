import { Observable } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { AutorService } from '../../../services/autor.service';
import { Autor } from '../../../models/Autor';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EditarAutorComponent } from '../editar-autor/editar-autor.component';
import Swal from 'sweetalert2';
import { LibroService } from '../../../services/libro.service';
import { Libro } from '../../../models/Libro';
import { EditarLibroComponent } from '../../libro/editar-libro/editar-libro.component';

@Component({
  selector: 'app-listar-autores',
  templateUrl: './listar-autores.component.html',
  styleUrls: ['./listar-autores.component.css'],
  imports: [
    CommonModule,
    HttpClientModule,
    EditarAutorComponent,
    EditarLibroComponent,
  ],
  standalone: true,
  providers: [AutorService, LibroService],
})
export class ListarAutoresComponent implements OnInit {

  autores: Autor[] = [];

  librosByAutor!: Observable<Libro[]>;

  private autorService = inject(AutorService);
  private libroService = inject(LibroService);
  listarAutores: boolean = false;

  editingLibro: Libro | null = null;

  dniAGuardar: number = 0;

  //constructor(private autorService: AutorService) {}

  ngOnInit() {
    this.loadAutores();
  }

  loadAutores() {
    this.autorService.getAutores().subscribe(
      (data) => {
        this.autores = data;
      },
      (error) => {
        console.error('Error al cargar autores', error);
      }
    );
  }

  editingAutor: Autor | null = null;

  editAutor(autor: Autor) {
    this.editingAutor = { ...autor };
  }

  onAutorUpdated(updatedAutor: Autor) {
    const index = this.autores.findIndex(
      (a) => a.dni === this.editingAutor?.dni
    );
    if (index !== -1) {
      this.autores[index] = updatedAutor;
    }
    this.editingAutor = null;
    this.loadAutores();
  }

  cancelEdit() {
    this.editingAutor = null;
  }

  deleteAutor(autor: Autor) {
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
        this.autorService.deleteAutor(autor.dni).subscribe(
          () => {
            Swal.fire(
              '¡Exitoso!',
              'El autor ha sido eliminado correctamente',
              'success'
            );
            this.loadAutores();
          },
          (error) => {
            Swal.fire(
              '¡Error!',
              'Hubo un error al intentar borrar el autor',
              'error'
            );
            console.error('Error al eliminar autor', error);
          }
        );
      }
    });
  }

  listarLibrosPorAutor(dni: number) {
    this.librosByAutor = this.libroService.getLibroByAutor(dni);
    this.listarAutores = true;
  }

  deleteLibro(libro: Libro) {
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
        this.libroService.deleteLibro(libro.id!).subscribe(
          () => {
            Swal.fire(
              '¡Exitoso!',
              'El libro ha sido eliminado correctamente',
              'success'
            );
            this.listarLibrosPorAutor(libro.autor!.dni);
          },
          (error) => {
            Swal.fire(
              '¡Error!',
              'Hubo un error al intentar borrar el libro',
              'error'
            );
            console.error('Error al eliminar libro', error);
          }
        );
      }
    });
  }

  guardarDni():number {
    this.dniAGuardar = this.editingLibro!.autor!.dni!;
    return this.dniAGuardar;
  }

  editLibro(libro: Libro): number {
    this.editingLibro = { ...libro };
    return libro.autor!.dni!;
  }

  onLibroUpdated(updatedLibro: Libro) {
    this.editingLibro = null;
    this.listarLibrosPorAutor(this.dniAGuardar);
  }

  cancelEditLibro() {
    this.editingLibro = null;
  }
}
