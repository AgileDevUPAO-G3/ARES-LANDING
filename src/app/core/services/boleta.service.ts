import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'

})
export class BoletaService {
  constructor(private http: HttpClient) { }

  getBoleta(id: number) {
    return this.http.get(`http://localhost:8080/boleta/${id}`, {
      responseType: 'blob'  // blob = archivo binario (PDF)
    });
}
}

