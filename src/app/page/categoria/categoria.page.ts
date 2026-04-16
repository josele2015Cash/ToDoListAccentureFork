import { Component, inject } from '@angular/core';
import {
  RefresherCustomEvent, IonHeader, IonToolbar, IonButton, IonTitle, IonContent, IonRefresher,
  IonRefresherContent, IonList, IonMenuButton, IonButtons, ModalController, IonSearchbar
} from '@ionic/angular/standalone';
import { MessageComponent } from '../../component/message/message.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService, Message } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { ModalCategoriaComponent } from '../../component/modal-categoria/modal-categoria.component';
import { Databases } from '../../services/databases';
import { Platform } from '@ionic/angular/standalone';
import { categoria } from '../../../environments/environment';
@Component({
  selector: 'app-message-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, MessageComponent,
    FormsModule, CommonModule, IonButton, IonMenuButton, IonButtons, IonSearchbar
  ],
})
export class CategoriaPage{
  id: number = 0;
  id_Categoria: number = 0;

  private data = inject(DataService);
  message = 'El modal desaparece con alguna acción, como cancelar o confirmar.';
  constructor(private route: ActivatedRoute, private modalCtrl: ModalController, private databases: Databases,
    private platform: Platform
  ) { }

  ionViewWillEnter() {
    console.log("ingreso a categoria");
    this.platform.ready().then(() => {
      this.cargarInicial();
    });
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  manejarAccion(event: { id: number; check: boolean ; id_Categoria: number }) {
    const { id, check, id_Categoria } = event;
    this.id = id;
    this.id_Categoria = id_Categoria;
    this.message = `Categoria con ID ${id_Categoria} ha sido ${check ? 'marcada como completada' : 'marcada como incompleta'}.`;
    alert(this.message);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  async cargarInicial() {
    let list: categoria[] = [];
    list = await this.databases.loadAllCategorias();
    list = this.databases.getCategoria();
    let index = 0;
    this.data.messages = [];
      list?.forEach((categoria) => {
        this.data.messages.push({ fromName: categoria.nombre, subject: `fecha de modificación: ${categoria.dt_fechaModificacion}, estado: ${categoria.b_estado}`, 
        date: `Fecha de creación: ${categoria.dt_fechaCreacion}`, id: index, check: false, idtable: categoria.id });
        index++;
      }); 
    return true;
  }

  async clickCrearCategoria() {
    const modal = await this.modalCtrl.create({
      component: ModalCategoriaComponent,
      componentProps: { modo: 'Crear' }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    data.b_estado = data.b_estado ? 1 : 0;
    if (role === 'confirm') {
      this.message = `Hola creaste una nueva categoria, nombre: ${data.nombre}, fecha de creación: ${data.dt_fechaCreacion}, fecha de modificación: ${data.dt_fechaModificacion}, estado: ${data.b_estado}`;
    }
    await this.databases.addCategoria(data);
    alert(this.message);
    this.cargarInicial();
  }
        
  async clickModificarCategoria() {
    const modal = await this.modalCtrl.create({
      component: ModalCategoriaComponent,
      componentProps: { modo: 'Modificar',
        categoria: {
          id: this.id_Categoria,
          dt_fechaModificacion: new Date(),
          b_estado: true
        }
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hola modificaste una categoria,id: ${data.id}, nombre: ${data.nombre}, fecha de creación: ${data.dt_fechaCreacion}, fecha de modificación: ${data.dt_fechaModificacion}, estado: ${data.b_estado}`;
    } 
    await this.databases.updateCategoria(data);
    alert(this.message);
    this.cargarInicial();
  }

  async clickEliminarCategoria() {
    await this.databases.deleteCategoria(this.id_Categoria);
    this.message = `Hola eliminaste una categoria, id: ${this.id_Categoria}`;
    alert(this.message);
    this.cargarInicial();
  }

  async SearchCategoria(event: any) {
    const searchTerm = event.target.value;
    if (searchTerm && searchTerm.trim() !== '') {
      await this.databases.loadCategoriasByNombre(searchTerm);
    } else {
      await this.databases.loadCategoriasByNombre('');
    }
    
  }
}
