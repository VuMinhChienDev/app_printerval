

// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, SafeAreaView, Alert } from "react-native"
// import { X } from "lucide-react-native"
// import { router } from "expo-router"
// import AsyncStorage from "@react-native-async-storage/async-storage"
// import { useFocusEffect } from "@react-navigation/native"
// import CustomHeader from '../../CustomHeader'

// interface Product {
//   id: number
//   title: string
//   price: number
//   originalPrice?: number
//   imageUrl: string
// }

// export default function WishlistScreen() {
//   const [wishlistItems, setWishlistItems] = useState<Product[]>([])
//   const [prevWishlistCount, setPrevWishlistCount] = useState<number>(0) // Theo dõi số lượng trước đó

//   const loadWishlistItems = useCallback(async () => {
//     try {
//       const wishlist = await AsyncStorage.getItem("wishlist")
//       if (wishlist) {
//         const parsedWishlist = JSON.parse(wishlist)
//         const uniqueWishlist = parsedWishlist.filter(
//           (item: Product, index: number, self: Product[]) =>
//             index === self.findIndex((t) => t.id === item.id)
//         )
//         setWishlistItems(uniqueWishlist)
//         console.log("Loaded unique wishlist items:", uniqueWishlist)

//         // Kiểm tra nếu số lượng wishlist tăng lên, hiển thị thông báo
//         if (uniqueWishlist.length > prevWishlistCount) {
//           Alert.alert(
//             "Wishlist Updated",
//             `A new item has been added to your wishlist! Total items: ${uniqueWishlist.length}`,
//             [{ text: "OK", onPress: () => console.log("Alert closed") }]
//           )
//         }
//         setPrevWishlistCount(uniqueWishlist.length) // Cập nhật số lượng trước đó
//       } else {
//         console.log("Wishlist is empty")
//         setWishlistItems([])
//         setPrevWishlistCount(0)
//       }
//     } catch (error) {
//       console.error("Error loading wishlist items:", error)
//     }
//   }, [prevWishlistCount])

//   useEffect(() => {
//     loadWishlistItems()
//   }, [loadWishlistItems])

//   useFocusEffect(
//     useCallback(() => {
//       loadWishlistItems()
//     }, [loadWishlistItems]),
//   )

//   const removeFromWishlist = async (productId: number) => {
//     try {
//       const updatedWishlist = wishlistItems.filter((item) => item.id !== productId)
//       await AsyncStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
//       setWishlistItems(updatedWishlist)
//       setPrevWishlistCount(updatedWishlist.length) // Cập nhật lại số lượng
//       console.log("Updated wishlist after removal:", updatedWishlist)
//     } catch (error) {
//       console.error("Error removing item from wishlist:", error)
//     }
//   }

//   const addToWishlist = async (product: Product) => {
//     try {
//       const wishlist = await AsyncStorage.getItem("wishlist")
//       let currentWishlist: Product[] = wishlist ? JSON.parse(wishlist) : []
      
//       const exists = currentWishlist.some((item) => item.id === product.id)
//       if (!exists) {
//         currentWishlist.push(product)
//         await AsyncStorage.setItem("wishlist", JSON.stringify(currentWishlist))
//         setWishlistItems(currentWishlist)
//         setPrevWishlistCount(currentWishlist.length) // Cập nhật số lượng
//         console.log("Added to wishlist:", currentWishlist)
//       } else {
//         console.log("Product already in wishlist")
//       }
//     } catch (error) {
//       console.error("Error adding to wishlist:", error)
//     }
//   }

//   return (
//     <SafeAreaView style={{ ...styles.scrollContainer, flexGrow: 1, paddingBottom: 100 }}>
//       <View style={styles.header}>
//         <CustomHeader />
//       </View>

//       <ScrollView style={styles.productList}>
//         {wishlistItems.length === 0 ? (
//           <Text style={styles.emptyMessage}>Your wishlist is empty.</Text>
//         ) : (
//           wishlistItems.map((product) => (
//             <View key={product.id} style={styles.productCard}>
//               <View style={styles.productImageContainer}>
//                 <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
//                 <TouchableOpacity style={styles.removeButton} onPress={() => removeFromWishlist(product.id)}>
//                   <X size={24} color="#000" />
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.productInfo}>
//                 <Text style={styles.productTitle}>{product.title}</Text>
//                 <View style={styles.priceContainer}>
//                   <Text style={styles.price}>${product.price.toFixed(2)}</Text>
//                   {product.originalPrice && (
//                     <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
//                   )}
//                 </View>
//                 <TouchableOpacity style={styles.addToCartButton}>
//                   <Text style={styles.addToCartButtonText}>+ Add to cart</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ))
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   productList: {
//     padding: 16,
//   },
//   emptyMessage: {
//     fontSize: 16,
//     textAlign: "center",
//     marginTop: 20,
//   },
//   productCard: {
//     flexDirection: "row",
//     marginBottom: 24,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//     paddingBottom: 24,
//   },
//   productImageContainer: {
//     width: 120,
//     height: 120,
//     marginRight: 16,
//     position: "relative",
//   },
//   productImage: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 8,
//   },
//   removeButton: {
//     position: "absolute",
//     right: -8,
//     top: -8,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 4,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   productInfo: {
//     flex: 1,
//   },
//   productTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 4,
//   },
//   priceContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   price: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#e41e31",
//     marginRight: 8,
//   },
//   originalPrice: {
//     fontSize: 16,
//     color: "#666",
//     textDecorationLine: "line-through",
//   },
//   addToCartButton: {
//     backgroundColor: "#ff4d6a",
//     borderRadius: 25,
//     padding: 12,
//     alignItems: "center",
//   },
//   addToCartButtonText: {
//     color: "#fff",
//     fontWeight: "600",
//   },
// }) 
"use client"

import { useState, useEffect, useCallback } from "react"
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, SafeAreaView, Alert } from "react-native"
import { X } from "lucide-react-native"
import { router } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "@react-navigation/native"
import CustomHeader from '../../CustomHeader'

