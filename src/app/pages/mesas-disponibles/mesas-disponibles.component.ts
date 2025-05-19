import { Component, OnInit } from '@angular/core';
import { MesaService } from 'src/app/core/services/mesa.service';

@Component({
  selector: 'app-mesas-disponibles',
  templateUrl: './mesas-disponibles.component.html',
  styleUrls: ['./mesas-disponibles.component.css']
})
export class MesasDisponiblesComponent implements OnInit {
  mesas: any[] = [];

  constructor(private disponibilidadService: MesaService) {}

  ngOnInit(): void {
    const fecha = '2025-05-19';
    const horaInicio = '18:00:00';
    const horaFin = '20:00:00';

    this.disponibilidadService.getMesasDisponibles(fecha, horaInicio, horaFin).subscribe({
      next: (data: any) => {
        this.mesas = data;
        console.log('Mesas recibidas:', data);
      },
      error: (err: any) => {
        console.error('Error al obtener mesas:', err);
      }
    });
  }
}
