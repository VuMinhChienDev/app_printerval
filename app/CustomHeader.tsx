
// import { useRouter } from 'expo-router';
// import { View, TouchableOpacity, StyleSheet, Modal, Text, TouchableWithoutFeedback } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { SvgUri } from 'react-native-svg';
// import React, { useState } from 'react';

// export default function CustomHeader() {
//   const [modalVisible, setModalVisible] = useState(false);
//   const router = useRouter();

//   return (
//     <View style={styles.header}>
//       <View style={styles.headerLeft}>
//         <TouchableOpacity onPress={() => router.push('/home/NavaMenu/NavaMenu')}>
//           <View style={styles.menuIcon}>
//             <View style={[styles.menuLine, { width: 20 }]} />
//             <View style={[styles.menuLine, { width: 28 }]} />
//             <View style={[styles.menuLine, { width: 16 }]} />
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => router.push('/home/seach/seach')}>
//           <Ionicons name="search" size={24} color="black" />
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity onPress={() => router.push('/')} style={styles.logo}>
//         <SvgUri width="120" height="40" uri="https://printerval.com/assets/images/logo.svg" />
//       </TouchableOpacity>

//       <View style={styles.headerRight}>
//         <View>
//           {/* Nút mở menu */}
//           <TouchableOpacity onPress={() => setModalVisible(true)}>
//             <Ionicons name="person-outline" size={24} color="black" />
//           </TouchableOpacity>

//           {/* Modal hiển thị Login & Wishlist */}
//           <Modal
//             transparent={true}
//             animationType="slide"
//             visible={modalVisible}
//             onRequestClose={() => setModalVisible(false)}
//           >
//             <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
//               <View style={styles.modalContainer}>
//                 <View style={styles.modalContent}>
//                   {/* Chọn Login với icon */}
//                   <TouchableOpacity
//                     style={styles.menuItem}
//                     onPress={() => {
//                       setModalVisible(false);
//                       setTimeout(() => router.push('/login/login'), 300);
//                     }}
//                   >
//                     <View style={styles.menuItemContent}>
//                       <Ionicons name="log-in-outline" size={24} color="#333" style={styles.menuIcon} />
//                       <Text style={styles.text}>Login</Text>
//                     </View>
//                   </TouchableOpacity>

//                   {/* Chọn Wishlist với icon */}
//                   <TouchableOpacity
//                     style={styles.menuItem}
//                     onPress={() => {
//                       setModalVisible(false);
//                       setTimeout(() => router.push('/product-details/wishlist/WishlistScreen'), 300);
//                     }}
//                   >
//                     <View style={styles.menuItemContent}>
//                       <Ionicons name="heart-outline" size={24} color="#333" style={styles.menuIcon} />
//                       <Text style={styles.text}>Wishlist</Text>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </TouchableWithoutFeedback>
//           </Modal>
//         </View>
//         <TouchableOpacity onPress={() => router.push('/product-details/Cart/Cartscreen')}>
//           <Ionicons name="cart-outline" size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     paddingVertical: 12,
//     backgroundColor: '#fff',
//   },
//   headerLeft: {
//     padding: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: 65,
//   },
//   menuIcon: {
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//     justifyContent: 'center',
//     gap: 4,

//     marginRight: 10,
  
//   },
//   menuLine: {
//     height: 2,
//     backgroundColor: 'pink',
//     marginBottom: 4,
//     borderRadius: 2,
//     textAlign: 'center',
//   },
//   headerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: 70,
//   },
//   logo: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   modalContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: 'flex-end', // Đẩy modal xuống dưới cùng
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '100%', // Chiếm toàn bộ chiều ngang
//     backgroundColor: 'white',
//     padding: 20,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
//   menuItem: {
//     paddingVertical: 15,
//     width: '100%',
//     paddingHorizontal: 10,
//     alignItems: 'center',
//   },
//   menuItemContent: {
//     flexDirection: 'row', // Đặt icon và text trên cùng một hàng
//     alignItems: 'center',
//     justifyContent: "center",
    
//   },

//   text: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
// });
import { useRouter } from 'expo-router';
import { View, TouchableOpacity, StyleSheet, Modal, Text, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SvgUri } from 'react-native-svg';
import React, { useState } from 'react';

export default function CustomHeader() {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={() => router.push('/home/NavaMenu/NavaMenu')}>
          <View style={styles.menuIcon}>
            <View style={[styles.menuLine, { width: 20 }]} />
            <View style={[styles.menuLine, { width: 28 }]} />
            <View style={[styles.menuLine, { width: 16 }]} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/home/seach/seach')}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push('/')} style={styles.logo}>
        <SvgUri width="120" height="40" uri="https://printerval.com/assets/images/logo.svg" />
      </TouchableOpacity>

      <View style={styles.headerRight}>
        <View>
          {/* Nút mở menu */}
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="person-outline" size={24} color="black" />
          </TouchableOpacity>

          {/* Modal hiển thị Login & Wishlist */}
          <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  {/* Chọn Login với icon */}
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => {
                      setModalVisible(false);
                      setTimeout(() => router.push('/login/login'), 300);
                    }}
                  >
                    <View style={styles.menuItemContent}>
                      <Ionicons name="log-in-outline" size={24} color="#333" style={styles.menuIcon} />
                      <Text style={styles.text}>Login</Text>
                    </View>
                  </TouchableOpacity>

                  {/* Chọn Wishlist với icon */}
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => {
                      setModalVisible(false);
                      setTimeout(() => router.push('/product-details/wishlist/WishlistScreen'), 300);
                    }}
                  >
                    <View style={styles.menuItemContent}>
                      <Ionicons name="heart-outline" size={24} color="#333" style={styles.menuIcon} />
                      <Text style={styles.text}>Wishlist</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
        <TouchableOpacity onPress={() => router.push('/product-details/Cart/Cartscreen')}>
          <Ionicons name="cart-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  headerLeft: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 65,
  },
  menuIcon: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 4,
    marginRight: 10,
  },
  menuLine: {
    height: 2,
    backgroundColor: 'pink',
    marginBottom: 4,
    borderRadius: 2,
    textAlign: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 70,
  },
  logo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'flex-end', // Đẩy modal xuống dưới cùng
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%', // Chiếm toàn bộ chiều ngang
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  menuItem: {
    paddingVertical: 15,
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  menuItemContent: {
    flexDirection: 'row', // Đặt icon và text trên cùng một hàng
    alignItems: 'center',
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});