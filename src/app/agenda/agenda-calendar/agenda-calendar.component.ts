import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CitaService } from '../../shared/services/cita.service';
import { MedicoService } from '../../shared/services/medico.service';
import { Cita } from '../../shared/models/cita.model';
import { Medico } from '../../shared/models/medico.model';

@Component({
  selector: 'app-agenda-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule], // Agrega FormsModule para ngModel
  templateUrl: './agenda-calendar.component.html',
  styleUrls: ['./agenda-calendar.component.css']
})
export class AgendaCalendarComponent implements OnInit {
  citas: Cita[] = [];
  medicos: Medico[] = [];
  fechas: string[] = [];
  horas: string[] = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];
  selectedMedicoId: number | null = null;
  today: Date = new Date();

  constructor(private citaService: CitaService, private medicoService: MedicoService) {}

  ngOnInit(): void {
    this.citaService.getCitas().subscribe(citas => this.citas = citas);
    this.medicoService.getMedicos().subscribe(medicos => this.medicos = medicos);
    this.generarFechas();
  }

  generarFechas() {
    // Mostrar los próximos 7 días
    this.fechas = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(this.today);
      d.setDate(this.today.getDate() + i);
      this.fechas.push(d.toISOString().slice(0, 10));
    }
  }

  isReservada(fecha: string, hora: string, medicoId: number): boolean {
    return this.citas.some(c => c.fecha === fecha && c.hora === hora && c.medicoId === medicoId && c.estado !== 'Cancelada');
  }

  getPaciente(fecha: string, hora: string, medicoId: number): string {
    const cita = this.citas.find(c => c.fecha === fecha && c.hora === hora && c.medicoId === medicoId && c.estado !== 'Cancelada');
    return cita ? cita.paciente : '';
  }

  seleccionarHorario(fecha: string, hora: string) {
    // Aquí podrías emitir un evento, navegar o guardar la selección para usarla en el formulario de cita
    alert(`Horario seleccionado: ${fecha} a las ${hora}`);
    // O puedes implementar lógica para comunicar este horario al formulario de cita
  }
}
