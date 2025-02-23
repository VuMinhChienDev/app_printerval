
// import React, { useState } from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   FlatList,
// } from 'react-native';
// import { Search, Camera, TrendingUp } from 'lucide-react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { router, Stack } from 'expo-router';
// import tw from 'twrnc';
// import { products as Product } from '../../Data';

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   originalPrice?: number;
//   imageUrl: string;
//   gender?: string;
// }

// const products: Product[] = Product;

// const TrendingSearches = [
//   'hozier',
//   'gracie abrams',
//   'lord of the rings',
// ];

// const Categories = [
//   { id: 1, name: 'T-Shirts', color: '#8B5CF6' },
//   { id: 2, name: 'Sweatshirts', color: '#3B82F6' },
//   { id: 3, name: '3D T Shirts', color: '#22C55E' },
//   { id: 4, name: 'Zip Hoodies', color: '#F97316' },
//   { id: 5, name: '3D Hoodies', color: '#22C55E' },
//   { id: 6, name: 'Hoodies', color: '#F97316' },
//   { id: 7, name: 'Zip Hoodies', color: '#8B5CF6' },
//   { id: 8, name: 'Custom T-Shirts', color: '#3B82F6' },
//   { id: 9, name: 'Long Sleeves', color: '#F97316' },
//   { id: 10, name: 'House Flags', color: '#8B5CF6' },
// ];

// export default function App() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState(products);

//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//     if (query.trim() === '') {
//       setFilteredProducts(products);
//     } else {
//       const filtered = products.filter(
//         (product) =>
//           product.title.toLowerCase().includes(query.toLowerCase()) ||
//           product.price.toString().includes(query)
//       );
//       setFilteredProducts(filtered);
//     }
//   };

//   const handleProductPress = (productId: number) => {
//     router.push(`/product-details/Product?id=${productId}`);
//   };

//   const renderProduct = ({ item }: { item: Product }) => (
//     <TouchableOpacity
//       style={styles.productCard}
//       onPress={() => handleProductPress(item.id)}
//     >
//       <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
//       <Text style={styles.productTitle} numberOfLines={2}>
//         {item.title}
//       </Text>
//       <View style={styles.priceContainer}>
//         <Text style={styles.price}>${item.price}</Text>
//         {item.originalPrice && (
//           <Text style={styles.originalPrice}>${item.originalPrice}</Text>
//         )}
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         <Stack.Screen options={{ headerShown: false }} />

//         {/* Search Bar */}
//         <View style={styles.searchContainer}>
//           <View style={styles.searchBar}>
//             <Search size={20} color="#666" />
//             <TextInput
//               style={styles.searchInput}
//               placeholder="Search designs and products"
//               placeholderTextColor="#666"
//               value={searchQuery}
//               onChangeText={handleSearch}
//             />
//             <Camera size={20} color="#0284C7" />
//           </View>
//           <Ionicons onPress={() => router.push('/')} name="close" size={24} color="#000" />
//         </View>

//         {/* Trending Searches */}
//         <View style={styles.trendingContainer}>
//           {TrendingSearches.map((search, index) => (
//             <View key={index} style={styles.trendingItem}>
//               <TrendingUp size={16} color="#666" />
//               <Text style={styles.trendingText}>{search}</Text>
//             </View>
//           ))}
//         </View>

//         {/* Today's Special Picks */}
//         <View style={styles.specialPicksContainer}>
//           <Text style={styles.sectionTitle}>Search</Text>
//           <View style={styles.rowsContainer}>
//             {/* Hàng 1 */}
//             <FlatList
//               horizontal
//               data={filteredProducts.slice(0, 8)}
//               renderItem={renderProduct}
//               keyExtractor={(item) => item.id.toString()}
//               showsHorizontalScrollIndicator={false}
//               style={styles.productRow}
//             />

//             {/* Hàng 2 */}
//             <FlatList
//               horizontal
//               data={filteredProducts.slice(8, 16)}
//               renderItem={renderProduct}
//               keyExtractor={(item) => item.id.toString()}
//               showsHorizontalScrollIndicator={false}
//               style={styles.productRow}
//             />
//           </View>
//         </View>

