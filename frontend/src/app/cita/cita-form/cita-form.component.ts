import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CitaService } from '../../shared/services/cita.service';
import { MedicoService } from '../../shared/services/medico.service';
import { Cita } from '../../shared/models/cita.model';
import { Medico } from '../../shared/models/medico.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-cita-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './cita-form.component.html',
  styleUrls: ['./cita-form.component.css']
})
export class CitaFormComponent implements OnInit {
  citaForm: FormGroup;
  medicos: Medico[] = [];
  error: string | null = null;
  success: string | null = null;

  constructor(
    private fb: FormBuilder,
    private citaService: CitaService,
    private medicoService: MedicoService
  ) {
    this.citaForm = this.fb.group({
      paciente: ['', Validators.required],
      medicoId: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.medicoService.getMedicos().subscribe({
      next: (data) => this.medicos = data
    });
  }

  registrarCita() {
    this.error = null;
    this.success = null;
    if (this.citaForm.invalid) return;
    // Normalizar la fecha a yyyy-MM-dd si viene como Date
    const formValue = { ...this.citaForm.value };
    if (formValue.fecha instanceof Date) {
      formValue.fecha = formValue.fecha.toISOString().slice(0, 10);
    }
    // Normalizar hora a string HH:mm
    if (formValue.hora instanceof Date) {
      // Si hora es un objeto Date, extraer hora y minutos
      const h = formValue.hora.getHours().toString().padStart(2, '0');
      const m = formValue.hora.getMinutes().toString().padStart(2, '0');
      formValue.hora = `${h}:${m}`;
    } else if (typeof formValue.hora === 'string' && formValue.hora.length === 5) {
      // Ya está en formato HH:mm
    } else if (typeof formValue.hora === 'string' && formValue.hora.length === 8) {
      // Si viene como HH:mm:ss, dejarlo igual
    } else {
      // Si viene en otro formato, intentar convertirlo
      try {
        const date = new Date(`1970-01-01T${formValue.hora}`);
        const h = date.getHours().toString().padStart(2, '0');
        const m = date.getMinutes().toString().padStart(2, '0');
        formValue.hora = `${h}:${m}`;
      } catch {}
    }
    // Cambiar medicoId a medico (el backend espera medico)
    formValue.medico = formValue.medicoId;
    delete formValue.medicoId;
    // Enviar solo los campos requeridos
    const citaPayload = {
      paciente: formValue.paciente,
      medico: formValue.medico,
      fecha: formValue.fecha,
      hora: formValue.hora,
      motivo: formValue.motivo || ''
    };
    this.citaService.registrarCita(citaPayload).subscribe({
      next: () => {
        this.success = 'Cita registrada correctamente';
        this.citaForm.reset();
      },
      error: (err) => {
        if (err.message && err.message.includes('Ya existe una cita')) {
          this.error = 'Horario no disponible';
        } else if (err.error && err.error.errors) {
          this.error = err.error.errors;
        } else {
          this.error = err.message || 'Error al registrar cita';
        }
      }
    });
  }
}
