import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
})
export class ListasComponent implements OnInit {

  @ViewChild(IonList) lista: IonList;
  @Input() terminada = true;

  constructor(public _deseosService: DeseosService,
    private router: Router,
    private alertController: AlertController) { }

  ngOnInit() { }

  listaSeleccionada(lista: Lista) {
    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`)
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`)
    }
  }

  borrarLista(lista: Lista) {
    this._deseosService.borrarLista(lista);
  }

  async editarTituloLista(lista: Lista) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nuevo nombre',
      inputs: [{
        name: 'titulo',
        type: 'text',
        value: lista.titulo,
        placeholder: 'Nombre de la lista'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('calceladooo')
        }
      },
      {
        text: 'Aceptar',
        handler: (data) => {
          if (data.titulo.length === 0) return
          lista.titulo = data.titulo
          this._deseosService.guardarStorage();
          this.lista.closeSlidingItems();
        }
      }]
    });

    await alert.present();
  }
}
