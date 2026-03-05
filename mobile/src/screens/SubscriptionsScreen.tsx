import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { mobileApi } from '../lib/api';

export const SubscriptionsScreen = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  const load = async () => {
    const response = await mobileApi.get('/subscriptions');
    setSubscriptions(response.data.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Screen>
      <Text style={styles.title}>Subscriptions</Text>
      {!subscriptions.length ? <Text>No subscriptions yet.</Text> : null}
      {subscriptions.map((subscription) => (
        <View key={subscription._id} style={styles.card}>
          <Text style={styles.name}>#{subscription._id.slice(-6)}</Text>
          <Text style={styles.muted}>
            {subscription.frequency} | Qty {subscription.quantity} | {subscription.status}
          </Text>
          <View style={styles.row}>
            <Button
              title="Pause"
              onPress={async () => {
                await mobileApi.post(`/subscriptions/${subscription._id}/pause`, {
                  from: new Date().toISOString().slice(0, 10),
                  until: new Date(Date.now() + 86400000).toISOString().slice(0, 10)
                });
                load();
              }}
            />
            <Button
              title="Skip"
              color="#1c6b4a"
              onPress={async () => {
                await mobileApi.post(`/subscriptions/${subscription._id}/skip`, {
                  date: new Date().toISOString().slice(0, 10)
                });
              }}
            />
          </View>
        </View>
      ))}
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: '700' },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 12, gap: 8 },
  name: { fontWeight: '700' },
  muted: { color: '#6b665d' },
  row: { flexDirection: 'row', gap: 8 }
});
