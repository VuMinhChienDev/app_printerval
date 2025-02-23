import { useRouter } from 'expo-router';
import { View, TouchableOpacity, StyleSheet, Modal, Text, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SvgUri } from 'react-native-svg';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function CustomHeader() {
  const [modalVisible, setModalVisible] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0); // Số lượng wishlist
  const [cartCount, setCartCount] = useState(0); // Số lượng cart
  const router = useRouter();

  // Hàm tải số lượng wishlist và cart từ AsyncStorage
  const loadCounts = async () => {
    try {
      // Tải wishlist
      const wishlist = await AsyncStorage.getItem('wishlist');
      const parsedWishlist = wishlist ? JSON.parse(wishlist) : [];
      setWishlistCount(parsedWishlist.length);

      // Tải cart
      const cart = await AsyncStorage.getItem('cart');
      const parsedCart = cart ? JSON.parse(cart) : [];
      setCartCount(parsedCart.length);
    } catch (error) {
      console.error('Error loading counts:', error);
    }
  };

  // Tải số lượng khi component mount
  useEffect(() => {
    loadCounts();
  }, []);

  // Cập nhật số lượng khi màn hình được focus
  useFocusEffect(
    React.useCallback(() => {
      loadCounts();
    }, [])
  );

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={() => router.push('/home/NavaMenu/NavaMenu')}>
          <View style={styles.menuIcon}>
            <View style={[styles.menuLine, { width: 20 }]} />
            <View style={[styles.menuLine, { width: 28 }]} />
            <View style={[styles.menuLine, { width: 16 }]} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/home/seach/seach')}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push('/')} style={styles.logo}>
        <SvgUri width="120" height="40" uri="https://printerval.com/assets/images/logo.svg" />
      </TouchableOpacity>

      <View style={styles.headerRight}>
        <View style={styles.iconWithBadge}>
          {/* Nút mở menu với badge wishlist */}
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="person-outline" size={24} color="black" />
          </TouchableOpacity>
          {wishlistCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{wishlistCount}</Text>
            </View>
          )}
        </View>

        <View style={styles.iconWithBadge}>
          {/* Nút giỏ hàng với badge cart */}
          <TouchableOpacity onPress={() => router.push('/product-details/Cart/Cartscreen')}>
            <Ionicons name="cart-outline" size={24} color="black" />
          </TouchableOpacity>
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Modal hiển thị Login & Wishlist */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setModalVisible(false);
                  setTimeout(() => router.push('/login/login'), 300);
                }}
              >
                <View style={styles.menuItemContent}>
                  <Ionicons name="log-in-outline" size={24} color="#333" style={styles.menuIcon} />
                  <Text style={styles.text}>Login</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setModalVisible(false);
                  setTimeout(() => router.push('/product-details/wishlist/WishlistScreen'), 300);
                }}
              >
                <View style={styles.menuItemContent}>
                  <Ionicons name="heart-outline" size={24} color="#333" style={styles.menuIcon} />
                  <Text style={styles.text}>Wishlist</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  headerLeft: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 65,
  },
  menuIcon: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 4,
    marginRight: 10,
  },
  menuLine: {
    height: 2,
    backgroundColor: 'pink',
    marginBottom: 4,
    borderRadius: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 70,
  },
  logo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  menuItem: {
    paddingVertical: 15,
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  iconWithBadge: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});