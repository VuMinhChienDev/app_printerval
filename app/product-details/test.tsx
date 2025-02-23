
// 'use client';

// import { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   Dimensions,
//   ScrollView,
//   TouchableOpacity,
//   SafeAreaView,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import CustomHeader from '../CustomHeader';
// import Footer from '../Footer';
// import { Stack } from 'expo-router';
// import { useSearchParams } from 'expo-router/build/hooks';

// // import ReviewForm from '../Layout/reviews/reviews_copy'
// import Reviews from '../Layout/reviews/shop-review';
// import Chill from '../Layout/chill';
// import { products as Product } from '../Data';

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   originalPrice?: number;
//   imageUrl: string;
//   gender?: string;
// }

// const products: Product[] = Product;
// const { width } = Dimensions.get('window');

// const ProductDetail = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const productId = Number(searchParams.get('id'));

//   const product = products.find((p) => p.id === productId);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [isInWishlist, setIsInWishlist] = useState(false);

//   const [quantity, setQuantity] = useState(1);
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);
//   const [selectedSize, setSelectedSize] = useState<string | null>(null);
//   const [selectedGender, setSelectedGender] = useState<string | null>(null);

//   useEffect(() => {
//     const checkWishlist = async () => {
//       if (!product) return;
//       try {
//         const wishlist = await AsyncStorage.getItem('wishlist');
//         const wishlistItems = wishlist ? JSON.parse(wishlist) : [];
//         const isProductInWishlist = wishlistItems.some((item: Product) => item.id === product.id);
//         setIsInWishlist(isProductInWishlist);
//       } catch (error) {
//         console.error('Error checking wishlist:', error);
//       }
//     };

//     checkWishlist();
//   }, [product]);

//   const handleAddToCart = async () => {
//     if (!product) return;

//     const cartItem = {
//       ...product,
//       quantity,
//       selectedColor,
//       selectedSize,
//       selectedGender,
//     };
//     const toggleFavorite = () => {
//       setIsFavorite((prev) => !prev);
//     };

//     try {
//       const existingCart = await AsyncStorage.getItem('cart');
//       const cart = existingCart ? JSON.parse(existingCart) : [];

//       const existingItemIndex = cart.findIndex((item: Product) => item.id === product.id);

//       if (existingItemIndex !== -1) {
//         cart[existingItemIndex].quantity += quantity;
//       } else {
//         cart.push(cartItem);
//       }

//       await AsyncStorage.setItem('cart', JSON.stringify(cart));
//       router.push('/product-details/Cart/Cartscreen');
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//     }
//   };

//   if (!product) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Text style={styles.notFoundText}>Không tìm thấy sản phẩm.</Text>
//       </SafeAreaView>
//     );
//   }

//   const toggleFavorite = async () => {
//     if (!product) return;

//     try {
//       const wishlist = await AsyncStorage.getItem('wishlist');
//       let wishlistItems = wishlist ? JSON.parse(wishlist) : [];

//       if (isInWishlist) {
//         wishlistItems = wishlistItems.filter((item: Product) => item.id !== product.id);
//       } else {
//         wishlistItems.push(product);
//       }

//       await AsyncStorage.setItem('wishlist', JSON.stringify(wishlistItems));
//       setIsInWishlist(!isInWishlist);

//       // Log để kiểm tra
//       console.log('Wishlist sau khi cập nhật:', wishlistItems);
//     } catch (error) {
//       console.error('Error updating wishlist:', error);
//     }
//   };

//   const navigateToWishlist = () => {
//     router.push('/product-details/wishlist/WishlistScreen');
//   };

//   return (
//     <SafeAreaView>
//       <View style={styles.CustomHeader}>
//         <CustomHeader />
//       </View>
//       <ScrollView
//         contentContainerStyle={{ ...styles.scrollContainer, flexGrow: 1, paddingBottom: 100 }}
//       >
//         <Stack.Screen
//           options={{ headerShown: false }} // Ẩn header mặc định
//         />

//         <View style={styles.imageContainer}>
//           <Image source={{ uri: product.imageUrl }} style={styles.image} resizeMode='cover' />
//           <TouchableOpacity style={styles.favoriteIcon} onPress={toggleFavorite}>
//             <Ionicons
//               name={isInWishlist ? 'heart' : 'heart-outline'}
//               size={30}
//               color={isInWishlist ? 'red' : 'gray'}
//             />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.content}>
//           <Text style={styles.title}>{product.title}</Text>
//           <View style={styles.priceContainer}>
//             <Text style={styles.price}>${product.price.toFixed(2)}</Text>
//             {product.originalPrice && (
//               <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
//             )}
//           </View>

