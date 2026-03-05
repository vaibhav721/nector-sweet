import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '../components/Screen';
import { mobileApi } from '../lib/api';

export const WaitlistScreen = () => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('Lucknow');
  const [area, setArea] = useState('');
  const [pincode, setPincode] = useState('');
  const [status, setStatus] = useState('');

  return (
    <Screen>
      <Text style={styles.title}>Waitlist</Text>
      <View style={styles.card}>
        <Text style={styles.muted}>We will reach your location very soon.</Text>
        <TextInput value={name} onChangeText={setName} placeholder="Name" style={styles.input} />
        <TextInput value={city} onChangeText={setCity} placeholder="City" style={styles.input} />
        <TextInput value={area} onChangeText={setArea} placeholder="Area" style={styles.input} />
        <TextInput value={pincode} onChangeText={setPincode} placeholder="Pincode" style={styles.input} />
        <Button
          title="Join waitlist"
          onPress={async () => {
            await mobileApi.post('/waitlist', {
              name,
              city,
              area,
              pincode
            });
            setStatus('Request submitted successfully');
          }}
        />
      </View>
      {status ? <Text style={styles.muted}>{status}</Text> : null}
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: '700' },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 12, gap: 8 },
  input: { borderWidth: 1, borderColor: '#dfd9cf', borderRadius: 8, padding: 10 },
  muted: { color: '#6b665d' }
});
