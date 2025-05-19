import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisponibilidadService {
  constructor(private http: HttpClient) {}

  getMesasDisponibles(fecha: string, horaInicio: string, horaFin: string): Observable<any> {
    const url = `http://localhost:8080/api/v1/api/disponibilidad?fecha=${fecha}&horaInicio=${horaInicio}&horaFin=${horaFin}`;
    return this.http.get<any>(url);
  }
}
