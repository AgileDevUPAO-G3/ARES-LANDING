import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mesa} from '../models/mesa.model';

@Injectable({ providedIn: 'root' })
export class MesaService {
  private apiUrl = 'http://localhost:8080/api/tables/dto'; // Ajusta si usas proxy

  constructor(private http: HttpClient) {}

  getMesas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(this.apiUrl);
  }
}
