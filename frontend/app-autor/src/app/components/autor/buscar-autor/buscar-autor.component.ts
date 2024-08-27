import { Component, OnInit } from '@angular/core';
import { Autor } from '../../../models/Autor';
import { AutorService } from '../../../services/autor.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EditarAutorComponent } from '../editar-autor/editar-autor.component';

@Component({
  selector: 'app-buscar-autor',
  templateUrl: './buscar-autor.component.html',
  styleUrls: ['./buscar-autor.component.css'],
  imports: [CommonModule, HttpClientModule, FormsModule, EditarAutorComponent],
  standalone: true,
  providers: [AutorService],
})
export class BuscarAutorComponent implements OnInit {

  autor: Autor = {
    nombre: '',
    apellido: '',
    dni: 0,
  };

  id: number = 0;
  dni: number = 0;
  editingAutor: Autor | null = null;

  constructor(private autorService: AutorService) {}

  ngOnInit() {}

  buscarById() {
    this.autorService.getAutorById(this.id).subscribe(
      (data) => {
        this.autor = data;
      },
      (error) => {
        alert(`Error al buscar al autor: ${error.message}`); }
    );
  }

  buscarByDni() {
    this.autorService.getAutorByDni(this.dni).subscribe(
      (data) => {
        this.autor = data;
      },
      (error) => {
        Swal.fire({
          title: "Error",
          text: "No se encontro el autor",
          icon: "error",
          showCloseButton: true,
          confirmButtonColor: "#3085d6",
        });      
      }
    );
  }

  startEditing() {
    this.editingAutor = { ...this.autor };
  }

  onAutorUpdated(updatedAutor: Autor) {
    this.autor = updatedAutor;
    this.editingAutor = null;
    this.dni = this.autor.dni;
    this.loadAutor();
  }

  loadAutor() {
    this.autorService.getAutorByDni(this.dni).subscribe(
      (data) => {
        this.autor = data;
      },
      (error) => {
        console.error('Error al cargar el autor', error);
        Swal.fire('Error', 'No se pudo cargar el autor actualizado', 'error');
      }
    );
  }

  cancelEdit() {
    this.editingAutor = null;
  }

  updateAutor() {
    this.autorService.updateAutor(this.autor.dni, this.autor).subscribe(
      (updatedAutor) => {
        this.autor = updatedAutor;
        Swal.fire('¡Éxito!', 'Autor actualizado correctamente', 'success');
      },
      (error) => {
        console.error('Error al actualizar el autor', error);
        Swal.fire('Error', 'No se pudo actualizar el autor', 'error');
      }
    );
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
            this.autor = {
              nombre: '',
              apellido: '',
              dni: 0,
            };
            location.reload();
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