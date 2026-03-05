import { Button, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { useMobileAuth } from '../context/AuthContext';

export const AccountScreen = () => {
  const { user, logout } = useMobileAuth();

  return (
    <Screen>
      <Text style={styles.title}>Account</Text>
      <View style={styles.card}>
        <Text style={styles.name}>{user?.email || user?.phoneNumber || 'Guest user'}</Text>
        <Text style={styles.muted}>Invoice history and reorder are available in this section.</Text>
        <Button title="Logout" onPress={logout} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: '700' },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 12, gap: 8 },
  name: { fontWeight: '700' },
  muted: { color: '#6b665d' }
});
