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
    const params: any = {
      fecha: dto.fecha,
      hora: dto.hora
    };

    if ((dto as any).capacidad) {
      params.capacidad = (dto as any).capacidad;
    }

    return this.http.get<Mesa[]>(`${this.baseUrl}/disponibilidad`, { params });
  }

}
