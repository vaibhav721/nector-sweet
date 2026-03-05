import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AccountScreen } from '../screens/AccountScreen';
import { AuthScreen } from '../screens/AuthScreen';
import { CartScreen } from '../screens/CartScreen';
import { CheckoutScreen } from '../screens/CheckoutScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { InvoiceHistoryScreen } from '../screens/InvoiceHistoryScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { ProductsScreen } from '../screens/ProductsScreen';
import { ReorderScreen } from '../screens/ReorderScreen';
import { ServiceabilityScreen } from '../screens/ServiceabilityScreen';
import { SubscriptionsScreen } from '../screens/SubscriptionsScreen';
import { WaitlistScreen } from '../screens/WaitlistScreen';

export type RootStackParamList = {
  Tabs: undefined;
  ProductDetail: { slug: string };
  Checkout: undefined;
  InvoiceHistory: undefined;
  Reorder: undefined;
  Serviceability: undefined;
  Waitlist: undefined;
  Auth: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Subscriptions" component={SubscriptionsScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product' }} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="InvoiceHistory" component={InvoiceHistoryScreen} />
        <Stack.Screen name="Reorder" component={ReorderScreen} />
        <Stack.Screen name="Serviceability" component={ServiceabilityScreen} />
        <Stack.Screen name="Waitlist" component={WaitlistScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
