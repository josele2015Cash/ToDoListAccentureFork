import { Component, OnInit, ViewChild } from '@angular/core';
import {IonButton, IonButtons, IonContent, IonHeader, IonInput,IonSearchbar,
  IonItem, IonModal, IonTitle, IonToolbar,ModalController
} from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core';
@Component({
  selector: 'app-modal-tarea',
  templateUrl: './modal-tarea.component.html',
  styleUrls: ['./modal-tarea.component.scss'],
  imports: [IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButtons, IonButton,
    IonSearchbar
  ]
})
export class ModalTareaComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  @ViewChild(IonModal) modal!: IonModal;
  name!: string;


  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

}
