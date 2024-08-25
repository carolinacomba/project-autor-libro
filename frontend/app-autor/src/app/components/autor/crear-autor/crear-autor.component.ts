import { AutorService } from './../../../services/autor.service';
import { Autor } from './../../../models/Autor';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-autor',
  templateUrl: './crear-autor.component.html',
  styleUrls: ['./crear-autor.component.css'],
  imports: [FormsModule, CommonModule, HttpClientModule],
  standalone: true,
  providers: [AutorService],
})
export class CrearAutorComponent {
  autor: Autor = {
    nombre: '',
    apellido: '',
    dni: 0,
  };

  constructor(private autorService: AutorService) {}

  onSubmit() {
    this.autorService.saveAutor(this.autor).subscribe(
      (response) => {
        console.log('Autor guardado:', response);
        Swal.fire({
          icon: "success",
          title: "Autor creado correctamente",
          showConfirmButton: false,
          timer: 1500
        });
        this.autor = {
          nombre: '',
          apellido: '',
          dni: 0,
        };
      },
      (error) => {
        console.error('Error completo:', error);
        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          console.error('Error del cliente:', error.error.message);
        } else {
          // El backend devolvió un código de respuesta unsuccessful
          console.error(`Backend devolvió código ${error.status}, ` +
            `cuerpo era: ${error.error}`);
        }
        alert(`Error al guardar el autor: ${error.message}`);
      }
    );
  }
}