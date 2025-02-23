import * as React from 'react';
import 'react-native-gesture-handler'; // Thêm dòng này ở trên cùng

import { View, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native';

import ProductCarousel from './ProductCarousel';
import ProductGrid from './ProductGrid';
import PrintervalPage from './PrintervalPage';
import Special from './Special/Special';
import Discover from './Special/Discover';
import TrendingCollection from './TrendingCollection/TrendingCollection';
import StartSelling from './StartSelling/StartSelling';
import Footer from '../Footer';
import CustomHeader from '../CustomHeader';

export default function HomeScreen() {
  return (
   < SafeAreaView style={styles.container}>
    <View>  <CustomHeader /></View>
    <ScrollView style={styles.container}>
      
      {/* Phần header */}
      <View style={styles.header}>
        <View style={styles.pinkOverlay} />
        <Text style={styles.helloText}>
          Printer | Handmades, Personalized {'\n'}
          Custom Clothes & Gifts
        </Text>
        <ProductCarousel />
      </View>

      {/* Phần danh sách sản phẩm */}
      <View style={styles.productContainer}>
        <ProductGrid />
      </View>
      <View style={styles.PrintervalPage}>
        <PrintervalPage />
      </View>
      <View>
        <Special />
      </View>
      <View>
        <Discover />
      </View>
      <View>
        <TrendingCollection />
      </View>
      <View>
        <StartSelling />
      </View>
      <View>
        <Footer />
      </View>
    </ScrollView>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Scroll toàn màn hình
    backgroundColor: '#fff', // Nền trắng cho dễ nhìn
  },
  header: {
    height: 225, // Chiều cao header
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  pinkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 115,
    backgroundColor: 'pink',
  },
  helloText: {
    zIndex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 10, // Thêm khoảng cách dưới
  },
  productContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  PrintervalPage: {
    paddingHorizontal: 10,
    marginTop: 20, // Tăng khoảng cách với phần trên
    gap: 10,
    marginBottom: 10,
  },
});
