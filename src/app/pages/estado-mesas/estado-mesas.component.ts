import { Component, OnInit } from '@angular/core';
import { MesaService } from '../../core/services/mesa.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-estado-mesas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estado-mesas.component.html',
  styleUrls: ['./estado-mesas.component.css']
})
export class EstadoMesasComponent implements OnInit {
  mesas: any[] = [];
  estadosDisponibles: string[] = ['DISPONIBLE', 'RESERVADO', 'RESERVANDOSE', 'INHABILITADO'];

  constructor(private mesaService: MesaService) {}

  ngOnInit(): void {
    this.cargarMesas();
  }

  cargarMesas(): void {
    this.mesaService.getMesas().subscribe({
      next: (data) => this.mesas = data,
      error: (err) => console.error('Error al cargar las mesas:', err)
    });
  }

  cambiarEstado(mesa: any): void {
    this.mesaService.actualizarEstadoMesa(mesa.id, mesa.estado).subscribe({
      next: () => alert(`✅ Estado de la mesa ${mesa.numeroMesa} actualizado a ${mesa.estado}`),
      error: (err) => alert('❌ Error al actualizar el estado: ' + (err.error?.message || err.message))
    });
  }
}
