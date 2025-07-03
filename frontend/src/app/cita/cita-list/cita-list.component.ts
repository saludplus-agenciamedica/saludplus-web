import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitaService } from '../../shared/services/cita.service';
import { MedicoService } from '../../shared/services/medico.service';
import { Cita } from '../../shared/models/cita.model';
import { Medico } from '../../shared/models/medico.model';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FechaCortaPipe } from '../../shared/fecha-corta.pipe';

@Component({
  selector: 'app-cita-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatButtonModule, FechaCortaPipe],
  templateUrl: './cita-list.component.html',
  styleUrls: ['./cita-list.component.css']
})
export class CitaListComponent implements OnInit {
  citas: Cita[] = [];
  medicos: Medico[] = [];
  isLoading = true;
  error: string | null = null;
  filtro: string = '';
  filtroMedico: string = '';
  filtroEstado: string = '';
  filtroEspecialidad: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';

  constructor(
    private citaService: CitaService,
    private medicoService: MedicoService
  ) {}

  ngOnInit(): void {
    let citasCargadas = false;
    let medicosCargados = false;
    this.citaService.getCitas().subscribe({
      next: (citas) => {
        this.citas = citas;
        citasCargadas = true;
        if (medicosCargados) this.isLoading = false;
      },
      error: () => {
        this.error = 'Error al cargar citas';
        this.isLoading = false;
      }
    });
    this.medicoService.getMedicos().subscribe({
      next: (medicos) => {
        this.medicos = medicos;
        medicosCargados = true;
        if (citasCargadas) this.isLoading = false;
      },
      error: () => {
        this.error = 'Error al cargar médicos';
        this.isLoading = false;
      }
    });
  }

  getMedicoNombre(id: number): string {
    const medico = this.medicos.find(m => m.id === Number(id));
    return medico ? medico.nombre : '(Médico no encontrado)';
  }

  get filteredCitas(): Cita[] {
    return this.citas.filter(cita => {
      const pacienteMatch = this.filtro ? cita.paciente.toLowerCase().includes(this.filtro.toLowerCase()) : true;
      const medicoMatch = this.filtroMedico ? this.getMedicoNombre(cita.medicoId).toLowerCase().includes(this.filtroMedico.toLowerCase()) : true;
      const estadoMatch = this.filtroEstado ? cita.estado === this.filtroEstado : true;
      const especialidadMatch = this.filtroEspecialidad ? (this.medicos.find(m => m.id === cita.medicoId)?.especialidad === this.filtroEspecialidad) : true;
      const fechaInicioMatch = this.fechaInicio ? (cita.fecha >= this.fechaInicio) : true;
      const fechaFinMatch = this.fechaFin ? (cita.fecha <= this.fechaFin) : true;
      return pacienteMatch && medicoMatch && estadoMatch && especialidadMatch && fechaInicioMatch && fechaFinMatch;
    });
  }

  isCitaProxima(cita: Cita): boolean {
    // Alerta para citas del mismo día y que aún no han pasado
    const hoy = new Date();
    const citaFecha = new Date(cita.fecha + 'T' + cita.hora);
    return cita.estado === 'Confirmada' &&
      citaFecha.toDateString() === hoy.toDateString() &&
      citaFecha > hoy;
  }

  get citasSemana(): number {
    const hoy = new Date();
    const inicioSemana = new Date(hoy);
    inicioSemana.setDate(hoy.getDate() - hoy.getDay()); // Domingo
    const finSemana = new Date(inicioSemana);
    finSemana.setDate(inicioSemana.getDate() + 6); // Sábado
    return this.citas.filter(c => {
      const citaFecha = new Date(c.fecha + 'T' + c.hora);
      return citaFecha >= inicioSemana && citaFecha <= finSemana;
    }).length;
  }

  get citasMes(): number {
    const hoy = new Date();
    return this.citas.filter(c => {
      const citaFecha = new Date(c.fecha + 'T' + c.hora);
      return citaFecha.getMonth() === hoy.getMonth() && citaFecha.getFullYear() === hoy.getFullYear();
    }).length;
  }

  especialidadesUnicas(): string[] {
    return this.medicos.map(m => m.especialidad).filter((esp, i, arr) => arr.indexOf(esp) === i);
  }
}