//         {/* Categories */}
//         <View style={styles.categoriesContainer}>
//           {Categories.map((category) => (
//             <TouchableOpacity
//               key={category.id}
//               style={[styles.categoryButton, { backgroundColor: category.color }]}
//             >
//               <Text style={styles.categoryText}>{category.name}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   searchContainer: {
//     padding: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 25,
//   },
//   searchBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#FFA500',
//     borderRadius: 25,
//     padding: 8,
//     backgroundColor: '#fff',
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 8,
//     fontSize: 16,
//     color: '#333',
//   },
//   trendingContainer: {
//     paddingHorizontal: 16,
//     marginBottom: 16,
//   },
//   trendingItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   trendingText: {
//     marginLeft: 8,
//     color: '#666',
//     fontSize: 16,
//   },
//   specialPicksContainer: {
//     padding: 16,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     marginBottom: 16,
//     color: '#333',
//   },
//   rowsContainer: {
//     flexDirection: 'column',
//   },
//   productRow: {
//     marginBottom: 10,
//   },
//   productCard: {
//     width: 150,
//     marginRight: 10,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 10,
//   },
//   productImage: {
//     width: 130,
//     height: 130,
//     borderRadius: 8,
//   },
//   productTitle: {
//     padding: 8,
//     fontSize: 14,
//     color: '#333',
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     padding: 8,
//     alignItems: 'center',
//   },
//   price: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#E11D48',
//     marginRight: 8,
//   },
//   originalPrice: {
//     fontSize: 16,
//     color: '#666',
//     textDecorationLine: 'line-through',
//   },
//   categoriesContainer: {
//     padding: 16,
//     gap: 8,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   categoryButton: {
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     width: '48%',
//     marginBottom: 10,
//   },
//   categoryText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '500',
//   },
// });

import React, { useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
  } from 'react-native';
  import { SafeAreaView } from 'react-native-safe-area-context';
 
import { Search, Camera, TrendingUp } from 'lucide-react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import tw from 'twrnc';
import { products as Product } from '../../Data';

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  gender?: string;
}

const products: Product[] = Product;

const TrendingSearches = [
  'hozier',
  'gracie abrams',
  'lord of the rings',
];

const Categories = [
  { id: 1, name: 'T-Shirts', color: '#8B5CF6' },
  { id: 2, name: 'Sweatshirts', color: '#3B82F6' },
  { id: 3, name: '3D T Shirts', color: '#22C55E' },
  { id: 4, name: 'Zip Hoodies', color: '#F97316' },
  { id: 5, name: '3D Hoodies', color: '#22C55E' },
  { id: 6, name: 'Hoodies', color: '#F97316' },
  { id: 7, name: 'Zip Hoodies', color: '#8B5CF6' },
  { id: 8, name: 'Custom T-Shirts', color: '#3B82F6' },
  { id: 9, name: 'Long Sleeves', color: '#F97316' },
  { id: 10, name: 'House Flags', color: '#8B5CF6' },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.price.toString().includes(query)
      );
      setFilteredProducts(filtered);
    }
  };

  const handleProductPress = (productId: number) => {
    router.push(`/product-details/Product?id=${productId}`);
  };

  const renderProduct = (product: Product) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleProductPress(product.id)}
    >
      <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
      <Text style={styles.productTitle} numberOfLines={2}>
        {product.title}
      </Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${product.price}</Text>
        {product.originalPrice && (
          <Text style={styles.originalPrice}>${product.originalPrice}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Stack.Screen options={{ headerShown: false }} />

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search designs and products"
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={handleSearch}
            />
            <Camera size={20} color="#0284C7" />
          </View>
          <Ionicons onPress={() => router.push('/')} name="close" size={24} color="#000" />
        </View>

        {/* Trending Searches */}
        <View style={styles.trendingContainer}>
          {TrendingSearches.map((search, index) => (
            <View key={index} style={styles.trendingItem}>
              <TrendingUp size={16} color="#666" />
              <Text style={styles.trendingText}>{search}</Text>
            </View>
          ))}
        </View>

        {/* Today's Special Picks */}
        <View style={styles.specialPicksContainer}>
          <Text style={styles.sectionTitle}>Search</Text>
          <ScrollView horizontal={true} style={styles.specialPicksScroll}>
            <View style={styles.rowsContainer}>
              {/* Hàng 1 */}
              <View style={styles.productRow}>
                {filteredProducts.slice(0, 8).map((product) => renderProduct(product))}
              </View>
              {/* Hàng 2 */}
              <View style={styles.productRow}>
                {filteredProducts.slice(8, 16).map((product) => renderProduct(product))}
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          {Categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryButton, { backgroundColor: category.color }]}
            >
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
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
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 0, // Xóa padding hai bên
    paddingBottom: 16,
  },
  searchContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, // Padding nội tại
    width: '100%',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFA500',
    borderRadius: 25,
    padding: 8,
    backgroundColor: '#fff',
    flex: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  trendingContainer: {
    paddingHorizontal: 16, // Padding nội tại
    marginBottom: 16,
    width: '100%',
  },
  trendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  trendingText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 16,
  },
  specialPicksContainer: {
    paddingHorizontal: 16, // Padding nội tại
    paddingVertical: 16,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  specialPicksScroll: {
    marginBottom: 10,
  },
  rowsContainer: {
    flexDirection: 'column',
  },
  productRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  productCard: {
    width: 150,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },
  productImage: {
    width: 130,
    height: 130,
    borderRadius: 8,
  },
  productTitle: {
    padding: 8,
    fontSize: 14,
    color: '#333',
  },
  priceContainer: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E11D48',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 16,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  categoriesContainer: {
    paddingHorizontal: 16, // Padding nội tại
    paddingVertical: 16,
    gap: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  categoryButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%',
    marginBottom: 10,
  },
  categoryText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});