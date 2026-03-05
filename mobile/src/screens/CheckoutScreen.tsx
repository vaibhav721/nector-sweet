import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { useMobileAuth } from '../context/AuthContext';
import { mobileApi } from '../lib/api';

export const CheckoutScreen = () => {
  const { user } = useMobileAuth();
  const [preview, setPreview] = useState<any>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const response = await mobileApi.post('/checkout/preview');
        setPreview(response.data.data);
      } catch (error: any) {
        setMessage(error.response?.data?.error?.message || 'Unable to load checkout');
      }
    };

    load();
  }, []);

  if (!user) {
    return (
      <Screen>
        <Text style={styles.title}>Checkout</Text>
        <Text>Login is required to place order or start subscription.</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text style={styles.title}>Checkout</Text>
      {message ? <Text style={styles.error}>{message}</Text> : null}

      {preview ? (
        <View style={styles.card}>
          <Text>Payment mode: {preview.paymentMode.status}</Text>
          <Text>{preview.paymentMode.note}</Text>
          <Text>Total Rs {preview.cart.total.toFixed(2)}</Text>
          <Button
            title="Place order"
            onPress={async () => {
              await mobileApi.post('/checkout/place', {
                deliverySlotId: preview.availableSlots[0].id
              });
              setMessage('Order placed successfully');
            }}
          />
        </View>
      ) : null}
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: '700' },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 12, gap: 8 },
  error: { color: '#ad2530' }
});
