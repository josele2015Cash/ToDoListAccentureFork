import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RefresherCustomEvent, IonHeader, IonToolbar,IonButton, IonTitle, IonContent, IonRefresher, 
  IonRefresherContent, IonList, IonMenu, IonMenuToggle,IonMenuButton, IonButtons, IonNavLink 
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, MenuComponent,
    FormsModule, CommonModule, IonButton, IonMenu, IonMenuToggle, IonMenuButton, IonButtons , IonNavLink
  ]
})
export class MenuComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  irCategoria() {
      this.router.navigate(['/categoria']);
  }
  irTarea() {
      this.router.navigate(['/tareaHome']);
  }
}
