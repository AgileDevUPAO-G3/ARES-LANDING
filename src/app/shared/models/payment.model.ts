export interface Payment {
  id?: number;
  title: string;
  quantity: number;
  unitPrice: number;
  email: string;

  preferenceId?: string;
  statusPago?: 'CREADO' | 'PENDIENTE' | 'APROBADO' | 'RECHAZADO'; // usa tu enum
  createdAt?: string;
  initPoint?: string;
  externalReference: string;
  paymentId?: number;
  reservationId: number;
}
