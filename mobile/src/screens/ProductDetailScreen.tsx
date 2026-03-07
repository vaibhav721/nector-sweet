import { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
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
      {product.images?.[0] ? (
        <Image
          source={{ uri: `${process.env.EXPO_PUBLIC_API_BASE_URL}${product.images[0]}` }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
          <Text style={styles.muted}>No Image</Text>
        </View>
      )}
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.description}>{product.shortDescription}</Text>

      {product.variants.map((variant: any) => (
        <View key={variant._id} style={styles.card}>
          <Text style={styles.variant}>{variant.name}</Text>
          <Text style={styles.muted}>One-time Rs {variant.oneTimePrice}</Text>
          <Text style={styles.muted}>Subscription Rs {variant.subscriptionPrice}</Text>
          <View style={styles.row}>
            <Button title="Add" onPress={() => addOneTime(variant._id)} />
            <Button title="Subscribe" color="#10b981" onPress={() => addSubscription(variant._id)} />
          </View>
        </View>
      ))}
    </Screen>
  );
};

const styles = StyleSheet.create({
  image: { width: '100%', height: 240, borderRadius: 14, backgroundColor: '#f3f4f6', marginBottom: 16 },
  placeholder: { justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  description: { color: '#6b665d', marginBottom: 24, fontSize: 16, lineHeight: 22 },
  muted: { color: '#6b665d' },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 16, gap: 8, marginBottom: 16 },
  variant: { fontSize: 18, fontWeight: '600' },
  row: { flexDirection: 'row', gap: 8, marginTop: 8 }
});
