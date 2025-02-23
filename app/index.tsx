

import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from './home/index'; 
// import CartScreen from './Cart/CartScreen'; // Đảm bảo đường dẫn chính xác


const Stack = createStackNavigator();
export default function App() {
  return (
    <View style={styles.container}> {/* Đặt flex: 1 cho View bao bọc */}
      <HomeScreen />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Đảm bảo View bao bọc chiếm toàn bộ không gian
  },
});
