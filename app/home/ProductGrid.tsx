import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';

interface Product {
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  href: string;
}

const products: Product[] = [
  { title: 'Shop Valentine T-Shirts!', price: 13.95, originalPrice: 27.9, image: 'https://cdn.printerval.com/unsafe/540x540/asset.prtvstatic.com/2025/02/05/1-6-bd7aea66c726f8351f2f3dd610e74712.jpg', href: '#valentine-tshirts' },
  { title: 'Valentine SweatShirts - Sale OFF', price: 22.95, originalPrice: 32.95, image: 'https://cdn.printerval.com/unsafe/540x540/asset.prtvstatic.com/2025/02/05/3-4-89b2ac131cd469608201f655d7f7d6cc.jpg', href: '#valentine-sweatshirts' },
  { title: '40% Off: Happy Valentine Hoodies', price: 24.95, originalPrice: 41.5, image: 'https://cdn.printerval.com/unsafe/540x540/asset.prtvstatic.com/2025/02/05/2-9-2e16d85992a4767e1dbf5648052d6a9b.jpg', href: '#valentine-hoodies' },
  { title: 'Save 65% on Baseball Jersey', price: 18.45, originalPrice: 30.75, image: 'https://cdn.printerval.com/unsafe/540x540/asset.prtvstatic.com/2025/02/05/5-4-09c41f82dbe8ee34ba0c93acdf032706.jpg', href: '#baseball-jersey' },
  { title: 'Shop Valentine T-Shirts!', price: 13.95, originalPrice: 27.9, image: 'https://cdn.printerval.com/unsafe/540x540/asset.prtvstatic.com/2025/02/05/1-6-bd7aea66c726f8351f2f3dd610e74712.jpg', href: '#valentine-tshirts' },
  { title: 'Valentine SweatShirts - Sale OFF', price: 22.95, originalPrice: 32.95, image: 'https://cdn.printerval.com/unsafe/540x540/asset.prtvstatic.com/2025/02/05/3-4-89b2ac131cd469608201f655d7f7d6cc.jpg', href: '#valentine-sweatshirts' },
  { title: '40% Off: Happy Valentine Hoodies', price: 24.95, originalPrice: 41.5, image: 'https://cdn.printerval.com/unsafe/540x540/asset.prtvstatic.com/2025/02/05/2-9-2e16d85992a4767e1dbf5648052d6a9b.jpg', href: '#valentine-hoodies' },
  { title: 'Save 65% on Baseball Jersey', price: 18.45, originalPrice: 30.75, image: 'https://cdn.printerval.com/unsafe/540x540/asset.prtvstatic.com/2025/02/05/5-4-09c41f82dbe8ee34ba0c93acdf032706.jpg', href: '#baseball-jersey' },
];

const { width } = Dimensions.get('window');
const IMAGE_HEIGHT = 220;
const ITEM_WIDTH = (width * 3) / 4 - 10;

const ProductItem = ({ item }: { item: Product }) => (
  <TouchableOpacity style={styles.card} activeOpacity={0.8}>
    <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
    <View style={styles.overlay}>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={styles.originalPrice}>${item.originalPrice.toFixed(2)}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

// Hàm ghép dữ liệu thành cặp (hàng trên và hàng dưới)
const pairProducts = () => {
  const topRow = products.slice(2, 5); // Hàng trên: 3 sản phẩm
  const bottomRow = products.slice(5); // Hàng dưới: 3 sản phẩm còn lại
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

const ProductGrid = () => {
  const pairedProducts = pairProducts();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {pairedProducts.map((pair, index) => (
        <View key={index} style={styles.column}>
          {pair.top && <ProductItem item={pair.top} />}
          {pair.bottom && <ProductItem item={pair.bottom} />}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  column: {
    marginRight: 10, // Khoảng cách giữa các cột
  },
  card: {
    width: ITEM_WIDTH,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: IMAGE_HEIGHT,
    borderRadius: 10,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'lightgreen',
  },
  originalPrice: {
    fontSize: 12,
    color: 'white',
    textDecorationLine: 'line-through',
    opacity: 0.8,
  },
});

export default ProductGrid;