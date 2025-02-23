


import * as React from 'react';
import { Stack, useRouter } from 'expo-router';  // Import useRouter từ expo-router
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Event from '../event/event';



interface Product {
  id: number;
  title: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    title: 'Calendar 2025',
    image:
      'https://cdn.printerval.com/image/960x960/t-shirts-men-heavyweight-t-shirt-1,royal,print-2024-10-14_53fd8247-d4c0-4714-a76b-837db48b652d,24518b.jpeg',
  },
  {
    id: 2,
    title: 'Custom Bootleg Shirts',
    image:
      'https://cdn.printerval.com/unsafe/540x540/asset.prtvstatic.com/2024/05/28/5ddc9add3cdc4db249cfa8a9f84df949.jpg',
  },
  {
    id: 3,
    title: 'Fever Ray',
    image:
      'https://cdn.printerval.com/unsafe/960x960/asset.prtvstatic.com/2023/12/01/65695adedfbd89.62553071.jpg',
  },
  {
    id: 4,
    title: 'Trump',
    image:
      'https://cdn.printerval.com/unsafe/540x540/asset.prtvstatic.com/2023/07/21/64ba06ab09ca54.30057617.jpg',
  },
  {
    id: 5,
    title: 'T-Shirts',
    image:
      'https://cdn.printerval.com/image/540x540/t-shirts-men-heavyweight-t-shirt-1,black,print-2024-08-22_be74b31c-c5fa-4a19-8d44-89aae91ffd59,2d2d2d.jpeg',
  },
  {
    id: 6,
    title: 'Premium Matte Vertical Posters',
    image:
      'https://cdn.printerval.com/unsafe/540x540/asset.prtvstatic.com/2025/01/28/45c896e998a54af948c7dd4556805bd3.png',
  },
  {
    id: 7,
    title: 'Baseball Jerseys',
    image:
      'https://cdn.printerval.com/unsafe/540x540/storage.googleapis.com/printerval-us/2022/01/08/premium-matte-vertical-posters-cb5db98c1a81f0953f09b52faaa1955f.jpg',
  },
  {
    id: 8,
    title: 'Hoodies',
    image:
      'https://cdn.printerval.com/unsafe/540x540/asset.prtvstatic.com/2024/05/28/432659c519f14adcc292cb2c0ad8e9f1.jpg',
  },
  {
    id: 9,
    title: 'Hawaiians',
    image:
      'https://cdn.printerval.com/unsafe/540x540/asset.prtvstatic.com/2024/05/28/5ddc9add3cdc4db249cfa8a9f84df949.jpg',
  },
  {
    id: 10,
    title: 'Stickers',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-22Y2v8cRmcMUzIh17mn2Jr0ZWvBCIG.png',
  },
];

const ProductCarousel: React.FC = () => {
  const scrollViewRef = React.useRef<ScrollView>(null);
  const [currentScroll, setCurrentScroll] = React.useState(0);
  const { width: screenWidth } = Dimensions.get('window');
  
  const router = useRouter(); // Tạo đối tượng router

  // Xác định nếu thiết bị mobile dựa trên chiều rộng màn hình
  const isMobile = screenWidth <= 768;
  const isIphone12Pro = screenWidth <= 390; // Chỉ kiểm tra kích thước

  // Kích thước ảnh thay đổi theo thiết bị: 80px cho mobile, 125px cho các thiết bị khác
  const imageSize = isMobile ? 110 : 150;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollViewRef.current) {
      const scrollAmount = 300;
      const newScroll = currentScroll + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollViewRef.current.scrollTo({ x: newScroll, animated: true });
      setCurrentScroll(newScroll);
    }
  };

  // Hàm chuyển hướng tới màn hình Event khi nhấn vào ảnh
  const goToEvent = (productId: number) => {
    router.push(`/event/event?id=${productId}`);  // Điều hướng tới trang Event
  };

  return (
    <View style={isIphone12Pro ? styles.iphoneContainer : styles.container}>
      {/* Hiển thị nút điều hướng bên trái & bên phải nếu không phải mobile */}
      {!isMobile && (
        <>
          <TouchableOpacity style={[styles.arrowButton, { left: 0 }]} onPress={() => scroll('left')}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.arrowButton, { right: 0 }]} onPress={() => scroll('right')}>
            <Ionicons name="chevron-forward" size={24} color="#000" />
          </TouchableOpacity>
        </>
      )}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {products.map((product, index) => (
          <View key={product.id} style={[styles.productItem, index === products.length - 1 ? {} : { marginRight: 16 }]}>
            <TouchableOpacity onPress={() => goToEvent(product.id)}> {/* Thêm sự kiện onPress */}
              <View style={[styles.imageContainer, { width: imageSize, height: imageSize }]}>
                <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="cover" />
              </View>
              <Text style={styles.productTitle}>{product.title}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    paddingHorizontal: 0,
  },
  iphoneContainer: {
    position: 'relative',
    width: '100%',
  },
  arrowButton: {
    position: 'absolute',
    top: '50%',
    zIndex: 10,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
  },
  scrollContent: {
    flexDirection: 'row',
    paddingBottom: 16,
  },
  productItem: {
    alignItems: 'center',
  },
  imageContainer: {
    borderRadius: 999,
    overflow: 'hidden',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productTitle: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
    width: 100,
  },
});

export default ProductCarousel;
