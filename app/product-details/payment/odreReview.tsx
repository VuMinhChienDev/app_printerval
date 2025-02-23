


// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
// import { Feather, Ionicons } from '@expo/vector-icons';
// import { useLocalSearchParams } from 'expo-router';

// const colors = [
//   { id: 'black', color: '#000000' },
//   { id: 'white', color: '#FFFFFF' },
//   { id: 'red', color: '#DC2626' },
//   { id: 'blue', color: '#2563EB' },
//   { id: 'purple', color: '#7C3AED' },
// ];

// export default function OrderReview() {
//   const params = useLocalSearchParams();
//   const cartItems = params.cartItems ? JSON.parse(params.cartItems as string) : [];
  
//   // Lấy ảnh từ cartItems nếu có, nếu không giữ nguyên ảnh mặc định
//   const initialImage = cartItems.length > 0 && cartItems[0].imageUrl 
//     ? cartItems[0].imageUrl 
//     : '';

//   const [showProductDetails, setShowProductDetails] = useState(false);
//   const [selectedColor, setSelectedColor] = useState('black');
//   const [quantity, setQuantity] = useState(2);
//   const [isChecked, setIsChecked] = useState(false);
//   const [productImage, setProductImage] = useState<string | null>(initialImage);

//   const product = {
//     title: 'The Courage Baseball Caps',
//     subtitle: 'Black, Unisex',
//     price: 16.99,
//     originalPrice: 25.95,
//   };
//   const additionalCost = 2.99;
//   const baseTotal = (product.price * quantity).toFixed(2);
//   const totalPrice = isChecked ? (parseFloat(baseTotal) + additionalCost).toFixed(2) : baseTotal;

//   const handleEditPress = () => {
//     setShowProductDetails(true);
//   };

//   const handleRemoveProduct = () => {
//     setProductImage(null);
//   };

//   const handleAddImage = () => {
//     setProductImage('https://via.placeholder.com/150');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Xem lại đơn hàng</Text>

//       {productImage ? (
//         <View style={styles.productCard}>
//           <View style={styles.productRow}>
//             <Image source={{ uri: productImage }} style={styles.productImage} />
//             <View style={styles.productInfo}>
//               <Text style={styles.productTitle}>{product.title}</Text>
//               <Text style={styles.productSubtitle}>{product.subtitle}</Text>
//               <View style={styles.actionRow}>
//                 <TouchableOpacity style={styles.actionButton} onPress={handleEditPress}>
//                   <Feather name="edit" size={16} color="#4A90E2" />
//                   <Text style={styles.actionText}>Chỉnh sửa</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.actionButton} onPress={handleRemoveProduct}>
//                   <Feather name="trash-2" size={16} color="#9B9B9B" />
//                   <Text style={[styles.actionText, styles.removeText]}>Xóa</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>

//           <View style={styles.priceRow}>
//             <Text style={styles.price}>${product.price.toFixed(2)}</Text>
//             <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
//             <Text style={styles.multiply}>×</Text>
//             <Text style={styles.quantity}>{quantity}</Text>
//             <Text style={styles.totalPrice}>${totalPrice}</Text>
//           </View>

//           <TouchableOpacity style={styles.downloadRow} onPress={() => setIsChecked(!isChecked)}>
//             <View style={styles.checkbox}>
//               {isChecked && <Ionicons name="checkmark" size={14} color="#F5A623" />}
//             </View>
//             <View>
//               <Text style={styles.downloadText}>Yêu thích thiết kế này?</Text>
//               <Text style={styles.downloadSubtext}>Tải xuống tệp thiết kế gốc. +${additionalCost.toFixed(2)}</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       ) : null}

//       <Modal
//         transparent={true}
//         animationType="slide"
//         visible={showProductDetails}
//         onRequestClose={() => setShowProductDetails(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <ScrollView style={styles.modalContainer}>
//             <TouchableOpacity style={styles.closeIcon} onPress={() => setShowProductDetails(false)}>
//               <Ionicons name="close" size={24} color="#666" />
//             </TouchableOpacity>

