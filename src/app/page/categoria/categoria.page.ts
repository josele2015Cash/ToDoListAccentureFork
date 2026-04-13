import { Component, OnInit, inject } from '@angular/core';
import { MenuComponent } from '../../component/menu/menu.component';
import { RefresherCustomEvent, IonHeader, IonToolbar,IonButton, IonTitle, IonContent, IonRefresher, 
  IonRefresherContent, IonList, IonMenu, IonMenuToggle,IonMenuButton, IonButtons, IonNavLink 
} from '@ionic/angular/standalone';
import { MessageComponent } from '../../component/message/message.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService, Message } from '../../services/data.service';
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, MessageComponent, MenuComponent,
    FormsModule, CommonModule, IonButton, IonMenu, IonMenuToggle, IonMenuButton, IonButtons , IonNavLink
  ],
})
export class CategoriaPage  implements OnInit {

  private data = inject(DataService);

  constructor() { }

  ngOnInit() {}

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

}
