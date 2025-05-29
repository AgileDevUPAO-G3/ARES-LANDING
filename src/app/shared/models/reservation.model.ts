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
  stateReservation?: string; // "EN_ESPERA" por defecto
}
