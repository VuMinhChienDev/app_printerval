

import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';

const TrendingCollection = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Trending Collection</Text>

      {/* === Nhóm Hoodie === */}
      <View style={styles.section}>
        <View style={styles.shadowContainer}>
          <View style={styles.grid}>
            {/* Ảnh lớn */}
            <View style={styles.mainImageContainer}>
              <Image
                source={{ uri: 'https://example.com/hoodie-main.jpg' }}
                style={styles.mainImage}
                resizeMode="cover"
              />
            </View>
            {/* Ảnh nhỏ */}
            <View style={styles.smallImagesContainer}>
              <View style={styles.smallImageWrapper}>
                <Image
                  source={{ uri: 'https://example.com/hoodie-1.jpg' }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.smallImageWrapper}>
                <Image
                  source={{ uri: 'https://example.com/hoodie-2.jpg' }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Hoodie Collection</Text>
      </View>

      {/* === Nhóm Jesus === */}
      <View style={styles.section}>
        <View style={styles.shadowContainer}>
          <View style={styles.grid}>
            {/* Ảnh lớn */}
            <View style={styles.mainImageContainer}>
              <Image
                source={{ uri: 'https://example.com/jesus-main.jpg' }}
                style={styles.mainImage}
                resizeMode="cover"
              />
            </View>
            {/* Ảnh nhỏ */}
            <View style={styles.smallImagesContainer}>
              <View style={styles.smallImageWrapper}>
                <Image
                  source={{ uri: 'https://example.com/jesus-1.jpg' }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.smallImageWrapper}>
                <Image
                  source={{ uri: 'https://example.com/jesus-2.jpg' }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Jesus Collection</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A237E',
    padding: 16,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  shadowContainer: {
    marginHorizontal: 20,
    padding: 2,
    borderRadius: 16,
    backgroundColor: '#FFF',
    elevation: 6, 
    shadowColor: '#000', 
    shadowOpacity: 0.2,
  },
  grid: {
    flexDirection: 'row',
   
  },
  mainImageContainer: {
    flex: 2,
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: '#FFD54F',
    marginRight: 10, // To give some space between large and small images
  },
  mainImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  smallImagesContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 2,
  },
  smallImageWrapper: {  
    flex: 1,
    borderRadius: 12,
    backgroundColor: '#2B97A9',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default TrendingCollection;
