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
//   TextInput,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import CustomHeader from '../CustomHeader';
// import Footer from '../Footer';
// import { Stack } from 'expo-router';
// import { useSearchParams } from 'expo-router/build/hooks';

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

// interface Comment {
//   id: number;
//   text: string;
//   date: string;
//   rating: number; // Thuộc tính đánh giá (1-5 sao)
// }

// const { width } = Dimensions.get('window');

// const ProductDetail = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const productId = Number(searchParams.get('id'));

//   const product = Product.find((p) => p.id === productId);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [isInWishlist, setIsInWishlist] = useState(false);

//   const [quantity, setQuantity] = useState(1);
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);
//   const [selectedSize, setSelectedSize] = useState<string | null>(null);
//   const [selectedGender, setSelectedGender] = useState<string | null>(null);

//   const [comments, setComments] = useState<Comment[]>([]);
//   const [newComment, setNewComment] = useState('');
//   const [newRating, setNewRating] = useState(0);
//   const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
//   const [editText, setEditText] = useState('');
//   const [editRating, setEditRating] = useState(0);

//   useEffect(() => {
//     const checkWishlist = async () => {
//       if (!product) return;
//       try {
//         const wishlist = await AsyncStorage.getItem('wishlist');
//         const wishlistItems = wishlist ? JSON.parse(wishlist) : [];
//         const isProductInWishlist = wishlistItems.some((item: Product) => item.id === product.id);
//         setIsInWishlist(isProductInWishlist);
//       } catch (error) {
//         console.error('Lỗi khi kiểm tra danh sách yêu thích:', error);
//       }
//     };

//     checkWishlist();

//     const loadComments = async () => {
//       try {
//         const savedComments = await AsyncStorage.getItem(`comments_${productId}`);
//         if (savedComments) {
//           setComments(JSON.parse(savedComments));
//         }
//       } catch (error) {
//         console.error('Lỗi khi tải bình luận:', error);
//       }
//     };

//     loadComments();
//   }, [product, productId]);

//   const handleAddToCart = async () => {
//     if (!product) return;

//     const cartItem = {
//       ...product,
//       quantity,
//       selectedColor,
//       selectedSize,
//       selectedGender,
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
//       console.error('Lỗi khi thêm vào giỏ hàng:', error);
//     }
//   };

//   const toggleFavorite = async () => {
//     if (!product) return;

//     try {
//       const wishlist = await AsyncStorage.getItem('wishlist');
//       let wishlistItems = wishlist ? JSON.parse(wishlist) : [];

//       const wishlistItem = {
//         id: product.id,
//         title: product.title,
//         price: product.price,
//         originalPrice: product.originalPrice,
//         imageUrl: product.imageUrl,
//       };

//       if (isInWishlist) {
//         wishlistItems = wishlistItems.filter((item: Product) => item.id !== product.id);
//       } else {
//         wishlistItems.push(wishlistItem);
//       }

//       await AsyncStorage.setItem('wishlist', JSON.stringify(wishlistItems));
//       setIsInWishlist(!isInWishlist);

//       console.log('Danh sách yêu thích sau khi cập nhật:', wishlistItems);
//     } catch (error) {
//       console.error('Lỗi khi cập nhật danh sách yêu thích:', error);
//     }
//   };

//   const handleAddComment = async () => {
//     if (newComment.trim() === '' || newRating === 0) return;

//     const comment = {
//       id: Date.now(),
//       text: newComment,
//       date: new Date().toISOString(),
//       rating: newRating,
//     };

//     const updatedComments = [...comments, comment];
//     setComments(updatedComments);
//     setNewComment('');
//     setNewRating(0);

//     try {
//       await AsyncStorage.setItem(`comments_${productId}`, JSON.stringify(updatedComments));
//     } catch (error) {
//       console.error('Lỗi khi lưu bình luận:', error);
//     }
//   };

//   const handleEditComment = (comment: Comment) => {
//     setEditingCommentId(comment.id);
//     setEditText(comment.text);
//     setEditRating(comment.rating);
//   };

//   const handleUpdateComment = async (commentId: number) => {
//     if (editText.trim() === '' || editRating === 0) return;

//     const updatedComments = comments.map((comment) =>
//       comment.id === commentId
//         ? { ...comment, text: editText, rating: editRating, date: new Date().toISOString() }
//         : comment
//     );

