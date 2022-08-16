import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { Tarea } from '../../models/tarea.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  tareaDesc = '';

  constructor(private _deseosService: DeseosService,
    private route: ActivatedRoute) {
    const listaId = this.route.snapshot.paramMap.get('listaId');
    this.lista = this._deseosService.obtenerLista(listaId);
  }

  ngOnInit() {
  }

  agregarItem() {
    if (this.tareaDesc.length === 0) return
    const nuevaTarea = new Tarea(this.tareaDesc);

    this.lista.tareas.push(nuevaTarea);

    this.tareaDesc = '';

    this._deseosService.guardarStorage();
  }

  cambioCheck(tarea: Tarea) {
    const pendientes = this.lista.tareas.filter(tareaData => !tareaData.completado).length;

    if (pendientes === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    this._deseosService.guardarStorage();
  }

  borrar(i: number) {
    this.lista.tareas.splice(i, 1);
    this._deseosService.guardarStorage();
  }
}
