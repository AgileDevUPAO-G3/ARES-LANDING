import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent {
  personas: number | null = null;
  fecha: string = '';
  hora: string = '';

  // Opciones predeterminadas
  opcionesPersonas: number[] = [ 2, 4, 5, 6, 7, 8,10,12];
  opcionesHoras: string[] = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
    '21:00', '21:30', '22:00', '22:30', '23:00'
  ];

  // Para deshabilitar fechas pasadas
  get fechaMinima(): string {
    return new Date().toISOString().split('T')[0];
  }

  todosLosFiltrosSeleccionados(): boolean {
    return this.personas !== null && this.fecha !== '' && this.hora !== '';
  }
}