//           <View style={styles.optionContainer}>
//             <Text style={styles.optionLabel}>Màu sắc:</Text>
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={styles.optionList}
//             >
//               {['#3498db', '#e74c3c', '#9b59b6', '#f1c40f'].map((color) => (
//                 <TouchableOpacity
//                   key={color}
//                   onPress={() => setSelectedColor(color)}
//                   style={[
//                     styles.colorOption,
//                     { backgroundColor: color },
//                     selectedColor === color && styles.selectedOption,
//                   ]}
//                 >
//                   {selectedColor === color && <Ionicons name='checkmark' size={20} color='white' />}
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </View>

//           <View style={styles.optionContainer}>
//             <Text style={styles.optionLabel}>Giới tính:</Text>
//             <View style={styles.optionList}>
//               {['Nam', 'Nữ', 'Unisex'].map((gender) => (
//                 <TouchableOpacity
//                   key={gender}
//                   onPress={() => setSelectedGender(gender)}
//                   style={[styles.genderOption, selectedGender === gender && styles.selectedOption]}
//                 >
//                   <Text
//                     style={[
//                       styles.genderText,
//                       selectedGender === gender && styles.selectedOptionText,
//                     ]}
//                   >
//                     {gender}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>

//           <View style={styles.optionContainer}>
//             <Text style={styles.optionLabel}>Kích thước:</Text>
//             <View style={styles.optionList}>
//               {['S', 'M', 'L', 'XL'].map((size) => (
//                 <TouchableOpacity
//                   key={size}
//                   onPress={() => setSelectedSize(size)}
//                   style={[styles.sizeOption, selectedSize === size && styles.selectedOption]}
//                 >
//                   <Text
//                     style={[styles.sizeText, selectedSize === size && styles.selectedOptionText]}
//                   >
//                     {size}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>

//           <View style={styles.quantityContainer}>
//             <Text style={styles.optionLabel}>Số lượng:</Text>
//             <View style={styles.quantityWrapper}>
//               <TouchableOpacity
//                 onPress={() => setQuantity((prev) => Math.max(prev - 1, 1))}
//                 style={styles.quantityButton}
//               >
//                 <Ionicons name='remove' size={24} color='#333' />
//               </TouchableOpacity>
//               <Text style={styles.quantityText}>{quantity}</Text>
//               <TouchableOpacity
//                 onPress={() => setQuantity((prev) => prev + 1)}
//                 style={styles.quantityButton}
//               >
//                 <Ionicons name='add' size={24} color='#333' />
//               </TouchableOpacity>
//             </View>
//           </View>

//           <TouchableOpacity style={styles.addCartButton} onPress={handleAddToCart}>
//             <Ionicons name='cart-outline' size={24} color='white' style={styles.cartIcon} />
//             <Text style={styles.addCartButtonText}>Thêm vào giỏ hàng</Text>
//           </TouchableOpacity>
         
//           {/* <View>
//             <ReviewForm/>
//           </View>
//             */}
//           <View>
//             <Reviews />
//           </View>

//           <View>
//             <Chill />
//           </View>
//         </View>

//         <Footer />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//   },

//   scrollContainer: {
//     flexGrow: 1,
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
//   },
//   imageContainer: {
//     width: width,
//     height: 400,
//     overflow: 'hidden',
//   },
//   image: {
//     flex: 1,

//     alignItems: 'center',
//     justifyContent: 'center',
//     marginHorizontal: 16,
//   },
//   content: {
//     padding: 20,
//     backgroundColor: 'white',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     marginTop: -30,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   price: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#ff6600',
//   },
//   originalPrice: {
//     fontSize: 18,
//     color: 'gray',
//     textDecorationLine: 'line-through',
//     marginLeft: 10,
//   },
//   notFoundText: {
//     fontSize: 18,
//     color: 'red',
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   optionContainer: {
//     marginBottom: 20,
//   },
//   optionLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//   },
//   optionList: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   colorOption: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   genderOption: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     marginRight: 10,
//     marginBottom: 10,
//   },
//   sizeOption: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//     marginBottom: 10,
//   },
//   selectedOption: {
//     borderColor: '#ff6600',
//     borderWidth: 2,
//   },
//   genderText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   sizeText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   selectedOptionText: {
//     color: '#ff6600',
//   },
//   quantityContainer: {
//     marginBottom: 20,
//   },
//   quantityWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 25,
//     overflow: 'hidden',
//   },
//   quantityButton: {
//     padding: 10,
//     backgroundColor: '#f0f0f0',
//   },
//   quantityText: {
//     paddingHorizontal: 20,
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   addCartButton: {
//     backgroundColor: '#ff6600',
//     padding: 15,
//     borderRadius: 30,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cartIcon: {
//     marginRight: 10,
//   },
//   addCartButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   favoriteIcon: {
//     position: 'absolute',
//     top: 20,
//     right: 20,
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     padding: 8,
//     borderRadius: 20,
//   },
// });

// export default ProductDetail;