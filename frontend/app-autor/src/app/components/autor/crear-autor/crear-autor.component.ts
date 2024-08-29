import { AutorService } from './../../../services/autor.service';
import { Autor } from './../../../models/Autor';
import { Component, inject } from '@angular/core';
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

  private autorService = inject(AutorService);

  //constructor(private autorService: AutorService) {}

  onSubmit() {
    this.autorService.validarDni(this.autor.dni).subscribe(valido => {
      if (valido) {
        this.autorService.saveAutor(this.autor).subscribe(
          (response) => {
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
          }
        )
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ya existe un autor con ese DNI",
          confirmButtonColor: "#3085d6",
        });
      }
    })
  }
}