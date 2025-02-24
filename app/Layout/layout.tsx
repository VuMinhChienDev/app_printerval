// import React from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';
// import Footer from '../Footer';
// import { Stack } from 'expo-router';
// import CustomHeader from '../CustomHeader';
// import { Layout } from 'lucide-react-native';

// const { width } = Dimensions.get('window');

// const LayoutProduct = () => {
//   const categories = ['T-Shirts', 'Sweatshirts', 'Hoodies', 'Calendars'];

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.CustomHeader}>
//                 <CustomHeader />
//               </View >
//       <ScrollView>
//           <Stack.Screen
         
//                 options={{ headerShown: false }} // Ẩn header mặc định
//               />
//         {/* Hero Banner */}
//         <View style={styles.banner}>
//           <Image
//             source={{ uri: 'https://cdn.printerval.com/unsafe/960x0/asset.prtvstatic.com/2025/02/13/valentine-3-af36c87001ac3fc24a89494bba920d31.jpg' }}
//             style={styles.bannerImage}
//             resizeMode="cover"
//           />
//         </View>

//         {/* Sale Text */}
//         <Text style={styles.saleText}>Sale Up to 10%</Text>

//         {/* Main Heading */}
//         <Text style={styles.heading}>
//           Happy 2025 New Year's Gift Ideas to Your Loved Ones
//         </Text>

//         {/* CTA Button */}
//         <TouchableOpacity style={styles.ctaButton}>
//           <Text style={styles.ctaText}>
//             Happy New Year - Customize your Shirt
//           </Text>
//         </TouchableOpacity>

//         {/* Shopping Section */}
//         <View style={styles.shoppingSection}>
//           <Text style={styles.sectionTitle}>
//             Best Items for Back to School Shopping
//           </Text>

//           {/* Categories */}
//           <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
//             {categories.map((category, index) => (
//               <TouchableOpacity 
//                 key={category}
//                 style={[
//                   styles.categoryTab,
//                   index === 0 && styles.activeTab
//                 ]}
//               >
//                 <Text style={[
//                   styles.categoryText,
//                   index === 0 && styles.activeText
//                 ]}>
//                   {category}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>

//           {/* Product Grid */}
//           <View style={styles.productGrid}>
//             {[1, 2].map((item) => (
//               <View key={item} style={styles.productCard}>
//                 <Image
//                   source={{ uri: '' }}
//                   style={styles.productImage}
//                   resizeMode="cover"
//                 />
//                 <Text style={styles.productTitle}>
//                   Happy New Year 2025 ...
//                 </Text>
//               </View>
//             ))}
//           </View>
//         </View>
//         <View>
//           <Footer />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   banner: {
//     width: '100%',
//     height: 200,
//     backgroundColor: '#1a1a1a',
//   },
//   CustomHeader: {

//     top: 0, // Gắn vào mép trên màn hình
//     left: 0,
//     right: 0,
//     zIndex: 10, // Đảm bảo header luôn hiển thị trên cùng
//     padding: 5,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 4, // Hiệu ứng đổ bóng trên Android
//     alignItems: 'center',
//     flexDirection: 'row', 
//     justifyContent: 'center',
//     marginTop: 15, // Lùi xuống 10px
//   },
//   bannerImage: {
//     width: '100%',
//     height: '100%',
//   },
//   saleText: {
//     fontSize: 24,
//     textAlign: 'center',
//     marginVertical: 20,
//   },
//   heading: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#1a1a1a',
//     paddingHorizontal: 20,
//     marginBottom: 20,
//   },
//   ctaButton: {
//     backgroundColor: '#6c5ce7',
//     padding: 15,
//     marginHorizontal: 20,
//     borderRadius: 8,
//     marginBottom: 30,
//   },
//   ctaText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   shoppingSection: {
//     padding: 20,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#1a1a1a',
//     marginBottom: 20,
//   },
//   categoriesScroll: {
//     marginBottom: 20,
//   },
//   categoryTab: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     marginRight: 10,
//   },
//   activeTab: {
//     borderBottomWidth: 2,
//     borderBottomColor: '#ff6b6b',
//   },
//   categoryText: {
//     fontSize: 16,
//     color: '#666',
//   },
//   activeText: {
//     color: '#ff6b6b',
//     fontWeight: '600',
//   },
//   productGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   productCard: {
//     width: (width - 60) / 2,
//     marginBottom: 20,
//   },
//   productImage: {
//     width: '100%',
//     height: 180,
//     borderRadius: 8,
//     backgroundColor: '#f0f0f0',
//   },
//   productTitle: {
//     marginTop: 10,
//     fontSize: 14,
//     color: '#1a1a1a',
//   },
// });

// export default LayoutProduct;