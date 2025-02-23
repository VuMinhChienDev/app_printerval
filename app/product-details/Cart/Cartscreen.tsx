
"use client"

import { useState, useEffect } from "react"
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from "react-native"
import Icon from "react-native-vector-icons/Feather"

import { router, Stack } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import CustomHeader from "../../CustomHeader"
import Chill from "../../Layout/chill"
import Footer from "../../Footer"

interface Product {
  id: number
  title: string
  price: number
  originalPrice?: number
  imageUrl: string
  gender?: string
  quantity: number
  selectedColor?: string | null
  selectedSize?: string | null
  selectedGender?: string | null
}

export default function CartScreen() {
  const [cart, setCart] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem("cart")
      if (storedCart) {
        setCart(JSON.parse(storedCart))
      }
    } catch (error) {
      console.error("Error loading cart:", error)
    }
  }

  const updateCartInStorage = async (updatedCart: Product[]) => {
    try {
      setCart(updatedCart)
      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart))
    } catch (error) {
      console.error("Error updating cart:", error)
    }
  }

  const updateQuantity = (id: number, type: "increase" | "decrease") => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: type === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
          }
        : item,
    )
    updateCartInStorage(updatedCart)
  }

  const removeItem = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id)
    updateCartInStorage(updatedCart)
  }

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shippingFee = 7.99
  const total = subtotal + shippingFee

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.CustomHeader}>
        <CustomHeader />
      </View>
      <View style={styles.progress}>
        <Text style={styles.activeStep}>Cart</Text>
        <Text style={styles.separator}>—</Text>
        <Text style={styles.activeStep}>Order Information</Text>
        <Text style={styles.separator}>—</Text>
        <Text style={styles.inactiveStep}>Complete</Text>
      </View>

      <ScrollView style={styles.content}>
        {cart.length === 0 ? (
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        ) : (
          cart.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSubtitle}>{item.gender}</Text>
                {item.selectedColor && <Text style={styles.itemOption}>Color: {item.selectedColor}</Text>}
                {item.selectedSize && <Text style={styles.itemOption}>Size: {item.selectedSize}</Text>}

                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Icon name="edit" size={16} color="#0088cc" />
                    <Text style={styles.actionText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton} onPress={() => removeItem(item.id)}>
                    <Icon name="trash-2" size={16} color="#999" />
                    <Text style={[styles.actionText, styles.removeText]}>Remove</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.priceRow}>
                  <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                  {item.originalPrice && <Text style={styles.originalPrice}>${item.originalPrice.toFixed(2)}</Text>}
                  <View style={styles.quantity}>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, "decrease")}>
                      <Text style={styles.quantityButton}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, "increase")}>
                      <Text style={styles.quantityButton}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={[styles.totalPrice, { color: "red" }]}
                  >{`$${(item.price * item.quantity).toFixed(2)}`}</Text>
                </View>
              </View>
            </View>
          ))
        )}

        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping fee</Text>
            <Text style={styles.summaryValue}>${shippingFee.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, styles.totalValue]}>Total</Text>
            <Text style={[styles.summaryValue, styles.totalValue]}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.delivery}>
          <Text style={styles.deliveryTitle}>Deliver to</Text>
          <View style={styles.deliveryRow}>
            <Text style={styles.deliveryText}>United States</Text>
            <TouchableOpacity>
              <Text style={styles.changeButton}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.checkoutButton, isLoading && styles.disabledButton]}
          onPress={async () => {
            if (isLoading) return
            setIsLoading(true)
            try {
              // Lưu dữ liệu giỏ hàng để gửi sang trang Checkout (không xóa giỏ hàng)
              const cartData = JSON.stringify(cart)
              console.log("Cart before checkout:", cart) // Kiểm tra giỏ hàng trước khi chuyển

              // Chuyển hướng sang trang Checkout
              await router.push({
                pathname: "/product-details/payment/Checkout",
                params: {
                  cartItems: cartData,
                },
              })
            } catch (error) {
              console.error("Error during checkout:", error)
            } finally {
              setIsLoading(false)
            }
          }}
          disabled={isLoading}
        >
          <Icon name="shopping-bag" size={20} color="#fff" />
          <Text style={styles.checkoutText}>{isLoading ? "Processing..." : "CHECKOUT"}</Text>
        </TouchableOpacity>

        <View>
          <Chill />
        </View>
        <View>
          <Footer />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  progress: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
    gap: 8,
  },
  CustomHeader: {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    padding: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  activeStep: {
    color: "#f60",
    fontWeight: "600",
  },
  separator: {
    color: "#999",
  },
  inactiveStep: {
    color: "#999",
  },
  content: {
    flex: 1,
  },
  itemCard: {
    padding: 16,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  itemSubtitle: {
    color: "#666",
    marginTop: 4,
  },
  itemOption: {
    color: "#666",
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 8,
    gap: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionText: {
    color: "#0088cc",
  },
  removeText: {
    color: "#999",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
  },
  originalPrice: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  quantity: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
  },
  quantityButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontSize: 18,
  },
  quantityText: {
    paddingHorizontal: 12,
    fontSize: 16,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "600",
  },
  summary: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    color: "#666",
  },
  summaryValue: {
    fontWeight: "500",
  },
  totalValue: {
    color: "#f00",
    fontSize: 18,
    fontWeight: "600",
  },
  delivery: {
    padding: 16,
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  deliveryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deliveryText: {
    color: "#666",
  },
  changeButton: {
    color: "#f60",
    fontWeight: "500",
  },
  checkoutButton: {
    backgroundColor: "#ff4444",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    margin: 16,
    borderRadius: 8,
    gap: 8,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
    opacity: 0.7,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  emptyCartText: {
    textAlign: "center",
    padding: 20,
    color: "#666",
    fontSize: 16,
  },
})