export interface Reservation {
  id?: number;
  fechaReservada: string;    // Formato 'yyyy-MM-dd'
  horaInicio: string;        // Formato 'HH:mm:ss'
  mesaId: number;
  nombreCliente: string;
  apellidoCliente: string;
  telefonoCliente: string;
  emailCliente: string;
  dniCliente: string;
}
