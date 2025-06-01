import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router'; // ✅ Soporte routerLink
import { Mesa } from '../../shared/models/mesa.model';
import { MesaService } from '../../core/services/mesa.service';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent implements OnInit {
  personas: number | null = null;
  fecha: string = '';
  hora: string = '';
  mesas: Mesa[] = [];

  tiempoLimiteSegundos: number = 600; // 10 minutos = 600 segundos
  tiempoRestante: number = 0;
  intervaloId: any = null;
  reservaIniciada: boolean = false;

  // Opciones predeterminadas
  opcionesPersonas: number[] = [2, 4, 5, 6, 7, 8, 10, 12];
  opcionesHoras: string[] = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
    '21:00', '21:30', '22:00', '22:30', '23:00'
  ];

  posicionesMesa: { [key: number]: { top: string, left: string, width: string, height: string } } = {
    1: { top: '11%', left: '2.5%', width: '6%', height: '7%' },
    2: { top: '25%', left: '2.5%', width: '6%', height: '7%' },
    3: { top: '57.5%', left: '2.3%', width: '6%', height: '7%' },
    4: { top: '75%', left: '2.1%', width: '6%', height: '7%' },
    5: { top: '35.5%', left: '24.6%', width: '6%', height: '7%' },
    6: { top: '32%', left: '12.65%', width: '2.8%', height: '5%' },
    7: { top: '32%', left: '19.4%', width: '2.8%', height: '5%' },
    8: { top: '39%', left: '5.2%', width: '2.8%', height: '5%' },
    9: { top: '51.8%', left: '26.5%', width: '2.8%', height: '5%' },
    10: { top: '67%', left: '11.9%', width: '2.8%', height: '5%' },
    11: { top: '58%', left: '11.9%', width: '2.8%', height: '5%' },
    12: { top: '77%', left: '11.9%', width: '2.8%', height: '5%' },
    13: { top: '11%', left: '14.1%', width: '4%', height: '13%' },
    14: { top: '11.3%', left: '24%', width: '4%', height: '13%' },
    15: { top: '73%', left: '31.9%', width: '11%', height: '16%' },
    16: { top: '73%', left: '44%', width: '11%', height: '16%' },
    17: { top: '73%', left: '56.5%', width: '11%', height: '16%' },
    18: { top: '73.5%', left: '75.2%', width: '3%', height: '14.5%' },
    19: { top: '65%', left: '83%', width: '3%', height: '22.5%' },
    20: { top: '61%', left: '91.1%', width: '3%', height: '26.5%' }
  };

  // constructor(private mesaService: MesaService) {}
  constructor(private http: HttpClient, private mesaService: MesaService, private router: Router) { }  // <-- Inyecta router

  ngOnInit(): void {
  }

  // Para deshabilitar fechas pasadas
  get fechaMinima(): string {
    return new Date().toISOString().split('T')[0];
  }

  todosLosFiltrosSeleccionados(): boolean {
    return this.personas !== null && this.fecha !== '' && this.hora !== '';
  }

  cargarMesas(): void {
    const url = 'http://localhost:8080/api/v1/api/disponibilidad';
    const payload = {
      fecha: this.fecha,
      hora: this.hora
    };

    this.http.post<Mesa[]>(url, payload).subscribe({
      next: (data) => {
        this.mesas = data;
      },
      error: (err) => {
        console.error('Error al cargar mesas:', err);
      }
    });
  }

  // empezarReserva(mesa: Mesa): void {
  //   if (mesa.estado === 'DISPONIBLE') {
  //     console.log('✔️ Redirigiendo a reserva de mesa:', mesa.numeroMesa);

  //     this.router.navigate(
  //       ['/registro-reservas', mesa.numeroMesa],
  //       { queryParams: { fecha: this.fecha, hora: this.hora } }  // ✅ usamos hora directamente
  //     );
  //   } else {
  //     console.warn('⚠️ Mesa no disponible:', mesa);
  //   }
  // }

  empezarReserva(mesa: Mesa): void {
    if (mesa.estado === 'DISPONIBLE') {
      this.reservaIniciada = true;
      this.tiempoRestante = this.tiempoLimiteSegundos;
      this.iniciarTemporizador();

      // Rediriges a registro-reservas con parámetros
      this.router.navigate(
        ['/registro-reservas', mesa.numeroMesa],
        { queryParams: { fecha: this.fecha, hora: this.hora } }
      );
    } else {
      console.warn('⚠️ Mesa no disponible:', mesa);
    }
  }

  iniciarTemporizador() {
    if (this.intervaloId) {
      clearInterval(this.intervaloId);
    }
    this.intervaloId = setInterval(() => {
      this.tiempoRestante--;
      if (this.tiempoRestante <= 0) {
        clearInterval(this.intervaloId);
        this.tiempoRestante = 0;
        alert('El tiempo para completar la reserva ha terminado.');
        this.reservaIniciada = false;
        this.router.navigate(['/reservas']); // vuelve al home
      }
    }, 1000);
  }

  detenerTemporizador() {
    if (this.intervaloId) {
      clearInterval(this.intervaloId);
      this.intervaloId = null;
    }
    this.reservaIniciada = false;
    this.tiempoRestante = 0;
  }

  get tiempoFormateado(): string {
    const minutos = Math.floor(this.tiempoRestante / 60);
    const segundos = this.tiempoRestante % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  }

}

