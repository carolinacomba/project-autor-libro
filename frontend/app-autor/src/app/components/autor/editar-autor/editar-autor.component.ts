import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Autor } from '../../../models/Autor';
import { AutorService } from '../../../services/autor.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-autor',
  templateUrl: './editar-autor.component.html',
  styleUrls: ['./editar-autor.component.css'],
  imports: [FormsModule],
  standalone: true
})
export class EditarAutorComponent implements OnInit {

  @Input() autor!: Autor;
  @Output() autorUpdated = new EventEmitter<Autor>();
  @Output() cancelEdit = new EventEmitter<void>();

  originalDni: number = 0;

  ngOnInit() {
    this.originalDni = this.autor.dni;
  }

  private autorService = inject(AutorService);

  //constructor(private autorService: AutorService) {}

  onSubmit() {
    Swal.fire({
      title: "¿Quieres guardar los cambios?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Guardar",      
      denyButtonText: `No guardar`,
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#6c757d',
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.autorService.updateAutor(this.originalDni, this.autor).subscribe(
          (updatedAutor) => {
            this.autorUpdated.emit(updatedAutor);
            Swal.fire("¡Guardado!", "Los cambios se han guardado exitosamente.", "success");
          },
          (error) => {
            Swal.fire("Error", `Error al actualizar el autor: ${error.message}`, "error");
          }
        );
      } else if (result.isDenied) {
        Swal.fire("Cambios no guardados", "No se han realizado modificaciones.", "info");
      }
    });
  }

  onCancel() {
    this.cancelEdit.emit();
  }
}