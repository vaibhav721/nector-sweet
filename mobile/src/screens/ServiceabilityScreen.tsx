import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '../components/Screen';
import { mobileApi } from '../lib/api';

export const ServiceabilityScreen = () => {
  const [pincode, setPincode] = useState('226010');
  const [result, setResult] = useState<string>('');

  return (
    <Screen>
      <Text style={styles.title}>Serviceability Check</Text>
      <View style={styles.card}>
        <Text>Final decision is based on pincode.</Text>
        <TextInput value={pincode} onChangeText={setPincode} style={styles.input} keyboardType="number-pad" />
        <Button
          title="Check"
          onPress={async () => {
            const response = await mobileApi.get('/serviceability/check', { params: { pincode } });
            setResult(response.data.data.message);
          }}
        />
      </View>
      {result ? <Text style={styles.muted}>{result}</Text> : null}
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: '700' },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 12, gap: 8 },
  input: { borderWidth: 1, borderColor: '#dfd9cf', borderRadius: 8, padding: 10 },
  muted: { color: '#6b665d' }
});
