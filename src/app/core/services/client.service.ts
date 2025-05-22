// src/app/core/services/client.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../shared/models/client.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = environment.apiUrl; // Por ejemplo: http://localhost:8080/api/v1/api

  constructor(private http: HttpClient) {}

  // Método para buscar cliente por DNI
  getClientByDni(dni: string): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/clients/byDni/${dni}`);
  }

  // Puedes agregar más métodos relacionados con clientes si lo necesitas
}
