import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medico } from '../models/medico.model';

@Injectable({ providedIn: 'root' })
export class MedicoService {
  private apiUrl = 'http://localhost:8000/medicos/';

  constructor(private http: HttpClient) {}

  getMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.apiUrl);
  }

  crearMedico(medico: Partial<Medico>): Observable<Medico> {
    return this.http.post<Medico>(this.apiUrl, medico);
  }
}
