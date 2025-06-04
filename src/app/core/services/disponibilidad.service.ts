import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mesa } from '../../shared/models/mesa.model';
import { Disponibilidad } from '../../shared/models/disponibilidad.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DisponibilidadService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  consultarDisponibilidad(dto: Disponibilidad): Observable<Mesa[]> {
    return this.http.post<Mesa[]>(`${this.baseUrl}/disponibilidad`, dto);
  }
}