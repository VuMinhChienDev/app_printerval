import { Stack } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import CustomHeader from '../CustomHeader';
import Footer from '../Footer';

interface ProductCardProps {
  title: string;
  imageUrl: string;
  backgroundColor: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, imageUrl, backgroundColor }) => (
  <View style={[styles.card, { backgroundColor }]}>
    <Image source={{ uri: imageUrl }} style={styles.cardImage} resizeMode='cover' />
    <Text style={styles.cardTitle}>{title}</Text>
  </View>
);

export default function Event() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.CustomHeader}>
        <CustomHeader />
      </View>
      <ScrollView style={styles.content}>
        <Stack.Screen
     
          options={{ headerShown: false }} // Ẩn header mặc định
        />

        {/* Breadcrumb */}
        <View style={styles.breadcrumb}>
          <Text style={styles.breadcrumbText}>Printerval</Text>
          <Text style={styles.breadcrumbSeparator}> › </Text>
          <Text style={styles.breadcrumbText}>Explore</Text>
          <Text style={styles.breadcrumbSeparator}> › </Text>
          <Text style={styles.breadcrumbText}>Custom Bootleg Shirt</Text>
        </View>

        {/* Filter Pill */}
        <View style={styles.filterContainer}>
          <View style={styles.filterPill}>
            <Text style={styles.filterText}>Custom bootleg shirt</Text>
          </View>
          <Text style={styles.resultCount}>(146 Results)</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>
          Explore Creative Custom bootleg shirt Gifts Designed By Artists
        </Text>

        {/* Product Grid */}
        <View style={styles.grid}>
          <ProductCard
            title='Custom Your Own Bootleg Tee, Retro Custom Bootleg'
            imageUrl=''
            backgroundColor='#d1e7dd'
          />
          <ProductCard
            title='Custom 90s Vintage Bootleg Shirt, Custom Photo Shirt'
            imageUrl=''
            backgroundColor='#f8d7da'
          />
        </View>

        {/* CTA Button */}
        <TouchableOpacity style={styles.exploreButton}>
          <Text style={styles.exploreButtonText}>Explore Gifting</Text>
        </TouchableOpacity>
        <View>
          <Footer/>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  CustomHeader: {

    top: 0, // Gắn vào mép trên màn hình
    left: 0,
    right: 0,
    zIndex: 10, // Đảm bảo header luôn hiển thị trên cùng
    padding: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4, // Hiệu ứng đổ bóng trên Android
    alignItems: 'center',
    flexDirection: 'row', 
    justifyContent: 'center',

  },
  logo: {
    width: 120,
    height: 40,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cartContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#ff6b00',
    borderRadius: 12,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  breadcrumb: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  breadcrumbText: {
    fontSize: 16,
    color: '#333',
  },
  breadcrumbSeparator: {
    fontSize: 16,
    color: '#666',
    marginHorizontal: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterPill: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterText: {
    color: '#fff',
    fontSize: 16,
  },
  resultCount: {
    marginLeft: 8,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    color: '#1a237e',
  },
  grid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    flex: 1,
    minWidth: '45%',
    borderRadius: 12,
    overflow: 'hidden',
    padding: 16,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  cardTitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#333',
  },
  exploreButton: {
    backgroundColor: '#ff6b00',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
