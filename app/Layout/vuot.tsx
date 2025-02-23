import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const categories = [
  {
    id: '1',
    title: 'Shirts & Tops',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ci7eQmUKvAkWV9jWgkOYOhTiow0ZUG.png',
  },
  {
    id: '2',
    title: 'Double Sided\nT-Shirts',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ci7eQmUKvAkWV9jWgkOYOhTiow0ZUG.png',
  },
  {
    id: '3',
    title: 'T-Shirts',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ci7eQmUKvAkWV9jWgkOYOhTiow0ZUG.png',
  },
  {
    id: '4',
    title: 'Clothing',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ci7eQmUKvAkWV9jWgkOYOhTiow0ZUG.png',
  },
];

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.25;

export default function Categories() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Explore related searches</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {categories.map((category) => (
          <View key={category.id} style={styles.categoryItem}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: category.image }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.categoryTitle}>{category.title}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  scrollContent: {
    paddingRight: 16,
  },
  categoryItem: {
    width: ITEM_WIDTH,
    marginRight: 12,
    alignItems: 'center',
  },
  imageContainer: {
    width: ITEM_WIDTH - 16,
    height: ITEM_WIDTH - 16,
    borderRadius: (ITEM_WIDTH - 16) / 2,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryTitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#1a1a1a',
    fontWeight: '500',
  },
});