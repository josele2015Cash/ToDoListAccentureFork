import { Component, inject } from '@angular/core';
import { RefresherCustomEvent, IonHeader, IonToolbar,IonButton, IonTitle, IonContent, IonRefresher, 
  IonRefresherContent, IonList,IonMenuButton, IonButtons, ModalController , IonSearchbar
} from '@ionic/angular/standalone';
import { MessageTareaComponent } from '../../component/message-tarea/message-tarea.component';

import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Message } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalTareaComponent } from '../../component/modal-tarea/modal-tarea.component';
import { Databases } from '../../services/databases';
@Component({
  selector: 'app-tarea',
  templateUrl: 'tarea.page.html',
  styleUrls: ['tarea.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, MessageTareaComponent,
    IonSearchbar, FormsModule, CommonModule, IonButton, IonMenuButton, IonButtons
  ],
})
export class TareaPage {
  private data = inject(DataService);
  message = 'El modal desaparece con alguna acción, como cancelar o confirmar.';
  id: number = 0;

  constructor(private route: ActivatedRoute,private modalCtrl: ModalController, private databases: Databases
  ) {}

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  manejarAccion(event: { id: number; check: boolean }) {
    const { id, check } = event;
    this.message = `Tarea con ID ${id} ha sido ${check ? 'marcada como completada' : 'marcada como incompleta'}.`;
    alert(this.message);
  }

  async clickCrearTarea() {
    const modal = await this.modalCtrl.create({
      component: ModalTareaComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    
    if (role === 'confirm') {
      this.message = `Hola creaste una tarea, ${data}!`;
    }
    alert(this.message + data);
  }

  async clickModificarTarea() {
    const modal = await this.modalCtrl.create({
      component: ModalTareaComponent,
    });
    modal.present();
    
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hola modificaste una tarea, ${data}!`;
    }
    alert(this.message + data);

  }
  async clickEliminarTarea() {
    const modal = await this.modalCtrl.create({
      component: ModalTareaComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hola eliminaste una tarea, ${data}!`;
    }
    alert(this.message + data);
  }
} 
