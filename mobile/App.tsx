import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { MobileAuthProvider } from './src/context/AuthContext';
import { MobileCartProvider } from './src/context/CartContext';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <MobileAuthProvider>
      <MobileCartProvider>
        <StatusBar style="dark" />
        <RootNavigator />
      </MobileCartProvider>
    </MobileAuthProvider>
  );
}
