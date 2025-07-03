import { Injectable } from '@angular/core';
import { Cita, EstadoCita } from '../../shared/models/cita.model';
import { Observable, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CitaService {
  // Datos falsos de pacientes y citas
  private citas: Cita[] = [
    { id: 1, paciente: 'Juan Pérez', medicoId: 1, fecha: '2025-06-08', hora: '09:00', estado: 'Confirmada' },
    { id: 2, paciente: 'María López', medicoId: 2, fecha: '2025-06-08', hora: '10:00', estado: 'Realizada' },
    { id: 3, paciente: 'Carlos Díaz', medicoId: 3, fecha: '2025-06-09', hora: '11:00', estado: 'Cancelada' },
    { id: 4, paciente: 'Ana Torres', medicoId: 4, fecha: '2025-06-10', hora: '12:00', estado: 'Confirmada' },
    { id: 5, paciente: 'Sofía Morales', medicoId: 5, fecha: '2025-06-11', hora: '13:00', estado: 'Confirmada' }
  ];
  private nextId = 6;

  getCitas(): Observable<Cita[]> {
    return of(this.citas);
  }

  registrarCita(cita: Omit<Cita, 'id' | 'estado'>): Observable<Cita> {
    // Validar solapamiento
    const existe = this.citas.some(c =>
      c.medicoId === cita.medicoId &&
      c.fecha === cita.fecha &&
      c.hora === cita.hora &&
      c.estado !== 'Cancelada'
    );
    if (existe) {
      return throwError(() => new Error('Ya existe una cita para ese médico en esa fecha y hora.'));
    }
    const nuevaCita: Cita = {
      ...cita,
      id: this.nextId++,
      estado: 'Confirmada'
    };
    this.citas.push(nuevaCita);
    return of(nuevaCita);
  }

  actualizarEstado(id: number, estado: EstadoCita): Observable<Cita | undefined> {
    const cita = this.citas.find(c => c.id === id);
    if (cita) {
      cita.estado = estado;
    }
    return of(cita);
  }
}
