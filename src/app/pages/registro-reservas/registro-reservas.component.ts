import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../core/services/payment.service';
import { Reservation } from '../../shared/models/reservation.model';
import { Payment } from '../../shared/models/payment.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var MercadoPago: any; // Usamos el SDK inyectado por script en index.html

@Component({
  selector: 'app-registro-reservas',
  standalone: true,
  templateUrl: './registro-reservas.component.html',
  imports: [
    CommonModule,
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
    private paymentService: PaymentService
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
    this.etapaActual = 'pago';
  }

  iniciarPago(): void {
    if (!this.mesaId || !this.emailCliente) {
      alert('Error: falta información para procesar el pago.');
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
      dniCliente: this.dniCliente,
      stateReservation: 'EN_ESPERA'
    };

    const paymentRequest: Payment = {
      title: 'Reserva PACHA',
      quantity: 1,
      unitPrice: 50.00,
      email: this.emailCliente,
      reservationDTO: reservation
    };

    this.paymentService.crearPreferencia(paymentRequest).subscribe({
      next: (response) => {
        const mp = new MercadoPago('TEST-8bf7ab36-50ee-48ac-ab66-1d49b77878e4', { locale: 'es-PE' });

        mp.checkout({
          preference: { id: response.preferenceId },
          autoOpen: true,
          onResult: (res: any) => {
            const paymentId = res?.payment?.id;
            if (paymentId) {
              const confirmRequest: Payment = {
                ...response,
                statusPago: 'APROBADO',
                paymentId: paymentId,
                reservationDTO: reservation
              };
              this.paymentService.confirmarPagoConReserva(confirmRequest).subscribe({
                next: () => {
                  alert('¡Pago confirmado y reserva registrada exitosamente!');
                },
                error: () => {
                  alert('Error al confirmar el pago con el servidor.');
                }
              });
            }
          },
          onError: (err: any) => {
            console.error('Error en el checkout:', err);
            alert('Ocurrió un error al iniciar el pago.');
          }
        });
      },
      error: (err) => {
        alert('Error al generar la preferencia de pago: ' + (err.error?.message || err.message));
      }
    });
  }
}
