import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../core/services/reservation.service';
import { ReservationList } from '../../shared/models/reservation-list.model';

@Component({
  selector: 'app-lista-reservas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-reservas.component.html',
  styleUrls: ['./lista-reservas.component.css']
})
export class ListaReservasComponent implements OnInit {
  reservas: ReservationList[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getReservationList().subscribe({
      next: (data) => this.reservas = data,
      error: (err) => console.error('❌ Error al cargar reservas:', err)
    });
  }

  confirmAttendance(id: number): void {
    this.reservationService.confirmAttendance(id).subscribe({
      next: () => {
        const reserva = this.reservas.find(r => r.id === id);
        if (reserva) {
          reserva.stateReservationClient = 'ASISTIO';
          alert('✅ Asistencia confirmada');
        }
      },
      error: (err) => {
        console.error('❌ Error al confirmar asistencia:', err);
        alert('❌ No se pudo confirmar la asistencia');
      }
    });
  }

  esPasada(fecha: string): boolean {
    const hoy = new Date();
    const fechaReserva = new Date(fecha);
    return fechaReserva < hoy;
  }
}