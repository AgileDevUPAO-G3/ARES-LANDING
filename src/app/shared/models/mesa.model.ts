// src/app/models/mesa.models.ts
export interface Mesa {
  numeroMesa: number;
  capacidad: number;
  estado: 'DISPONIBLE' | 'RESERVADO' | 'RESERVANDOSE' | 'INHABILITADO';
  zoneName: 'General' | 'Privada' | 'Ejecutiva';
}
