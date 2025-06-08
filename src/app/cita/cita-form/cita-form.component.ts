import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CitaService } from '../../shared/services/cita.service';
import { MedicoService } from '../../shared/services/medico.service';
import { Cita } from '../../shared/models/cita.model';
import { Medico } from '../../shared/models/medico.model';

@Component({
  selector: 'app-cita-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
    this.citaService.registrarCita(this.citaForm.value).subscribe({
      next: () => {
        this.success = 'Cita registrada correctamente';
        this.citaForm.reset();
      },
      error: (err) => {
        this.error = err.message || 'Error al registrar cita';
      }
    });
  }
}
