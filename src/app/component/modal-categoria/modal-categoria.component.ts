import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonModal,
  IonTitle,
  IonToolbar,ModalController
} from '@ionic/angular/standalone';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { categoria } from '../../../environments/environment';
@Component({
  selector: 'app-modal-categoria',
  templateUrl: './modal-categoria.component.html',
  styleUrls: ['./modal-categoria.component.scss'],
  imports: [IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButtons, IonButton, ReactiveFormsModule]
})

export class ModalCategoriaComponent  implements OnInit {
  categoriaForm: FormGroup;
  @Input() modo!: string;
  @Input() categoria!: categoria;
  tituloModal: string = '';

  constructor(private modalCtrl: ModalController) {
    this.categoriaForm = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]),
    b_estado: new FormControl(true)
    });
  }

  ngOnInit() {
    this.tituloModal = this.modo + " Categoria";
  }

  @ViewChild(IonModal) modal!: IonModal;
  name!: string;

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    let categoria:any={};
    if (this.categoriaForm.invalid) {
      this.categoriaForm.markAllAsTouched();
      return;
    }
    if (this.modo === 'Modificar') {
      categoria = {
        id: this.categoria.id,
        nombre: this.categoriaForm.value.nombre,
        dt_fechaCreacion: this.categoria.dt_fechaCreacion,
        dt_fechaModificacion: new Date(),
        b_estado: this.categoriaForm.value.b_estado
      };
    }
    if (this.modo === 'Crear') {
      categoria = {
        nombre: this.categoriaForm.value.nombre,
        dt_fechaCreacion: new Date(),
        dt_fechaModificacion: new Date(),
        b_estado: true
      };
    }
    return this.modalCtrl.dismiss(categoria, 'confirm');
  }

}
