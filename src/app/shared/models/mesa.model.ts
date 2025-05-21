// src/app/models/mesa.models.ts
export interface Mesa {
  numeroMesa: number;
  capacidad: number;
  estado: 'DISPONIBLE' | 'RESERVADO' | 'RESERVANDOSE';
  zoneName: 'General' | 'Privada' | 'Ejecutiva';
}
