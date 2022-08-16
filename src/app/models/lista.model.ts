import { Tarea } from './tarea.model';
export class Lista {

    id: number;
    titulo: string;
    creadaEn: Date;
    terminadaEn: Date;
    terminada: boolean
    tareas: Tarea[];

    constructor(titulo: string) {
        this.id = new Date().getTime();
        this.titulo = titulo;
        this.creadaEn = new Date();
        this.terminada = false
        this.tareas = [];
    }
}