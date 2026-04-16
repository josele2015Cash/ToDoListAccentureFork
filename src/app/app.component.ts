import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonNav, Platform } from '@ionic/angular/standalone';
import { Databases } from './services/databases';
import { MenuComponent } from './component/menu/menu.component';
import { TareaPage } from './page/tarea/tarea.page';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, MenuComponent, IonNav],
})
export class AppComponent {

  tareaPage = TareaPage;
  constructor(private data: Databases, private platform: Platform) {
    //Creando bases de datos
    this.initApp();
  }

  async initApp() {
    await this.platform.ready();
    await this.data.initializPlugin();
    await this.platform.ready();
    await this.data.createTables();
  }
}