//             {productImage ? (
//               <Image source={{ uri: productImage }} style={styles.modalImage} resizeMode="contain" />
//             ) : (
//               <View style={styles.modalPlaceholderImage}>
//                 <Text style={styles.placeholderText}>No image</Text>
//                 <TouchableOpacity style={styles.addImageButton} onPress={handleAddImage}>
//                   <Text style={styles.addImageText}>add image</Text>
//                 </TouchableOpacity>
//               </View>
//             )}

//             <View style={styles.modalContent}>
//               <Text style={styles.modalTitle}>{product.title}</Text>

//               <View style={styles.priceContainer}>
//                 <Text style={styles.modalPrice}>${product.price.toFixed(2)}</Text>
//                 <Text style={styles.modalOriginalPrice}>${product.originalPrice.toFixed(2)}</Text>
//                 <Text style={styles.modalTotalPrice}>${totalPrice}</Text>
//               </View>

//               <View style={styles.quantityContainer}>
//                 <TouchableOpacity
//                   onPress={() => quantity > 1 && setQuantity(quantity - 1)}
//                   style={styles.quantityButton}
//                 >
//                   <Text style={styles.quantityButtonText}>-</Text>
//                 </TouchableOpacity>
//                 <Text style={styles.quantityText}>{quantity}</Text>
//                 <TouchableOpacity
//                   onPress={() => setQuantity(quantity + 1)}
//                   style={styles.quantityButton}
//                 >
//                   <Text style={styles.quantityButtonText}>+</Text>
//                 </TouchableOpacity>
//               </View>

//               <Text style={styles.colorLabel}>
//                 Màu sắc: {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}
//               </Text>
//               <View style={styles.colorContainer}>
//                 {colors.map((color) => (
//                   <TouchableOpacity
//                     key={color.id}
//                     style={[
//                       styles.colorOption,
//                       { backgroundColor: color.color },
//                       selectedColor === color.id && styles.selectedColor,
//                     ]}
//                     onPress={() => setSelectedColor(color.id)}
//                   >
//                     {selectedColor === color.id && <View style={styles.checkmark} />}
//                   </TouchableOpacity>
//                 ))}
//               </View>

//               <View style={styles.buttonRow}>
//                 <TouchableOpacity style={styles.updateButton}>
//                   <Text style={styles.updateButtonText}>update item</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.closeButton}
               
//                 >
//                   <Text style={styles.closeButtonText}>add item</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </ScrollView>
//         </View>
//       </Modal>

//       <View style={styles.shippingCard}>
//         <View style={styles.shippingHeader}>
//           <Feather name="truck" size={20} color="#4A90E2" />
//           <Text style={styles.shippingTitle}>Vận chuyển tiêu chuẩn</Text>
//           <Text style={styles.shippingPrice}>$7.99</Text>
//           <Feather name="chevron-down" size={20} color="#9B9B9B" />
//         </View>
//         <Text style={styles.shippingDays}>5 - 17 ngày làm việc với mã theo dõi</Text>
//       </View>

