import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SplashScreen } from '@capacitor/splash-screen';
import { DataService } from './services/data.service';
import { MenuComponent } from './component/menu/menu.component';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, MenuComponent],
})
export class AppComponent {
  constructor(private data: DataService) {
    //Creando bases de datos
    this.initApp();
  }

  async initApp(){
    await this.data.initializPlugin();
    //SplashScreen.hide();  
  }      
}
