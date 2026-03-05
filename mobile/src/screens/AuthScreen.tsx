import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '../components/Screen';
import { useMobileAuth } from '../context/AuthContext';

export const AuthScreen = () => {
  const { signInEmail, signUpEmail } = useMobileAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  return (
    <Screen>
      <Text style={styles.title}>Login / Signup</Text>
      <View style={styles.card}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />
        <Button
          title="Login"
          onPress={async () => {
            await signInEmail(email, password);
            setMessage('Logged in');
          }}
        />
        <Button
          title="Signup"
          color="#1c6b4a"
          onPress={async () => {
            await signUpEmail(email, password);
            setMessage('Account created');
          }}
        />
      </View>
      {message ? <Text style={styles.muted}>{message}</Text> : null}
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: '700' },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 12, gap: 8 },
  input: { borderWidth: 1, borderColor: '#dfd9cf', borderRadius: 8, padding: 10 },
  muted: { color: '#6b665d' }
});
