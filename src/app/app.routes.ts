import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tareaHome',
    loadComponent: () => import('./page/tarea/tarea.page').then((m) => m.TareaPage),
  },
  {
    path: 'message/:id',
    loadComponent: () =>
      import('./page/view-message/view-message.page').then((m) => m.ViewMessagePage),
  },
  {
    path: 'categoria',
    loadComponent: () =>
      import('./page/categoria/categoria.page').then((m) => m.CategoriaPage),
  },
  {
    path: '',
    redirectTo: 'tareaHome',
    pathMatch: 'full',
  },
];

