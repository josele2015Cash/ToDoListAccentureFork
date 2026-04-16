import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar,IonButton, IonTitle, IonContent,IonNav,
  IonRefresherContent, IonList, IonMenu, IonMenuToggle,IonMenuButton, IonButtons, IonNavLink 
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TareaPage } from '../../page/tarea/tarea.page';
import { CategoriaPage } from '../../page/categoria/categoria.page';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonNavLink, IonNav,
    FormsModule, CommonModule, IonButton, IonMenu, CommonModule
  ]
})
export class MenuComponent  implements OnInit {

  tareaPage = TareaPage;
  categoriaPage = CategoriaPage;
  
  constructor(private router: Router) { }

  ngOnInit() {}

  irCategoria() {
      this.router.navigate(['/categoria']);
  }
  irTarea() {
      this.router.navigate(['/tareaHome']);
  }
}
