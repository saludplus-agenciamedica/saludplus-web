export type EstadoCita = 'Confirmada' | 'Realizada' | 'Cancelada';

export interface Cita {
  id: number;
  paciente: string;
  medicoId: number;
  fecha: string; // ISO date
  hora: string;  // HH:mm
  estado: EstadoCita;
}
