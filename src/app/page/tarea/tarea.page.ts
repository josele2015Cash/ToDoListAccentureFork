import { Component, inject } from '@angular/core';
import { RefresherCustomEvent, IonHeader, IonToolbar,IonButton, IonTitle, IonContent, IonRefresher, 
  IonRefresherContent, IonList, IonMenu, IonMenuToggle,IonMenuButton, IonButtons, IonNavLink 
} from '@ionic/angular/standalone';
import { MessageComponent } from '../../component/message/message.component';

import { Router } from '@angular/router';
import { DataService, Message } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../component/menu/menu.component';

@Component({
  selector: 'app-tarea',
  templateUrl: 'tarea.page.html',
  styleUrls: ['tarea.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, MessageComponent, MenuComponent,
    FormsModule, CommonModule, IonButton, IonMenu, IonMenuToggle, IonMenuButton, IonButtons , IonNavLink
  ],
})
export class TareaPage {
  private data = inject(DataService);
  primeraVez: boolean = true;

  constructor(private router: Router) {}

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }
}
