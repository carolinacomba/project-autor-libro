import { Component, OnInit } from '@angular/core';
import { AutorService } from '../../../services/autor.service';
import { Autor } from '../../../models/Autor';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EditarAutorComponent } from '../editar-autor/editar-autor.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-autores',
  templateUrl: './listar-autores.component.html',
  styleUrls: ['./listar-autores.component.css'],
  imports: [CommonModule, HttpClientModule, EditarAutorComponent],
  standalone: true,
  providers: [AutorService],
})
export class ListarAutoresComponent implements OnInit {

  autores: Autor[] = [];

  constructor(private autorService: AutorService) {}

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
    const index = this.autores.findIndex(a => a.dni === this.editingAutor?.dni);
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
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCloseButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar'
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
}