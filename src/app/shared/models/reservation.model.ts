export interface Reservation {
  id?: number;
  fechaReservada: string;
  horaInicio: string;
  mesaId: number;
  nombreCliente: string;
  apellidoCliente: string;
  emailCliente: string;
  telefonoCliente: string;
  dniCliente: string;
  stateReservation?: 'PENDIENTE' | 'RESERVADA'; // opcional, o string si prefieres
  stateReservationClient?: 'EN_ESPERA' | 'ASISTIO' | 'NO_ASISTIO'; // ⚠️ faltaba
}
