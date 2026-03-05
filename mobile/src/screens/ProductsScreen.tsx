import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screen } from '../components/Screen';
import { mobileApi } from '../lib/api';
import { useMobileCart } from '../context/CartContext';
import type { RootStackParamList } from '../navigation/RootNavigator';

export const ProductsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [products, setProducts] = useState<any[]>([]);
  const { addOneTime, addSubscription } = useMobileCart();

  useEffect(() => {
    const load = async () => {
      const response = await mobileApi.get('/catalog/products');
      setProducts(response.data.data);
    };

    load();
  }, []);

  return (
    <Screen>
      <Text style={styles.title}>Products</Text>
      {products.map((product) => (
        <View key={product._id} style={styles.card}>
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { slug: product.slug })}>
            <Text style={styles.productTitle}>{product.name}</Text>
            <Text style={styles.muted}>{product.shortDescription}</Text>
          </TouchableOpacity>

          {product.variants?.[0] ? (
            <View style={styles.row}>
              <Button title="Add" onPress={() => addOneTime(product.variants[0]._id)} />
              <Button
                title="Subscribe"
                onPress={() => addSubscription(product.variants[0]._id)}
                color="#1c6b4a"
              />
            </View>
          ) : null}
        </View>
      ))}
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: '700' },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 14, gap: 8 },
  productTitle: { fontSize: 18, fontWeight: '600' },
  muted: { color: '#6b665d' },
  row: { flexDirection: 'row', gap: 8 }
});
