import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoletaService {
  private baseUrl = 'http://localhost:8080/api/v1/boleta';

  constructor(private http: HttpClient) {}

  // Obtener boleta como JSON
  getBoleta(clienteId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${clienteId}`);
  }

  // Descargar la boleta como PDF
  descargarBoleta(clienteId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/descargar/${clienteId}`, {
      responseType: 'blob'
    });
  }

  // Enviar boleta por correo
  enviarPDF(clienteId: number, correo: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/enviar?clienteId=${clienteId}&correo=${correo}`, {});
  }
}
