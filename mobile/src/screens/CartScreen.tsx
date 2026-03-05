import { Button, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { useMobileCart } from '../context/CartContext';

export const CartScreen = () => {
  const { cart, remove } = useMobileCart();

  if (!cart?.items?.length) {
    return (
      <Screen>
        <Text style={styles.title}>Cart</Text>
        <Text>No items in cart.</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text style={styles.title}>Cart</Text>
      {cart.items.map((item: any) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.name}>{item.productName}</Text>
          <Text style={styles.muted}>{item.variantName}</Text>
          <Text style={styles.muted}>Qty: {item.quantity}</Text>
          <Button title="Remove" onPress={() => remove(item.id)} />
        </View>
      ))}

      <View style={styles.summary}>
        <Text>Subtotal: Rs {cart.subtotal.toFixed(2)}</Text>
        <Text>Tax: Rs {cart.tax.toFixed(2)}</Text>
        <Text style={styles.name}>Total: Rs {cart.total.toFixed(2)}</Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: '700' },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 12, gap: 6 },
  name: { fontWeight: '700' },
  muted: { color: '#6b665d' },
  summary: { backgroundColor: '#fff', borderRadius: 14, padding: 12, gap: 4 }
});
