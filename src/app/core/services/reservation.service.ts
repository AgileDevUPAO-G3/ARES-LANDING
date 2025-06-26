import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationList } from '../../shared/models/reservation-list.model';
import { Reservation } from '../../shared/models/reservation.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = `${environment.apiUrl}/reservations`;

  constructor(private http: HttpClient) {}

  // Obtener lista de reservas para visualización
  getReservationList(): Observable<ReservationList[]> {
    return this.http.get<ReservationList[]>(`${this.baseUrl}/vista`);
  }


  // Crear reserva temporal
  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.baseUrl}`, reservation);
  }

// Confirmar asistencia de una reserva
confirmAttendance(id: number): Observable<Reservation> {
  return this.http.put<Reservation>(`${this.baseUrl}/${id}/confirm-attendance`, {});
}

// Buscar reservas por nombre o DNI del cliente
  searchReservations(filtro: string): Observable<ReservationList[]> {
    return this.http.get<ReservationList[]>(`${this.baseUrl}/buscar`, {
      params: { filtro }
    });
  }


}