//     setComments(updatedComments);
//     setEditingCommentId(null);
//     setEditText('');
//     setEditRating(0);

//     try {
//       await AsyncStorage.setItem(`comments_${productId}`, JSON.stringify(updatedComments));
//     } catch (error) {
//       console.error('Lỗi khi cập nhật bình luận:', error);
//     }
//   };

//   const handleDeleteComment = async (commentId: number) => {
//     const updatedComments = comments.filter((comment) => comment.id !== commentId);
//     setComments(updatedComments);

//     try {
//       await AsyncStorage.setItem(`comments_${productId}`, JSON.stringify(updatedComments));
//     } catch (error) {
//       console.error('Lỗi khi xóa bình luận:', error);
//     }
//   };

//   const renderStars = (rating: number, onPress?: (rating: number) => void) => {
//     return (
//       <View style={styles.starContainer}>
//         {[1, 2, 3, 4, 5].map((star) => (
//           <TouchableOpacity
//             key={star}
//             onPress={onPress ? () => onPress(star) : undefined}
//             disabled={!onPress}
//           >
//             <Ionicons
//               name={star <= rating ? 'star' : 'star-outline'}
//               size={20}
//               color={star <= rating ? '#FFD700' : '#ccc'}
//             />
//           </TouchableOpacity>
//         ))}
//       </View>
//     );
//   };

//   if (!product) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Text style={styles.notFoundText}>Không tìm thấy sản phẩm.</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView>
//       <View style={styles.CustomHeader}>
//         <CustomHeader />
//       </View>
//       <ScrollView
//         contentContainerStyle={{ ...styles.scrollContainer, flexGrow: 1, paddingBottom: 100 }}
//       >
//         <Stack.Screen options={{ headerShown: false }} />

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

//           <View style={styles.commentSection}>
//             <Text style={styles.commentTitle}>Bình luận</Text>
//             {comments.map((comment) => (
//               <View key={comment.id} style={styles.commentItem}>
//                 {editingCommentId === comment.id ? (
//                   <>
//                     <TextInput
//                       style={styles.commentInput}
//                       value={editText}
//                       onChangeText={setEditText}
//                       multiline
//                     />
//                     {renderStars(editRating, setEditRating)}
//                     <View style={styles.editButtonsContainer}>
//                       <TouchableOpacity
//                         style={styles.saveButton}
//                         onPress={() => handleUpdateComment(comment.id)}
//                       >
//                         <Text style={styles.buttonText}>Lưu</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity
//                         style={styles.cancelButton}
//                         onPress={() => setEditingCommentId(null)}
//                       >
//                         <Text style={styles.buttonText}>Hủy</Text>
//                       </TouchableOpacity>
//                     </View>
//                   </>
//                 ) : (
//                   <>
//                     <Text style={styles.commentText}>{comment.text}</Text>
//                     {renderStars(comment.rating)}
//                     <Text style={styles.commentDate}>
//                       {new Date(comment.date).toLocaleString()}
//                     </Text>
//                     <View style={styles.commentActions}>
//                       <TouchableOpacity onPress={() => handleEditComment(comment)}>
//                         <Ionicons name='pencil' size={20} color='#666' />
//                       </TouchableOpacity>
//                       <TouchableOpacity onPress={() => handleDeleteComment(comment.id)}>
//                         <Ionicons name='trash' size={20} color='#ff4444' />
//                       </TouchableOpacity>
//                     </View>
//                   </>
//                 )}
//               </View>
//             ))}
//             <View style={styles.addCommentContainer}>
//               <TextInput
//                 style={styles.commentInput}
//                 value={newComment}
//                 onChangeText={setNewComment}
//                 placeholder='Thêm bình luận...'
//                 multiline
//               />
//               {renderStars(newRating, setNewRating)}
//               <TouchableOpacity style={styles.addCommentButton} onPress={handleAddComment}>
//                 <Text style={styles.addCommentButtonText}>Đăng</Text>
//               </TouchableOpacity>
//             </View>
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
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 10,
//     padding: 5,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 4,
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
//   commentSection: {
//     marginTop: 20,
//     paddingTop: 20,
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//   },
//   commentTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   commentItem: {
//     backgroundColor: '#f9f9f9',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   commentText: {
//     fontSize: 14,
//   },
//   commentDate: {
//     fontSize: 12,
//     color: '#888',
//     marginTop: 5,
//   },
//   commentActions: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     gap: 15,
//     marginTop: 5,
//   },
//   addCommentContainer: {
//     marginTop: 10,
//   },
//   commentInput: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 8,
//     marginRight: 10,
//   },
//   inputButtonWrapper: {
//     // Đưa TextInput và nút Đăng vào hàng ngang
//     alignItems: 'center',
//     marginTop: 5, // Khoảng cách giữa sao và TextInput
//   },
//   addCommentButton: {
//     backgroundColor: '#ff6600',
//     padding: 10,
//     borderRadius: 5,
//   },
//   addCommentButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16, // Kích thước chữ
//     textAlign: 'center',
//   },
//   starContainer: {
//     flexDirection: 'row',
//     marginVertical: 5,
//   },
//   editButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     gap: 10,
//     marginTop: 10,
//   },
//   saveButton: {
//     backgroundColor: '#ff6600',
//     padding: 8,
//     borderRadius: 5,
//   },
//   cancelButton: {
//     backgroundColor: '#666',
//     padding: 8,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default ProductDetail;
'use client';

