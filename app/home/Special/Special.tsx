import { router } from 'expo-router';
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { products as productData } from '../../Data'; 

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  imageUrl: string; 
}

const products: Product[] = productData; 
const { width } = Dimensions.get('window');
const IMAGE_HEIGHT = 150;
const ITEM_WIDTH = 150;

// Component hiển thị thông tin sản phẩm
const ProductItem = ({ item }: { item: Product }) => (
  <TouchableOpacity
    style={styles.card}
    activeOpacity={0.8}
    onPress={() => router.push(`/product-details/Product?id=${item.id}`)}
  >
    <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
    <View style={styles.infoContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        {item.originalPrice && (
          <Text style={styles.originalPrice}>${item.originalPrice.toFixed(2)}</Text>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

// Hàm ghép dữ liệu thành cặp (hàng trên và hàng dưới)
const pairProducts = () => {
  const topRow = products.slice(1, 10); // Hàng trên
  const bottomRow = products.slice(11, 20); // Hàng dưới
  const maxLength = Math.max(topRow.length, bottomRow.length);
  const paired = [];

  for (let i = 0; i < maxLength; i++) {
    paired.push({
      top: topRow[i] || null, // Sản phẩm hàng trên (nếu có)
      bottom: bottomRow[i] || null, // Sản phẩm hàng dưới (nếu có)
    });
  }
  return paired;
};

const Special = () => {
  const pairedProducts = pairProducts();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>Discover Just for You</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      >
        {pairedProducts.map((pair, index) => (
          <View key={index} style={styles.column}>
            {pair.top && <ProductItem item={pair.top} />}
            {pair.bottom && <ProductItem item={pair.bottom} />}
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  horizontalList: {
    paddingVertical: 10,
  },
  column: {
    marginRight: 10, // Khoảng cách giữa các cột
  },
  card: {
    width: ITEM_WIDTH,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: IMAGE_HEIGHT,
    borderRadius: 10,
  },
  infoContainer: {
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
  },
  originalPrice: {
    fontSize: 12,
    color: 'gray',
    textDecorationLine: 'line-through',
  },
});

export default Special;