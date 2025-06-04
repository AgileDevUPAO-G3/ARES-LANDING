import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../core/services/payment.service';
import { ReservationService } from '../../core/services/reservation.service';
import { Reservation } from '../../shared/models/reservation.model';
import { Payment } from '../../shared/models/payment.model';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../core/services/client.service';
import { CommonModule } from '@angular/common'


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

  // Temporizador
  tiempoLimiteSegundos: number = 600; // 10 minutos (cambia a 30 para pruebas)
  tiempoRestante: number = this.tiempoLimiteSegundos;
  intervaloId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private reservationService: ReservationService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.mesaId = Number(this.route.snapshot.paramMap.get('mesaId'));
    this.route.queryParams.subscribe(params => {
      this.fecha = params['fecha'] || '';
      this.hora = params['hora'] || '';
    });

    // Iniciar el temporizador cuando se cargue el componente
    this.iniciarTemporizador();
  }

  ngOnDestroy(): void {
    // Limpiar el intervalo para evitar fugas de memoria
    this.detenerTemporizador();
  }

  iniciarTemporizador() {
    this.tiempoRestante = this.tiempoLimiteSegundos;
    this.intervaloId = setInterval(() => {
      this.tiempoRestante--;
      if (this.tiempoRestante <= 0) {
        this.detenerTemporizador();
        alert('El tiempo para completar la reserva ha terminado.');
        this.router.navigate(['/reservas']);
      }
    }, 1000);
  }

  detenerTemporizador() {
    if (this.intervaloId) {
      clearInterval(this.intervaloId);
      this.intervaloId = null;
    }
  }

  get tiempoFormateado(): string {
    const minutos = Math.floor(this.tiempoRestante / 60);
    const segundos = this.tiempoRestante % 60;
    return `${minutos.toString().padStart(2,'0')}:${segundos.toString().padStart(2,'0')}`;
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

  confirmarManual(): void {
    if (!this.reservaCreada || !this.reservaCreada.id) return;
    const externalRef = this.reservaCreada.id.toString();
    const pagoSimulado = 123456789;

    this.paymentService.confirmarPagoManual(externalRef, pagoSimulado).subscribe({
      next: () => {
        this.router.navigate(['/reserva-exitosa']);
      },
      error: (err) => {
        alert('Error al confirmar el pago manual: ' + (err.error?.message || err.message));
      }
    });
  }

  buscarCliente(): void {
    if (!this.dniCliente || this.dniCliente.length !== 8) return;

    this.clientService.getClientByDni(this.dniCliente).subscribe({
      next: (cliente) => {
        if (cliente) {
          this.nombreCliente = cliente.nombre;
          this.apellidoCliente = cliente.apellido;
          this.emailCliente = cliente.email;
          this.telefonoCliente = cliente.telefono;
        }
      },
      error: (err) => {
        this.nombreCliente = '';
        this.apellidoCliente = '';
        this.emailCliente = '';
        this.telefonoCliente = '';
        console.log('Cliente no encontrado, se completará manualmente.');
      }
    });
  }
}
