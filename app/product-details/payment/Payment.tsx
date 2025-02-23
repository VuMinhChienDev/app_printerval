import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function CheckoutScreen() {
  const [selectedTip, setSelectedTip] = useState<string | null>(null);

  const tipOptions = [
    { label: 'No tips', value: '0' },
    { label: '$5.00', value: '5' },
    { label: '$3.00', value: '3' },
    { label: '$2.00', value: '2' },
    { label: 'Other', value: 'other' },
  ];

  const paymentMethods = [
    {
      id: 'card',
      title: 'Card',
      icon: '💳',
    },
    {
      id: 'bnpl',
      title: 'Buy now, pay later',
      icon: '🔄',
    },
    {
      id: 'paypal',
      title: 'PayPal',
      icon: '🅿️',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>


        </View>

        {/* Tip Section */}
        <View style={styles.section}>
          <Text style={styles.tipTitle}>
            Enjoy your purchase? Buy our designers a coffee. Thank you ❤️
          </Text>
          <View style={styles.tipGrid}>
            {tipOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.tipButton,
                  selectedTip === option.value && styles.selectedTip,
                ]}
                onPress={() => setSelectedTip(option.value)}
              >
                <Text style={styles.tipButtonText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity key={method.id} style={styles.paymentMethod}>
              <Text style={styles.paymentIcon}>{method.icon}</Text>
              <Text style={styles.paymentText}>{method.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Place Order Button */}
        <TouchableOpacity style={styles.placeOrderButton}>
          <Icon name="shield" size={24} color="#fff" style={styles.shieldIcon} />
          <Text style={styles.placeOrderText}>Place Order Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tipTitle: {
    color: '#4CAF50',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  tipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  tipButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 12,
    minWidth: '45%',
    alignItems: 'center',
  },
  selectedTip: {
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  tipButtonText: {
    color: 'black',
    fontSize: 16,
  },
  sectionTitle: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    marginBottom: 12,
  },
  paymentIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  paymentText: {
    color: 'black',
    fontSize: 16,
  },
  placeOrderButton: {
    backgroundColor: '#ff4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  shieldIcon: {
    marginRight: 8,
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});