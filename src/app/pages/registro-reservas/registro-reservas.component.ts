import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService} from '../../core/services/reservation.service';
import { Reservation} from '../../shared/models/reservation.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-registro-reservas',
  standalone: true,
  templateUrl: './registro-reservas.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./registro-reservas.component.css']
})
export class RegistroReservasComponent implements OnInit {

  mesaId: number | null = null;
  fecha: string = '';
  hora: string = '';

  // Datos cliente
  dniCliente: string = '';
  nombreCliente: string = '';
  apellidoCliente: string = '';
  telefonoCliente: string = '';
  emailCliente: string = '';

  constructor(private route: ActivatedRoute, private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.mesaId = Number(this.route.snapshot.paramMap.get('mesaId'));
    this.route.queryParams.subscribe(params => {
      this.fecha = params['fecha'] || '';
      this.hora = params['hora'] || '';
    });
  }

  onSubmit(): void {
    if (!this.mesaId) {
      alert('Error: No se ha seleccionado una mesa válida');
      return;
    }

    const reservation: Reservation = {
      mesaId: this.mesaId,
      fechaReservada: this.fecha,
      horaInicio: this.hora + ':00',  // Agrega segundos
      nombreCliente: this.nombreCliente,
      apellidoCliente: this.apellidoCliente,
      telefonoCliente: this.telefonoCliente,
      emailCliente: this.emailCliente,
      dniCliente: this.dniCliente
    };

    this.reservationService.createReservation(reservation).subscribe({
      next: (res) => {
        alert('Reserva creada correctamente');
        // Aquí puedes limpiar formulario o navegar a otra página
      },
      error: (err) => {
        alert('Error al crear la reserva: ' + (err.error?.message || err.message));
      }
    });
  }
}
