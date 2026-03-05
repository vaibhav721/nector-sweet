import { useEffect, useState } from 'react';
import { EmptyState } from '../../components/EmptyState';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { apiClient } from '../../lib/api';

export const InvoiceHistoryPage = () => {
  const [invoices, setInvoices] = useState<any[]>([]);

  const load = async () => {
    const response = await apiClient.get('/invoices');
    setInvoices(response.data.data);
  };

  useEffect(() => {
    load();
  }, []);

  if (!invoices.length) {
    return (
      <EmptyState
        title="No invoices yet"
        description="Once you place your first order, invoice history appears here with a reorder action."
      />
    );
  }

  return (
    <div className="space-y-3">
      {invoices.map((invoice) => (
        <Card key={invoice._id}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-semibold">{invoice.invoiceNumber}</p>
              <p className="text-sm text-neutral-500">Order ID: {invoice.orderId}</p>
              <p className="text-sm text-neutral-600">Total Rs {invoice.total.toFixed(2)}</p>
            </div>
            <Button
              onClick={async () => {
                await apiClient.post(`/orders/${invoice.orderId}/reorder`);
                window.location.href = '/cart';
              }}
            >
              Reorder
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
