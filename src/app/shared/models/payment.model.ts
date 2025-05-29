import { Reservation } from './reservation.model';

export interface Payment {
  id?: number;
  title?: string; // el backend asigna uno por defecto si no se envía
  quantity: number;
  unitPrice: number;
  email: string;
  preferenceId?: string;
  statusPago?: string; // nombre real en el backend
  createdAt?: string;
  initPoint?: string;
  externalReference?: string;
  paymentId?: number;
  reservationDTO: Reservation;
}
