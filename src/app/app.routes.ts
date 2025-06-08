import { Routes } from '@angular/router';
import { MedicoListComponent } from './medico/medico-list/medico-list.component';
import { CitaListComponent } from './cita/cita-list/cita-list.component';
import { CitaFormComponent } from './cita/cita-form/cita-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'medicos', pathMatch: 'full' },
  { path: 'medicos', component: MedicoListComponent },
  { path: 'citas', component: CitaListComponent },
  { path: 'registrar-cita', component: CitaFormComponent },
];
