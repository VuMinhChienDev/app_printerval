import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CheckoutScreen from './Payment';
import OrderReview from './odreReview';
import { router, Stack } from 'expo-router';
import CustomHeader from '../../CustomHeader';

export default function PaymentScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{ headerShown: false }} // Ẩn header mặc định
      />
      <View style={styles.header}>
       
        <CustomHeader/>
      </View>

      {/* Progress Indicator */}
      <View style={styles.progress}>
        <Text style={styles.activeStep}>Cart</Text>
        <Text style={styles.separator}>—</Text>
        <Text style={styles.activeStep}>Order Information</Text>
        <Text style={styles.separator}>—</Text>
        <Text style={styles.inactiveStep}>Complete</Text>
      </View>

      <ScrollView style={styles.form}>
        <Text style={styles.sectionTitle}>Billing information</Text>

        <TextInput style={styles.input} placeholder='First name' placeholderTextColor='#666' />

        <TextInput style={styles.input} placeholder='Last name' placeholderTextColor='#666' />

        <View style={styles.phoneContainer}>
          <TouchableOpacity style={styles.countryCode}>
            <Text>🇺🇸 +1</Text>
            <Ionicons name='chevron-down' size={16} color='#000' />
          </TouchableOpacity>
          <TextInput
            style={styles.phoneInput}
            placeholder='Phone (required)'
            placeholderTextColor='#666'
            keyboardType='phone-pad'
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder='Email (required)'
          placeholderTextColor='#666'
          keyboardType='email-address'
        />

        <Text style={styles.sectionTitle}>Shipping Address</Text>

        <TouchableOpacity style={styles.checkboxContainer}>
          <View style={styles.checkbox} />
          <Text style={styles.checkboxLabel}>Send to your friend</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.countrySelector}>
          <Text>United States</Text>
          <Ionicons name='chevron-down' size={16} color='#000' />
        </TouchableOpacity>

        <TextInput style={styles.input} placeholder='Address' placeholderTextColor='#666' />

        <TextInput
          style={styles.input}
          placeholder='Apartment, suite, etc. (optional)'
          placeholderTextColor='#666'
        />

        <TextInput style={styles.input} placeholder='City / Suburb' placeholderTextColor='#666' />
        <OrderReview />
        <CheckoutScreen />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    backgroundColor: '#fff',
  },
  progress: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  activeStep: {
    color: '#ff6b00',
    fontWeight: '500',
  },
  inactiveStep: {
    color: '#999',
  },
  separator: {
    color: '#999',
  },
  form: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  phoneContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    minWidth: 100,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
});