interface Product {
  id: number
  title: string
  price: number
  originalPrice?: number
  imageUrl: string
}

export default function WishlistScreen() {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([])
  const [prevWishlistCount, setPrevWishlistCount] = useState<number>(0)

  const loadWishlistItems = useCallback(async () => {
    try {
      const wishlist = await AsyncStorage.getItem("wishlist")
      if (wishlist) {
        const parsedWishlist = JSON.parse(wishlist)
        const uniqueWishlist = parsedWishlist.filter(
          (item: Product, index: number, self: Product[]) =>
            index === self.findIndex((t) => t.id === item.id)
        )
        setWishlistItems(uniqueWishlist)
        console.log("Loaded unique wishlist items:", uniqueWishlist)

        if (uniqueWishlist.length > prevWishlistCount) {
          Alert.alert(
            "Wishlist Updated",
            `A new item has been added to your wishlist! Total items: ${uniqueWishlist.length}`,
            [{ text: "OK", onPress: () => console.log("Alert closed") }]
          )
        }
        setPrevWishlistCount(uniqueWishlist.length)
      } else {
        console.log("Wishlist is empty")
        setWishlistItems([])
        setPrevWishlistCount(0)
      }
    } catch (error) {
      console.error("Error loading wishlist items:", error)
    }
  }, [prevWishlistCount])

  useEffect(() => {
    loadWishlistItems()
  }, [loadWishlistItems])

  useFocusEffect(
    useCallback(() => {
      loadWishlistItems()
    }, [loadWishlistItems]),
  )

  const removeFromWishlist = async (productId: number) => {
    try {
      const updatedWishlist = wishlistItems.filter((item) => item.id !== productId)
      await AsyncStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
      setWishlistItems(updatedWishlist)
      setPrevWishlistCount(updatedWishlist.length)
      console.log("Updated wishlist after removal:", updatedWishlist)
    } catch (error) {
      console.error("Error removing item from wishlist:", error)
    }
  }

  const addToCart = async (product: Product) => {
    try {
      // Lấy giỏ hàng hiện tại từ AsyncStorage
      const cart = await AsyncStorage.getItem("cart")
      let currentCart: Product[] = cart ? JSON.parse(cart) : []

      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const exists = currentCart.some((item) => item.id === product.id)
      if (!exists) {
        // Thêm sản phẩm vào giỏ hàng với quantity mặc định là 1
        const productToAdd = { ...product, quantity: 1 }
        currentCart.push(productToAdd)
        await AsyncStorage.setItem("cart", JSON.stringify(currentCart))
        console.log("Added to cart:", currentCart)

        // Chuyển hướng sang CartScreen
        router.push('/product-details/Cart/Cartscreen')
      } else {
        console.log("Product already in cart")
        // Nếu sản phẩm đã có trong giỏ hàng, vẫn chuyển hướng sang CartScreen
        router.push('/product-details/Cart/Cartscreen')
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
    }
  }

  return (
    <SafeAreaView style={{ ...styles.scrollContainer, flexGrow: 1, paddingBottom: 100 }}>
      <View style={styles.header}>
        <CustomHeader />
      </View>

      <ScrollView style={styles.productList}>
        {wishlistItems.length === 0 ? (
          <Text style={styles.emptyMessage}>Your wishlist is empty.</Text>
        ) : (
          wishlistItems.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productImageContainer}>
                <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
                <TouchableOpacity style={styles.removeButton} onPress={() => removeFromWishlist(product.id)}>
                  <X size={24} color="#000" />
                </TouchableOpacity>
              </View>

              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{product.title}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                  {product.originalPrice && (
                    <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => addToCart(product)} // Gọi hàm addToCart khi nhấn
                >
                  <Text style={styles.addToCartButtonText}>+ Add to cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  productList: {
    padding: 16,
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  productCard: {
    flexDirection: "row",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 24,
  },
  productImageContainer: {
    width: 120,
    height: 120,
    marginRight: 16,
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  removeButton: {
    position: "absolute",
    right: -8,
    top: -8,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: "#e41e31",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 16,
    color: "#666",
    textDecorationLine: "line-through",
  },
  addToCartButton: {
    backgroundColor: "#ff4d6a",
    borderRadius: 25,
    padding: 12,
    alignItems: "center",
  },
  addToCartButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
})