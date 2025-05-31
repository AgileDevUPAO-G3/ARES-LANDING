import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Payment } from '../../shared/models/payment.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = `${environment.apiUrl}/mercado-pago`;

  constructor(private http: HttpClient) {}

  // Crear una preferencia de pago
  crearPreferencia(dto: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.baseUrl}/crear-preferencia`, dto);
  }

  // Confirmar pago manualmente (desde el frontend si fuera necesario)
  confirmarPagoManual(externalReference: string, paymentId: number): Observable<string> {
    return this.http.post(`${this.baseUrl}/confirmar-pago`, null, {
      params: {
        externalReference,
        paymentId: paymentId.toString()
      },
      responseType: 'text'
    });
  }

  // Nota: El webhook es manejado automáticamente por el backend,
  // no se debe llamar desde frontend
}
