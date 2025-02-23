import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function ProductScreen() {
  const [color, setColor] = useState('black');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const colors = [
    { id: 'black', color: '#000000' },
    { id: 'navy', color: '#2B3A55' },
    { id: 'red', color: '#DC3545' },
    { id: 'blue', color: '#0D6EFD' },
    { id: 'gray', color: '#6C757D' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Humorous-Have-Tried-Restarting-It-</Text>
      
      <View style={styles.priceContainer}>
        <Text style={styles.salePrice}>$35.95</Text>
        <Text style={styles.originalPrice}>$55.31</Text>
        <Text style={styles.stockStatus}>In Stock</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Color: Black</Text>
        <View style={styles.colorGrid}>
          {colors.map((c) => (
            <TouchableOpacity
              key={c.id}
              style={[
                styles.colorOption,
                { backgroundColor: c.color },
                color === c.id && styles.selectedColor,
              ]}
              onPress={() => setColor(c.id)}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Type</Text>
        <View style={styles.typeContainer}>
          <Text style={styles.typeLabel}>Unisex</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Style</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue="classic"
            style={styles.picker}
          >
            <Picker.Item label="Classic Zip Hoodie ($35.95)" value="classic" />
          </Picker>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={size}
            style={styles.picker}
            onValueChange={(itemValue) => setSize(itemValue)}
          >
            <Picker.Item label="Choose a size" value="" />
            <Picker.Item label="S" value="s" />
            <Picker.Item label="M" value="m" />
            <Picker.Item label="L" value="l" />
            <Picker.Item label="XL" value="xl" />
          </Picker>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Print Location: Front</Text>
        <View style={styles.printLocations}>
          {/* Print location images would go here */}
        </View>
      </View>

      <View style={styles.quantitySection}>
        <Text style={styles.sectionTitle}>Quantity</Text>
        <Text style={styles.bulkText}>Buying In Bulk?</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.addToCartText}>Add to cart</Text>
      </TouchableOpacity>

      <View style={styles.guaranteeBox}>
        <Text style={styles.guaranteeText}>
          Don't love it? We'll fix it. For free.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  salePrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E53935',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 20,
    textDecorationLine: 'line-through',
    color: '#666',
    marginRight: 16,
  },
  stockStatus: {
    color: '#4CAF50',
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  colorGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#000',
  },
  typeContainer: {
    backgroundColor: '#000033',
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  typeLabel: {
    color: '#fff',
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  printLocations: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  quantitySection: {
    marginBottom: 24,
  },
  bulkText: {
    color: '#FF9800',
    marginBottom: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 16,
  },
  addToCartButton: {
    backgroundColor: '#FF4081',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  guaranteeBox: {
    backgroundColor: '#FFF3E0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  guaranteeText: {
    fontSize: 16,
    color: '#333',
  },
});