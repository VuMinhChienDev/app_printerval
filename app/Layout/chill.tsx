import { router } from 'expo-router';
import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import { products as productData } from '../Data';

// Định nghĩa interface cho sản phẩm
interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
}

// Lấy dữ liệu sản phẩm từ file Data
const products: Product[] = productData;

// Lấy chiều rộng màn hình để tính toán kích thước item
const { width } = Dimensions.get('window');
const ITEM_WIDTH = 150;
const ITEM_HEIGHT = 250; // Thêm chiều cao cố định cho item để đồng đều
const IMAGE_HEIGHT = 150;

// Component hiển thị từng sản phẩm
const ProductItem = ({ item }: { item: Product }) => (
  <TouchableOpacity
    style={styles.card}
    activeOpacity={0.8}
    onPress={() => router.push(`/product-details/Product?id=${item.id}`)}
  >
    <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
    <View style={styles.infoContainer}>
      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
        {item.title}
      </Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        {item.originalPrice && (
          <Text style={styles.originalPrice}>${item.originalPrice.toFixed(2)}</Text>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

// Component Chill chính
const Chill = () => {
  return (
    <View style={styles.container}>
      {/* Tiêu đề "Recently Viewed" */}
      <View style={styles.recentlyViewedContainer}>
        <Text style={styles.recentlyViewedText}>Recently Viewed</Text>
      </View>

      {/* Danh sách sản phẩm vuốt ngang */}
      <FlatList
        data={products.slice(1, 10)} // Lấy sản phẩm từ index 1 đến 9
        keyExtractor={(item) => item.id.toString()}
        horizontal
        renderItem={({ item }) => <ProductItem item={item} />}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Khoảng cách đều giữa các item
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT, // Chiều cao cố định để đồng đều
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: ITEM_WIDTH, // Đảm bảo ảnh khớp với chiều rộng card
    height: IMAGE_HEIGHT,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    flex: 1, // Để phần thông tin chiếm hết không gian còn lại
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between', // Căn đều nội dung trong infoContainer
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
  recentlyViewedContainer: {
    marginBottom: 20,
  },
  recentlyViewedText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  horizontalList: {
    paddingHorizontal: 0, // Loại bỏ padding thừa để căn đều
  },
});

export default Chill;