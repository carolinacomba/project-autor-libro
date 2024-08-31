import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibroService } from '../../../services/libro.service';
import { Libro } from '../../../models/Libro';
import Swal from 'sweetalert2';
import { AutorService } from '../../../services/autor.service';

@Component({
  selector: 'app-add-libro',
  templateUrl: './add-libro.component.html',
  styleUrls: ['./add-libro.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [LibroService, AutorService],
})
export class AddLibroComponent implements OnInit {
  @Output() libroAdded = new EventEmitter<Libro>();
  @Output() cancelarAdd = new EventEmitter<void>();

  @Input() recibirDni: number = 0;

  @ViewChild('dniInput', { static: true }) dniInput!: ElementRef;

  dniAutor: number = 0;

  libro: Libro = {
    nombre: '',
    editorial: '',
    genero: '',
  };

  private autorService = inject(AutorService);
  private libroService = inject(LibroService);

  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    if (this.recibirDni) {
      this.dniAutor = this.recibirDni;
      setTimeout(() => {
        this.dniInput.nativeElement.value = this.dniAutor;
        this.dniInput.nativeElement.dispatchEvent(new Event('input'));
      }, 0);
    }
  }

  onCancel() {
    this.cancelarAdd.emit();
  }

  onSubmit() {
    console.log('DNI enviado para validación:', this.dniAutor);
    this.autorService.validarDni(this.dniAutor).subscribe(
      (autorExiste) => {
        console.log('Respuesta del backend:', autorExiste);
        if (autorExiste) {
          this.libroService.addLibro(this.libro, this.dniAutor).subscribe(
            (libro) => {
              Swal.fire({
                icon: 'success',
                title: 'Libro creado correctamente',
                showConfirmButton: false,
                timer: 2000,
              });
              this.libroAdded.emit(libro);
              this.libro = {
                nombre: '',
                editorial: '',
                genero: '',
              };
              this.dniAutor = 0;
              this.cancelarAdd.emit();
            },
            (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Error al crear el libro',
                text: 'Hubo un problema al guardar el libro. Por favor, inténtelo de nuevo.',
              });
            }
          );
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Autor no encontrado',
            text: 'No se encontró un autor con el DNI proporcionado.',
          });
        }
      },
      (error) => {
        console.error('Error al validar DNI:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error de validación',
          text: 'Hubo un problema al validar el DNI del autor. Por favor, inténtelo de nuevo.',
        });
      }
    );
  }
}
