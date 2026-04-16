import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Platform, IonItem, IonLabel, IonNote, IonIcon, IonCheckbox } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForward } from 'ionicons/icons';
import { Message } from '../../services/data.service';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-message-tarea',
  templateUrl: './message-tarea.component.html',
  styleUrls: ['./message-tarea.component.scss'],
  imports: [RouterLink, IonItem, IonLabel, IonNote, IonIcon, IonCheckbox, ReactiveFormsModule],
})
export class MessageTareaComponent   {
  check: FormControl;
  private platform = inject(Platform);
  @Input() message?: Message;
  @Output() checkChange = new EventEmitter<{ id: number; check: boolean }>();
  isIos() {
    return this.platform.is('ios')
  }
  isAndroid() {
    return this.platform.is('android')
  }
  
  constructor() {
    addIcons({ chevronForward });
    this.check = new FormControl(false, [Validators.required]);
  }

  clickCheck() {
    this.checkChange.emit({ id: this.message!.id, check: this.check.value });
  }

}
