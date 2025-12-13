import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import { Text } from 'react-native';

import CartScreen from './src/screens/CartScreen';
import HomeScreen from './src/screens/HomeScreen';
import MenuScreen from './src/screens/MenuScreen';

const Tab = createBottomTabNavigator();

const TabIcon = ({ icon }) => (
  <Text style={{ fontSize: 24 }}>{icon}</Text>
);

export default function App() {
  // State untuk cart
  const [cart, setCart] = useState([]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#FF6347',
          headerStyle: { backgroundColor: '#FF6347' },
          headerTintColor: '#fff',
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'Beranda',
            tabBarIcon: () => <TabIcon icon="🏠" />,
          }}
        />
        <Tab.Screen 
          name="Menu" 
          component={MenuScreen}
          options={{
            tabBarIcon: () => <TabIcon icon="🍔" />,
          }}
          initialParams={{ cart, setCart }}
        />
        <Tab.Screen 
          name="Cart" 
          component={CartScreen}
          options={{
            title: 'Keranjang',
            tabBarIcon: () => <TabIcon icon="🛒" />,
            tabBarBadge: cart.length > 0 ? cart.length : null,
          }}
          initialParams={{ cart, setCart }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}