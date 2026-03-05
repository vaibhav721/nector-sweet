import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../components/Screen';
import { useMobileCart } from '../context/CartContext';
import { mobileApi } from '../lib/api';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

export const ProductDetailScreen = ({ route }: Props) => {
  const { addOneTime, addSubscription } = useMobileCart();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const response = await mobileApi.get(`/catalog/products/${route.params.slug}`);
      setProduct(response.data.data);
    };
    load();
  }, [route.params.slug]);

  if (!product) {
    return (
      <Screen>
        <Text>Loading...</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.muted}>{product.shortDescription}</Text>

      {product.variants.map((variant: any) => (
        <View key={variant._id} style={styles.card}>
          <Text style={styles.variant}>{variant.name}</Text>
          <Text style={styles.muted}>One-time Rs {variant.oneTimePrice}</Text>
          <Text style={styles.muted}>Subscription Rs {variant.subscriptionPrice}</Text>
          <View style={styles.row}>
            <Button title="Add" onPress={() => addOneTime(variant._id)} />
            <Button title="Subscribe" color="#1c6b4a" onPress={() => addSubscription(variant._id)} />
          </View>
        </View>
      ))}
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '700' },
  muted: { color: '#6b665d' },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 12, gap: 8 },
  variant: { fontSize: 16, fontWeight: '600' },
  row: { flexDirection: 'row', gap: 8 }
});
