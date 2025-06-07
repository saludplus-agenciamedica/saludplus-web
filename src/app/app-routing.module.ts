import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'medicos',
    loadChildren: () => import('./features/doctores/doctores.module').then(m => m.DoctoresModule)
  },
  {
    path: 'citas',
    loadChildren: () => import('./features/citas/citas.module').then(m => m.CitasModule)
  },
  {
    path: 'calendario',
    loadChildren: () => import('./features/calendario/calendario.module').then(m => m.CalendarioModule)
  },
  {
    path: '',
    redirectTo: 'medicos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
