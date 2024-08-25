import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BuscarAutorComponent } from './components/autor/buscar-autor/buscar-autor.component';
import { CrearAutorComponent } from './components/autor/crear-autor/crear-autor.component';
import { ListarAutoresComponent } from './components/autor/listar-autores/listar-autores.component';
import { EditarAutorComponent } from './components/autor/editar-autor/editar-autor.component';
import { CrudLibroComponent } from './components/libro/crud-libro/crud-libro.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'buscar-autor', component: BuscarAutorComponent },
    { path: 'crear-autor', component: CrearAutorComponent },
    { path: 'listar-autores', component: ListarAutoresComponent },
    { path: 'editar-autor', component: EditarAutorComponent },
    { path: 'libros', component: CrudLibroComponent },
    { path: '**', redirectTo: 'home' },
];