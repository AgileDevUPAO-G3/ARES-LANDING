import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService} from '../../../../core/services/payment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reserva-exitosa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reserva-exitosa.component.html',
  styleUrl: './reserva-exitosa.component.css'
})
export class ReservaExitosaComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const paymentId = params['payment_id'];
      const externalReference = params['external_reference'];

      if (paymentId && externalReference) {
        this.paymentService.confirmarPagoManual(externalReference, paymentId).subscribe({
          next: () => console.log('Pago confirmado correctamente.'),
          error: () => console.warn('Error al confirmar el pago con el servidor.')
        });
      }
    });
  }
}
