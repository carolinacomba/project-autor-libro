import { HttpClientModule } from '@angular/common/http';
import { LibroService } from './../../../services/libro.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Autor } from '../../../models/Autor';
import { Libro } from '../../../models/Libro';
import { EditarLibroComponent } from '../editar-libro/editar-libro.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-libro',
  templateUrl: './crud-libro.component.html',
  styleUrls: ['./crud-libro.component.css'],
  imports: [FormsModule, CommonModule, HttpClientModule, EditarLibroComponent],
  standalone: true,
  providers: [LibroService],
})
export class CrudLibroComponent implements OnInit {
  libros: Libro[] = [];

  constructor(private libroService: LibroService) {}

  loadLibros() {
    this.libroService.getLibros().subscribe((libros) => {
      this.libros = libros;
    });
  }

  editingLibro: Libro | null = null;

  ngOnInit() {
    this.loadLibros();
  }

  editLibro(libro: Libro) {
    this.editingLibro = { ...libro };
  }

  onLibroUpdated(updatedLibro: Libro) {
    if (this.editingLibro) {
      const index = this.libros.findIndex(
        (l) => l.id === this.editingLibro!.id
      );
      if (index !== -1) {
        this.libros[index] = updatedLibro;
      }
    }
    this.editingLibro = null;
    this.loadLibros();
  }

  cancelEdit() {
    this.editingLibro = null;
  }

  id?: number;

  deleteLibro(id: number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCloseButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.libroService.deleteLibro(id).subscribe(
          () => {
            Swal.fire(
              '¡Exitoso!',
              'El autor ha sido eliminado correctamente',
              'success'
            );
            this.loadLibros();
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
}
