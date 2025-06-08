import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicoService } from '../../shared/services/medico.service';
import { Medico } from '../../shared/models/medico.model';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FechaCortaPipe } from '../../shared/fecha-corta.pipe';

@Component({
  selector: 'app-medico-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, FechaCortaPipe],
  templateUrl: './medico-list.component.html',
  styleUrls: ['./medico-list.component.css']
})
export class MedicoListComponent implements OnInit {
  medicos: Medico[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private medicoService: MedicoService) {}

  ngOnInit(): void {
    this.medicoService.getMedicos().subscribe({
      next: (data: Medico[]) => {
        this.medicos = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.error = 'Error al cargar médicos';
        this.isLoading = false;
      }
    });
  }
}
