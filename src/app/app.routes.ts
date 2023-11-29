import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'inputs',
    loadComponent: () => import('./pages/inputs/inputs.component').then(m => m.InputsComponent)
  },
  {
    path: 'draggables',
    loadComponent: () => import('./pages/draggables/draggables.component').then(m => m.DraggablesComponent)
  },
];