import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'; // Thêm để chọn hình ảnh

import CustomHeader from '../CustomHeader';
import Footer from '../Footer';
import { Stack } from 'expo-router';
import { useSearchParams } from 'expo-router/build/hooks';
import Chill from '../Layout/chill';
import { products as Product } from '../Data';

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  gender?: string;
}

interface Comment {
  id: number;
  text: string;
  date: string;
  rating: number;
  image?: string; // Thêm trường để lưu URL hình ảnh
}

const { width } = Dimensions.get('window');

const ProductDetail = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = Number(searchParams.get('id'));

  const product = Product.find((p) => p.id === productId);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [newImage, setNewImage] = useState<string | null>(null); // State cho hình ảnh mới
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [editRating, setEditRating] = useState(0);
  const [editImage, setEditImage] = useState<string | null>(null); // State cho hình ảnh khi chỉnh sửa

  useEffect(() => {
    const checkWishlist = async () => {
      if (!product) return;
      try {
        const wishlist = await AsyncStorage.getItem('wishlist');
        const wishlistItems = wishlist ? JSON.parse(wishlist) : [];
        const isProductInWishlist = wishlistItems.some((item: Product) => item.id === product.id);
        setIsInWishlist(isProductInWishlist);
      } catch (error) {
        console.error('Lỗi khi kiểm tra danh sách yêu thích:', error);
      }
    };

    checkWishlist();

    const loadComments = async () => {
      try {
        const savedComments = await AsyncStorage.getItem(`comments_${productId}`);
        if (savedComments) {
          setComments(JSON.parse(savedComments));
        }
      } catch (error) {
        console.error('Lỗi khi tải bình luận:', error);
      }
    };

    loadComments();
  }, [product, productId]);

  const pickImage = async (setImage: (uri: string | null) => void) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Cần quyền truy cập thư viện ảnh!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;

    const cartItem = {
      ...product,
      quantity,
      selectedColor,
      selectedSize,
      selectedGender,
    };

    try {
      const existingCart = await AsyncStorage.getItem('cart');
      const cart = existingCart ? JSON.parse(existingCart) : [];
      const existingItemIndex = cart.findIndex((item: Product) => item.id === product.id);

      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
      } else {
        cart.push(cartItem);
      }

      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      router.push('/product-details/Cart/Cartscreen');
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng:', error);
    }
  };

  const toggleFavorite = async () => {
    if (!product) return;

    try {
      const wishlist = await AsyncStorage.getItem('wishlist');
      let wishlistItems = wishlist ? JSON.parse(wishlist) : [];

      const wishlistItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        originalPrice: product.originalPrice,
        imageUrl: product.imageUrl,
      };

      if (isInWishlist) {
        wishlistItems = wishlistItems.filter((item: Product) => item.id !== product.id);
      } else {
        wishlistItems.push(wishlistItem);
      }

      await AsyncStorage.setItem('wishlist', JSON.stringify(wishlistItems));
      setIsInWishlist(!isInWishlist);
    } catch (error) {
      console.error('Lỗi khi cập nhật danh sách yêu thích:', error);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === '' || newRating === 0) return;

    const comment: Comment = {
      id: Date.now(),
      text: newComment,
      date: new Date().toISOString(),
      rating: newRating,
      image: newImage || undefined,
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    setNewComment('');
    setNewRating(0);
    setNewImage(null);

    try {
      await AsyncStorage.setItem(`comments_${productId}`, JSON.stringify(updatedComments));
    } catch (error) {
      console.error('Lỗi khi lưu bình luận:', error);
    }
  };

  const handleEditComment = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditText(comment.text);
    setEditRating(comment.rating);
    setEditImage(comment.image || null);
  };

  const handleUpdateComment = async (commentId: number) => {
    if (editText.trim() === '' || editRating === 0) return;

    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, text: editText, rating: editRating, image: editImage || undefined, date: new Date().toISOString() }
        : comment
    );

    setComments(updatedComments);
    setEditingCommentId(null);
    setEditText('');
    setEditRating(0);
    setEditImage(null);

    try {
      await AsyncStorage.setItem(`comments_${productId}`, JSON.stringify(updatedComments));
    } catch (error) {
      console.error('Lỗi khi cập nhật bình luận:', error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    setComments(updatedComments);

    try {
      await AsyncStorage.setItem(`comments_${productId}`, JSON.stringify(updatedComments));
    } catch (error) {
      console.error('Lỗi khi xóa bình luận:', error);
    }
  };

  const renderStars = (rating: number, onPress?: (rating: number) => void) => {
    return (
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={onPress ? () => onPress(star) : undefined}
            disabled={!onPress}
          >
            <Ionicons
              name={star <= rating ? 'star' : 'star-outline'}
              size={20}
              color={star <= rating ? '#FFD700' : '#ccc'}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFoundText}>Không tìm thấy sản phẩm.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.CustomHeader}>
        <CustomHeader />
      </View>
      <ScrollView
        contentContainerStyle={{ ...styles.scrollContainer, flexGrow: 1, paddingBottom: 100 }}
      >
        <Stack.Screen options={{ headerShown: false }} />

        <View style={styles.imageContainer}>
          <Image source={{ uri: product.imageUrl }} style={styles.image} resizeMode='cover' />
          <TouchableOpacity style={styles.favoriteIcon} onPress={toggleFavorite}>
            <Ionicons
              name={isInWishlist ? 'heart' : 'heart-outline'}
              size={30}
              color={isInWishlist ? 'red' : 'gray'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{product.title}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
            )}
          </View>

          <View style={styles.optionContainer}>
            <Text style={styles.optionLabel}>Màu sắc:</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.optionList}
            >
              {['#3498db', '#e74c3c', '#9b59b6', '#f1c40f'].map((color) => (
                <TouchableOpacity
                  key={color}
                  onPress={() => setSelectedColor(color)}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    selectedColor === color && styles.selectedOption,
                  ]}
                >
                  {selectedColor === color && <Ionicons name='checkmark' size={20} color='white' />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.optionContainer}>
            <Text style={styles.optionLabel}>Giới tính:</Text>
            <View style={styles.optionList}>
              {['Nam', 'Nữ', 'Unisex'].map((gender) => (
                <TouchableOpacity
                  key={gender}
                  onPress={() => setSelectedGender(gender)}
                  style={[styles.genderOption, selectedGender === gender && styles.selectedOption]}
                >
                  <Text
                    style={[
                      styles.genderText,
                      selectedGender === gender && styles.selectedOptionText,
                    ]}
                  >
                    {gender}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.optionContainer}>
            <Text style={styles.optionLabel}>Kích thước:</Text>
            <View style={styles.optionList}>
              {['S', 'M', 'L', 'XL'].map((size) => (
                <TouchableOpacity
                  key={size}
                  onPress={() => setSelectedSize(size)}
                  style={[styles.sizeOption, selectedSize === size && styles.selectedOption]}
                >
                  <Text
                    style={[styles.sizeText, selectedSize === size && styles.selectedOptionText]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.quantityContainer}>
            <Text style={styles.optionLabel}>Số lượng:</Text>
            <View style={styles.quantityWrapper}>
              <TouchableOpacity
                onPress={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                style={styles.quantityButton}
              >
                <Ionicons name='remove' size={24} color='#333' />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => setQuantity((prev) => prev + 1)}
                style={styles.quantityButton}
              >
                <Ionicons name='add' size={24} color='#333' />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.addCartButton} onPress={handleAddToCart}>
            <Ionicons name='cart-outline' size={24} color='white' style={styles.cartIcon} />
            <Text style={styles.addCartButtonText}>Thêm vào giỏ hàng</Text>
          </TouchableOpacity>

          <View style={styles.commentSection}>
            <Text style={styles.commentTitle}>Bình luận</Text>
            {comments.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                {editingCommentId === comment.id ? (
                  <>
                    <TextInput
                      style={styles.commentInput}
                      value={editText}
                      onChangeText={setEditText}
                      multiline
                    />
                    {editImage && <Image source={{ uri: editImage }} style={styles.commentImage} />}
                    <TouchableOpacity
                      style={styles.uploadButton}
                      onPress={() => pickImage(setEditImage)}
                    >
                      <Text style={styles.uploadButtonText}>Chọn hình ảnh</Text>
                    </TouchableOpacity>
                    {renderStars(editRating, setEditRating)}
                    <View style={styles.editButtonsContainer}>
                      <TouchableOpacity
                        style={styles.saveButton}
                        onPress={() => handleUpdateComment(comment.id)}
                      >
                        <Text style={styles.buttonText}>Lưu</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => setEditingCommentId(null)}
                      >
                        <Text style={styles.buttonText}>Hủy</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <>
                    <Text style={styles.commentText}>{comment.text}</Text>
                    {comment.image && <Image source={{ uri: comment.image }} style={styles.commentImage} />}
                    {renderStars(comment.rating)}
                    <Text style={styles.commentDate}>
                      {new Date(comment.date).toLocaleString()}
                    </Text>
                    <View style={styles.commentActions}>
                      <TouchableOpacity onPress={() => handleEditComment(comment)}>
                        <Ionicons name='pencil' size={20} color='#666' />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleDeleteComment(comment.id)}>
                        <Ionicons name='trash' size={20} color='#ff4444' />
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            ))}
            <View style={styles.addCommentContainer}>
              <TextInput
                style={styles.commentInput}
                value={newComment}
                onChangeText={setNewComment}
                placeholder='Thêm bình luận...'
                multiline
              />
              {newImage && <Image source={{ uri: newImage }} style={styles.commentImage} />}
              <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage(setNewImage)}>
                <Text style={styles.uploadButtonText}>Chọn hình ảnh</Text>
              </TouchableOpacity>
              {renderStars(newRating, setNewRating)}
              <TouchableOpacity style={styles.addCommentButton} onPress={handleAddComment}>
                <Text style={styles.addCommentButtonText}>Đăng</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Chill />
          </View>
        </View>

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  CustomHeader: {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    padding: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageContainer: {
    width: width,
    height: 400,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  content: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6600',
  },
  originalPrice: {
    fontSize: 18,
    color: 'gray',
    textDecorationLine: 'line-through',
    marginLeft: 10,
  },
  notFoundText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  optionContainer: {
    marginBottom: 20,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  optionList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderOption: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    marginBottom: 10,
  },
  sizeOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedOption: {
    borderColor: '#ff6600',
    borderWidth: 2,
  },
  genderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  sizeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedOptionText: {
    color: '#ff6600',
  },
  quantityContainer: {
    marginBottom: 20,
  },
  quantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    overflow: 'hidden',
  },
  quantityButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  quantityText: {
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  addCartButton: {
    backgroundColor: '#ff6600',
    padding: 15,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIcon: {
    marginRight: 10,
  },
  addCartButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 8,
    borderRadius: 20,
  },
  commentSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  commentText: {
    fontSize: 14,
  },
  commentImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  commentDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  commentActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
    marginTop: 5,
  },
  addCommentContainer: {
    marginTop: 10,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: '#3498db',
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addCommentButton: {
    backgroundColor: '#ff6600',
    padding: 10,
    borderRadius: 5,
  },
  addCommentButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  editButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#ff6600',
    padding: 8,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#666',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProductDetail;