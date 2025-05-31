import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../core/services/payment.service';
import { ReservationService } from '../../core/services/reservation.service';
import { Reservation } from '../../shared/models/reservation.model';
import { Payment } from '../../shared/models/payment.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var MercadoPago: any;

@Component({
  selector: 'app-registro-reservas',
  standalone: true,
  templateUrl: './registro-reservas.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./registro-reservas.component.css']
})
export class RegistroReservasComponent implements OnInit {
  mesaId: number | null = null;
  fecha: string = '';
  hora: string = '';

  dniCliente: string = '';
  nombreCliente: string = '';
  apellidoCliente: string = '';
  telefonoCliente: string = '';
  emailCliente: string = '';

  etapaActual: 'registro' | 'pago' = 'registro';
  reservaCreada: Reservation | null = null;
  mostrarModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private reservationService: ReservationService
  ) {}

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
      fechaReservada: this.fecha,
      horaInicio: this.hora,
      mesaId: this.mesaId,
      nombreCliente: this.nombreCliente,
      apellidoCliente: this.apellidoCliente,
      emailCliente: this.emailCliente,
      telefonoCliente: this.telefonoCliente,
      dniCliente: this.dniCliente
    };

    this.reservationService.createReservation(reservation).subscribe({
      next: (res) => {
        this.reservaCreada = res;
        this.etapaActual = 'pago';
      },
      error: (err) => {
        alert('Error al crear la reserva: ' + (err.error?.message || err.message));
      }
    });
  }

  iniciarPago(): void {
    if (!this.reservaCreada || !this.reservaCreada.id) {
      alert('Error: La reserva no ha sido creada correctamente.');
      return;
    }

    const paymentRequest: Payment = {
      title: 'Reservas',
      quantity: 1,
      unitPrice: 50.50,
      email: this.emailCliente,
      externalReference: this.reservaCreada.id.toString(),
      reservationId: this.reservaCreada.id,
      statusPago: 'PENDIENTE',
      paymentId: 0
    };

    this.paymentService.crearPreferencia(paymentRequest).subscribe({
      next: (response) => {
        if (response.initPoint) {
          // Abre el Checkout Pro en una nueva ventana
          window.open(response.initPoint, '_blank');
        } else {
          alert('No se recibió el initPoint desde el backend.');
        }
      },
      error: (err) => {
        alert('Error al generar la preferencia de pago: ' + (err.error?.message || err.message));
      }
    });
  }



}
