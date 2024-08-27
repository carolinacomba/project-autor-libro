import { LibroService } from './../../../services/libro.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Libro } from '../../../models/Libro';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Autor } from '../../../models/Autor';
import Swal from 'sweetalert2';
import { LibroDTO } from '../../../models/LibroDTO';

@Component({
  selector: 'app-editar-libro',
  templateUrl: './editar-libro.component.html',
  styleUrls: ['./editar-libro.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
  providers: [LibroService],
})
export class EditarLibroComponent implements OnInit {
  @Input() libro!: Libro;
  @Output() libroUpdated = new EventEmitter<Libro>();
  @Output() cancelEdit = new EventEmitter<void>();

  libroDTO: LibroDTO = {
    nombre: '',
    editorial: '',
    genero: '',
  };

  editingLibro: Libro | null = null;

  constructor(private libroService: LibroService) {}

  ngOnInit() {}

  onSubmit() {
    Swal.fire({
      title: '¿Quieres guardar los cambios?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Guardar',
      denyButtonText: 'No guardar',
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#6c757d',
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.libroDTO.nombre = this.libro.nombre;
        this.libroDTO.editorial = this.libro.editorial;
        this.libroDTO.genero = this.libro.genero;
        this.libroService.updateLibro(this.libro.id!, this.libroDTO).subscribe(
          (updatedLibro) => {
            this.libroUpdated.emit(updatedLibro);
            Swal.fire(
              '¡Guardado!',
              'Los cambios se han guardado exitosamente.',
              'success'
            );
          },
          (error) => {
            Swal.fire(
              'Error',
              `Error al actualizar el libro: ${error.message}`,
              'error'
            );
          }
        );
      } else if (result.isDenied) {
        Swal.fire(
          'Cambios no guardados',
          'No se han realizado modificaciones.',
          'info'
        );
      }
    });
  }

  onCancel() {
    this.cancelEdit.emit();
  }
}
