import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { mobileApi } from '../lib/api';

export const InvoiceHistoryScreen = () => {
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const response = await mobileApi.get('/invoices');
      setInvoices(response.data.data);
    };

    load();
  }, []);

  return (
    <Screen>
      <Text style={styles.title}>Invoice History</Text>
      {!invoices.length ? <Text>No invoices yet. Place your first order.</Text> : null}
      {invoices.map((invoice) => (
        <View key={invoice._id} style={styles.card}>
          <Text style={styles.name}>{invoice.invoiceNumber}</Text>
          <Text style={styles.muted}>Rs {invoice.total.toFixed(2)}</Text>
          <Button
            title="Reorder"
            onPress={() => mobileApi.post(`/orders/${invoice.orderId}/reorder`)}
            color="#1c6b4a"
          />
        </View>
      ))}
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: '700' },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 12, gap: 8 },
  name: { fontWeight: '700' },
  muted: { color: '#6b665d' }
});
