import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ReservationList} from '../../shared/models/reservation-list.model';
import { Reservation } from '../../shared/models/reservation.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  // 🆕 Obtener lista de reservas para visualización
  getReservationList(): Observable<ReservationList[]> {
    return this.http.get<ReservationList[]>(`${this.baseUrl}/reservations/vista`);
  }
}
