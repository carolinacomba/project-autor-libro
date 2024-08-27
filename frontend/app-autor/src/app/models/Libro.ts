import { Autor } from "./Autor";

export interface Libro {
    id?: number;
    nombre: string;
    editorial: string;
    genero: string;
    autor?: Autor;
}