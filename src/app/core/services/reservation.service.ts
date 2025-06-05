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

  // Obtener todas las reservas
  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}`);
  }

  // Obtener reserva por ID
  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.baseUrl}/${id}`);
  }

  // Obtener reservas para una mesa
  getReservationsByMesaId(mesaId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/mesa/${mesaId}`);
  }

  // Obtener reservas por rango de fechas
  getReservationsByTimeRange(startDate: string, endDate: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/byTimeRange`, {
      params: { startDate, endDate }
    });
  }

  // Crear reserva temporal
  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.baseUrl}`, reservation);
  }

  // Actualizar reserva
  updateReservation(id: number, reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.baseUrl}/${id}`, reservation);
  }

  // Eliminar reserva
  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getAllReservationsForAdmin(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/admin/reservations`);
}
}
