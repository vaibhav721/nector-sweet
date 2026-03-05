export interface Invoice {
  id: string;
  orderId: string;
  userId: string;
  invoiceNumber: string;
  subtotal: number;
  tax: number;
  total: number;
  status: 'ISSUED' | 'PENDING' | 'CANCELLED';
  issuedAt: string;
}
