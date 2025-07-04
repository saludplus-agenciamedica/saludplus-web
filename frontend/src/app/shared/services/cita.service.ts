import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../../shared/models/cita.model';

@Injectable({ providedIn: 'root' })
export class CitaService {
  private apiUrl = 'http://localhost:8000/citas/';

  constructor(private http: HttpClient) {}

  getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.apiUrl);
  }

  registrarCita(cita: Partial<Cita>): Observable<Cita> {
    return this.http.post<Cita>(this.apiUrl, cita);
  }

  // actualizarEstado: Implementar si el backend soporta PUT/PATCH para actualizar el estado de la cita
  // actualizarEstado(id: number, estado: string): Observable<Cita> {
  //   return this.http.patch<Cita>(`${this.apiUrl}${id}/`, { estado });
  // }
}
