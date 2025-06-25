export interface ReservationList {
  id: number;
  nombreCliente: string;
  numeroMesa: number;
  capacidad: number;
  zone: string;
  fechaReservada: string;   // yyyy-MM-dd
  horaInicio: string;       // HH:mm:ss
  stateReservationClient: 'EN_ESPERA' | 'ASISTIO' | 'NO_ASISTIO';
}
