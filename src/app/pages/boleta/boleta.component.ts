import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-boleta',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './boleta.component.html',
  styleUrls: ['./boleta.component.css']
})
export class BoletaComponent implements OnInit {
  boleta: any;
  cargando = true;
  clienteId = 1; // <- puedes cambiarlo dinámicamente

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerBoleta();
  }

  obtenerBoleta() {
    this.http.get(`http://localhost:8080/api/v1/boleta/${this.clienteId}`).subscribe({
      next: data => {
        this.boleta = data;
        console.log("✅ Boleta recibida:", data);
        this.cargando = false;
      },
      error: err => {
        console.error("❌ Error al obtener boleta:", err);
        this.cargando = false;

        if (err.error?.message?.toLowerCase().includes('pago')) {
          Swal.fire({
            icon: 'warning',
            title: 'Pago no efectuado',
            text: 'No se puede generar la boleta hasta que se realice el pago.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Entendido'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al obtener boleta',
            text: err.error?.message || 'Ocurrió un error inesperado.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Cerrar'
          });
        }
      }
    });
  }

  descargarBoletaPDF() {
    this.http.get(`http://localhost:8080/api/v1/boleta/${this.clienteId}/pdf`, { responseType: 'blob' })
      .subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'boleta.pdf';
        a.click();
      });
  }

  enviarBoletaEmail() {
    this.http.post(`http://localhost:8080/api/v1/boleta/${this.clienteId}/email`, null)
      .subscribe(() => {
        alert('📧 Boleta enviada al correo del cliente.');
      });
  }
}

