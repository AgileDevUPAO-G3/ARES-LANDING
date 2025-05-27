import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Payment} from '../../shared/models/payment.model';
import { Observable } from 'rxjs';
import {environment} from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  crearPreferencia(dto: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.baseUrl}/mercado-pago/crear-preferencia`, dto);
  }
}
