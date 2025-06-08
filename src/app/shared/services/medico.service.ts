import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Medico } from '../models/medico.model';

@Injectable({ providedIn: 'root' })
export class MedicoService {
  // Datos falsos de médicos
  private medicos: Medico[] = [
    { id: 1, nombre: 'Dra. Camila Soto', especialidad: 'Cardiología' },
    { id: 2, nombre: 'Dr. Tomás Rivas', especialidad: 'Pediatría' },
    { id: 3, nombre: 'Dra. Fernanda Ruiz', especialidad: 'Dermatología' },
    { id: 4, nombre: 'Dr. Pablo Herrera', especialidad: 'Traumatología' },
    { id: 5, nombre: 'Dra. Valentina Pino', especialidad: 'Ginecología' }
  ];

  getMedicos(): Observable<Medico[]> {
    return of(this.medicos);
  }
}