//       <TouchableOpacity style={styles.moreOptions}>
//         <Feather name="truck" size={20} color="#4A90E2" />
//         <Text style={styles.moreOptionsText}>Bạn có 2 lựa chọn giao hàng khác</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// // Giữ nguyên styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#F8F9FA',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   productCard: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 16,
//   },
//   productRow: {
//     flexDirection: 'row',
//     marginBottom: 16,
//   },
//   productImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 4,
//   },
//   placeholderImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 4,
//     backgroundColor: '#f5f5f5',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   productInfo: {
//     marginLeft: 12,
//     flex: 1,
//   },
//   productTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   productSubtitle: {
//     color: '#666',
//     marginBottom: 8,
//   },
//   actionRow: {
//     flexDirection: 'row',
//     gap: 16,
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   actionText: {
//     color: '#4A90E2',
//   },
//   removeText: {
//     color: '#9B9B9B',
//   },
//   priceRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     marginBottom: 16,
//   },
//   price: {
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   originalPrice: {
//     fontSize: 16,
//     textDecorationLine: 'line-through',
//     color: '#9B9B9B',
//   },
//   multiply: {
//     fontSize: 16,
//     color: '#666',
//   },
//   quantity: {
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   totalPrice: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#D0021B',
//     marginLeft: 'auto',
//   },
//   downloadRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderWidth: 2,
//     borderColor: '#F5A623',
//     borderRadius: 4,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   downloadText: {
//     color: '#F5A623',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   downloadSubtext: {
//     color: '#F5A623',
//   },
//   shippingCard: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 16,
//   },
//   shippingHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     marginBottom: 8,
//   },
//   shippingTitle: {
//     fontSize: 16,
//     fontWeight: '500',
//     flex: 1,
//   },
//   shippingPrice: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginRight: 8,
//   },
//   shippingDays: {
//     color: '#666',
//   },
//   moreOptions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     padding: 16,
//     backgroundColor: 'white',
//     borderRadius: 8,
//   },
//   moreOptionsText: {
//     fontSize: 16,
//     color: '#666',
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContainer: {
//     width: '90%',
//     maxHeight: '70%',
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   closeIcon: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     zIndex: 1,
//     padding: 5,
//   },
//   modalImage: {
//     width: '100%',
//     height: 200,
//     backgroundColor: '#f5f5f5',
//   },
//   modalPlaceholderImage: {
//     width: '100%',
//     height: 200,
//     backgroundColor: '#f5f5f5',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   placeholderText: {
//     color: '#666',
//     fontSize: 16,
//   },
//   addImageButton: {
//     marginTop: 10,
//     backgroundColor: '#0EA5E9',
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 4,
//   },
//   addImageText: {
//     color: 'white',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   modalContent: {
//     padding: 16,
//   },
//   modalTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   modalPrice: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#E53E3E',
//   },
//   modalOriginalPrice: {
//     fontSize: 18,
//     color: '#666',
//     textDecorationLine: 'line-through',
//     marginLeft: 8,
//   },
//   modalTotalPrice: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginLeft: 'auto',
//     color: '#E53E3E',
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   quantityButton: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: '#f3f4f6',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   quantityButtonText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   quantityText: {
//     fontSize: 18,
//     marginHorizontal: 16,
//   },
//   colorLabel: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   colorContainer: {
//     flexDirection: 'row',
//     marginBottom: 24,
//   },
//   colorOption: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 12,
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   selectedColor: {
//     borderWidth: 2,
//     borderColor: '#000',
//   },
//   checkmark: {
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     backgroundColor: 'white',
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap: 10,
//   },
//   updateButton: {
//     flex: 1,
//     backgroundColor: '#0EA5E9',
//     borderRadius: 8,
//     padding: 16,
//     alignItems: 'center',
//   },
//   updateButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   closeButton: {
//     flex: 1,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 16,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#0EA5E9',
//   },
//   closeButtonText: {
//     color: '#0EA5E9',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

const colors = [
  { id: 'black', color: '#000000' },
  { id: 'white', color: '#FFFFFF' },
  { id: 'red', color: '#DC2626' },
  { id: 'blue', color: '#2563EB' },
  { id: 'purple', color: '#7C3AED' },
];

export default function OrderReview() {
  const params = useLocalSearchParams();
  const cartItems = params.cartItems && typeof params.cartItems === 'string' ? JSON.parse(params.cartItems) : [];

  // Trạng thái cho từng sản phẩm
  const [itemsState, setItemsState] = useState(
    cartItems.map((item: { imageUrl: any; }, index: any) => ({
      id: index,
      showProductDetails: false,
      selectedColor: 'black',
      quantity: 2,
      isChecked: false,
      productImage: item.imageUrl || null,
    }))
  );

  const handleEditPress = (id: any) => {
    setItemsState((prev: any[]) =>
      prev.map((item) =>
        item.id === id ? { ...item, showProductDetails: true } : item
      )
    );
  };

  const handleRemoveProduct = (id: any) => {
    setItemsState((prev: any[]) =>
      prev.map((item) =>
        item.id === id ? { ...item, productImage: null } : item
      )
    );
  };

  const handleAddImage = (id: any) => {
    setItemsState((prev: any[]) =>
      prev.map((item) =>
        item.id === id ? { ...item, productImage: 'https://via.placeholder.com/150' } : item
      )
    );
  };

  const handleQuantityChange = (id: any, delta: number) => {
    setItemsState((prev: any[]) =>
      prev.map((item) =>
        item.id === id && (delta > 0 || item.quantity > 1)
          ? { ...item, quantity: item.quantity + delta }
          : item
      )
    );
  };

  const handleColorChange = (id: any, colorId: string) => {
    setItemsState((prev: any[]) =>
      prev.map((item) =>
        item.id === id ? { ...item, selectedColor: colorId } : item
      )
    );
  };

  const handleCheckToggle = (id: any) => {
    setItemsState((prev: any[]) =>
      prev.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Xem lại đơn hàng</Text>

      {cartItems.map((product: { price: number; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; subtitle: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; originalPrice: number; }, index: React.Key | null | undefined) => {
        const itemState = itemsState[Number(index)];
        const additionalCost = 2.99;
        const baseTotal = (product.price * itemState.quantity).toFixed(2);
        const totalPrice = itemState.isChecked
          ? (parseFloat(baseTotal) + additionalCost).toFixed(2)
          : baseTotal;

        return itemState.productImage ? (
          <View key={index} style={styles.productCard}>
            <View style={styles.productRow}>
              <Image source={{ uri: itemState.productImage }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{product.title}</Text>
                <Text style={styles.productSubtitle}>{product.subtitle}</Text>
                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleEditPress(itemState.id)}
                  >
                    <Feather name="edit" size={16} color="#4A90E2" />
                    <Text style={styles.actionText}>Chỉnh sửa</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleRemoveProduct(itemState.id)}
                  >
                    <Feather name="trash-2" size={16} color="#9B9B9B" />
                    <Text style={[styles.actionText, styles.removeText]}>Xóa</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
              <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
              <Text style={styles.multiply}>×</Text>
              <Text style={styles.quantity}>{itemState.quantity}</Text>
              <Text style={styles.totalPrice}>${totalPrice}</Text>
            </View>

            <TouchableOpacity
              style={styles.downloadRow}
              onPress={() => handleCheckToggle(itemState.id)}
            >
              <View style={styles.checkbox}>
                {itemState.isChecked && <Ionicons name="checkmark" size={14} color="#F5A623" />}
              </View>
              <View>
                <Text style={styles.downloadText}>Yêu thích thiết kế này?</Text>
                <Text style={styles.downloadSubtext}>Tải xuống tệp thiết kế gốc. +${additionalCost.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>

            <Modal
              transparent={true}
              animationType="slide"
              visible={itemState.showProductDetails}
              onRequestClose={() =>
                setItemsState((prev: any[]) =>
                  prev.map((item) =>
                    item.id === itemState.id ? { ...item, showProductDetails: false } : item
                  )
                )
              }
            >
              <View style={styles.modalOverlay}>
                <ScrollView style={styles.modalContainer}>
                  <TouchableOpacity
                    style={styles.closeIcon}
                    onPress={() =>
                      setItemsState((prev: any[]) =>
                        prev.map((item) =>
                          item.id === itemState.id ? { ...item, showProductDetails: false } : item
                        )
                      )
                    }
                  >
                    <Ionicons name="close" size={24} color="#666" />
                  </TouchableOpacity>

                  {itemState.productImage ? (
                    <Image source={{ uri: itemState.productImage }} style={styles.modalImage} resizeMode="contain" />
                  ) : (
                    <View style={styles.modalPlaceholderImage}>
                      <Text style={styles.placeholderText}>No image</Text>
                      <TouchableOpacity
                        style={styles.addImageButton}
                        onPress={() => handleAddImage(itemState.id)}
                      >
                        <Text style={styles.addImageText}>add image</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{product.title}</Text>

                    <View style={styles.priceContainer}>
                      <Text style={styles.modalPrice}>${product.price.toFixed(2)}</Text>
                      <Text style={styles.modalOriginalPrice}>${product.originalPrice.toFixed(2)}</Text>
                      <Text style={styles.modalTotalPrice}>${totalPrice}</Text>
                    </View>

                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        onPress={() => handleQuantityChange(itemState.id, -1)}
                        style={styles.quantityButton}
                      >
                        <Text style={styles.quantityButtonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{itemState.quantity}</Text>
                      <TouchableOpacity
                        onPress={() => handleQuantityChange(itemState.id, 1)}
                        style={styles.quantityButton}
                      >
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.colorLabel}>
                      Màu sắc: {itemState.selectedColor.charAt(0).toUpperCase() + itemState.selectedColor.slice(1)}
                    </Text>
                    <View style={styles.colorContainer}>
                      {colors.map((color) => (
                        <TouchableOpacity
                          key={color.id}
                          style={[
                            styles.colorOption,
                            { backgroundColor: color.color },
                            itemState.selectedColor === color.id && styles.selectedColor,
                          ]}
                          onPress={() => handleColorChange(itemState.id, color.id)}
                        >
                          {itemState.selectedColor === color.id && <View style={styles.checkmark} />}
                        </TouchableOpacity>
                      ))}
                    </View>

                    <View style={styles.buttonRow}>
                      <TouchableOpacity style={styles.updateButton}>
                        <Text style={styles.updateButtonText}>update item</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>add item</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </Modal>
          </View>
        ) : null;
      })}

      <View style={styles.shippingCard}>
        <View style={styles.shippingHeader}>
          <Feather name="truck" size={20} color="#4A90E2" />
          <Text style={styles.shippingTitle}>Vận chuyển tiêu chuẩn</Text>
          <Text style={styles.shippingPrice}>$7.99</Text>
          <Feather name="chevron-down" size={20} color="#9B9B9B" />
        </View>
        <Text style={styles.shippingDays}>5 - 17 ngày làm việc với mã theo dõi</Text>
      </View>

      <TouchableOpacity style={styles.moreOptions}>
        <Feather name="truck" size={20} color="#4A90E2" />
        <Text style={styles.moreOptionsText}>Bạn có 2 lựa chọn giao hàng khác</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F9FA',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  productRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  placeholderImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    marginLeft: 12,
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  productSubtitle: {
    color: '#666',
    marginBottom: 8,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    color: '#4A90E2',
  },
  removeText: {
    color: '#9B9B9B',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: '#9B9B9B',
  },
  multiply: {
    fontSize: 16,
    color: '#666',
  },
  quantity: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#D0021B',
    marginLeft: 'auto',
  },
  downloadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#F5A623',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadText: {
    color: '#F5A623',
    fontSize: 16,
    fontWeight: '500',
  },
  downloadSubtext: {
    color: '#F5A623',
  },
  shippingCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  shippingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  shippingTitle: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  shippingPrice: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  shippingDays: {
    color: '#666',
  },
  moreOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  moreOptionsText: {
    fontSize: 16,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '70%',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 5,
  },
  modalImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#f5f5f5',
  },
  modalPlaceholderImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
    fontSize: 16,
  },
  addImageButton: {
    marginTop: 10,
    backgroundColor: '#0EA5E9',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  addImageText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  modalContent: {
    padding: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E53E3E',
  },
  modalOriginalPrice: {
    fontSize: 18,
    color: '#666',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  modalTotalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 'auto',
    color: '#E53E3E',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 16,
  },
  colorLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  colorContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#000',
  },
  checkmark: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  updateButton: {
    flex: 1,
    backgroundColor: '#0EA5E9',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0EA5E9',
  },
  closeButtonText: {
    color: '#0EA5E9',
    fontSize: 16,
    fontWeight: '600',
  },
});