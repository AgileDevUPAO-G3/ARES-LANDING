import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../core/services/reservation.service';

@Component({
  selector: 'app-admin-reservas',
  templateUrl: './admin-reservas.component.html',
  styleUrls: ['./admin-reservas.component.css']
})
export class AdminReservasComponent implements OnInit {
  reservas: any[] = [];
  error = '';

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.reservationService.getAllReservationsForAdmin().subscribe({
      next: (data) => {
        this.reservas = data;
      },
      error: () => {
        this.error = 'No se pudieron cargar las reservas';
      }
    });
  }
}