import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../../core/services/reservation.service';
import { ClientService } from '../../core/services/client.service';
import { PaymentService } from '../../core/services/payment.service';
import { Reservation } from '../../shared/models/reservation.model';
import { Payment } from '../../shared/models/payment.model';
import { FormsModule } from '@angular/forms';
import {NgClass} from '@angular/common';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-reservas',
  standalone: true,
  templateUrl: './registro-reservas.component.html',
  imports: [
    CommonModule, // ✅ Asegura el uso de *ngIf, *ngFor, etc.
    FormsModule
  ],
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

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private clientService: ClientService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.mesaId = Number(this.route.snapshot.paramMap.get('mesaId'));
    this.route.queryParams.subscribe(params => {
      this.fecha = params['fecha'] || '';
      this.hora = params['hora'] || '';
    });
  }

  onDniBlur(): void {
    if (!this.dniCliente || this.dniCliente.trim() === '') {
      this.clearClientFields();
      return;
    }
    this.clientService.getClientByDni(this.dniCliente).subscribe({
      next: client => {
        this.nombreCliente = client.nombre;
        this.apellidoCliente = client.apellido;
        this.telefonoCliente = client.telefono;
        this.emailCliente = client.email;
      },
      error: () => {
        this.clearClientFields();
      }
    });
  }

  clearClientFields(): void {
    this.nombreCliente = '';
    this.apellidoCliente = '';
    this.telefonoCliente = '';
    this.emailCliente = '';
  }

  onSubmit(): void {
    if (!this.mesaId) {
      alert('Error: No se ha seleccionado una mesa válida');
      return;
    }

    this.etapaActual = 'pago';
  }

  iniciarPago(): void {
    const paymentRequest: Payment = {
      title: 'Reserva de Mesa',
      description: `Reserva para ${this.nombreCliente} en mesa ${this.mesaId}`,
      quantity: 1,
      unitPrice: 50.00,
      email: this.emailCliente
    };

    this.paymentService.crearPreferencia(paymentRequest).subscribe({
      next: (response) => {
        if (response.initPoint) {
          window.location.href = response.initPoint;
        } else {
          alert('No se pudo obtener la URL de pago.');
        }
      },
      error: (err) => {
        alert('Error al procesar el pago: ' + (err.error?.message || err.message));
      }
    });
  }
}
