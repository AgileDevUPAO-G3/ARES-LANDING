export interface Payment {
  id?: number;
  title: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  email: string;
  preferenceId?: string;
  status?: string;
  createdAt?: string;
  initPoint?: string;
}
