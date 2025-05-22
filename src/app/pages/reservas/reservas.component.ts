import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';  // <-- Importa Router y RouterModule
import { MesaService } from '../../core/services/mesa.service';
import { Mesa } from '../../shared/models/mesa.model';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule], // <-- Agrega RouterModule aquí
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent implements OnInit {
  personas: number | null = null;
  fecha: string = '';
  hora: string = '';
  mesas: Mesa[] = [];
  // Opciones predeterminadas
  opcionesPersonas: number[] = [2, 4, 5, 6, 7, 8, 10, 12];
  opcionesHoras: string[] = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
    '21:00', '21:30', '22:00', '22:30', '23:00'
  ];

  posicionesMesa: { [key: number]: { top: string, left: string, width: string, height: string } } = {
    1: { top: '28%', left: '14.2%', width: '90px', height: '56px' },
    2: { top: '39.3%', left: '14.1%', width: '90px', height: '56px' },
    3: { top: '66.5%', left: '13.8%', width: '90px', height: '56px' },
    4: { top: '81%', left: '13.8%', width: '90px', height: '56px' },
    5: { top: '48%', left: '30.9%', width: '83px', height: '56px' },
    6: { top: '45.65%', left: '21.65%', width: '42px', height: '40px' },
    7: { top: '45.65%', left: '26.8%', width: '42px', height: '40px' },
    8: { top: '51%', left: '16.2%', width: '42px', height: '43px' },
    9: { top: '61.8%', left: '32.15%', width: '42px', height: '42px' },
    10: { top: '67%', left: '21.2%', width: '42px', height: '41px' },
    11: { top: '74.9%', left: '21.1%', width: '42px', height: '40px' },
    12: { top: '82.9%', left: '21.1%', width: '42px', height: '40px' },
    13: { top: '28%', left: '22.9%', width: '59px', height: '105px' },
    14: { top: '28%', left: '30.3%', width: '58px', height: '105px' },
    15: { top: '79%', left: '35.9%', width: '165px', height: '120px' },
    16: { top: '79%', left: '45.4%', width: '165px', height: '120px' },
    17: { top: '79%', left: '54.9%', width: '160px', height: '120px' },
    18: { top: '79.5%', left: '68.5%', width: '66px', height: '110px' },
    19: { top: '72.5%', left: '74.5%', width: '66px', height: '175px' },
    20: { top: '68.9%', left: '80.5%', width: '66px', height: '205px' }
  };

  // constructor(private mesaService: MesaService) {}
  constructor(private mesaService: MesaService, private router: Router) {}  // <-- Inyecta router

  ngOnInit(): void {
    this.mesaService.getMesas().subscribe((data) => {
      this.mesas = data;
    });
  }

  // Para deshabilitar fechas pasadas
  get fechaMinima(): string {
    return new Date().toISOString().split('T')[0];
  }

  empezarReserva(mesa: Mesa): void {
    console.log('Iniciando reserva para la mesa:', mesa);

    // Añade ':00' a la hora para formato HH:mm:ss
    const horaConSegundos = this.hora ? this.hora + ':00' : '';

    this.router.navigate(
      ['/registro-reservas', mesa.numeroMesa],
      { queryParams: { fecha: this.fecha, hora: horaConSegundos } }
    );
  }

  todosLosFiltrosSeleccionados(): boolean {
    return this.personas !== null && this.fecha !== '' && this.hora !== '';
  }
}
