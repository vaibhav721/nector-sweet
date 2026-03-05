import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { mobileApi } from '../lib/api';

export const ReorderScreen = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const response = await mobileApi.get('/orders');
      setOrders(response.data.data);
    };

    load();
  }, []);

  return (
    <Screen>
      <Text style={styles.title}>Reorder</Text>
      {orders.map((order) => (
        <View key={order._id} style={styles.card}>
          <Text style={styles.name}>{order.orderNumber}</Text>
          <Text style={styles.muted}>{order.items?.length || 0} items</Text>
          <Button title="Reorder" onPress={() => mobileApi.post(`/orders/${order._id}/reorder`)} />
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
