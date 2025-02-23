
// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';
// import { products as productData } from '../../Data'; 


// interface product {
//   id: number;
//   imageUrl: string; 
// }


// const products: product[] = productData;


// const TrendingCollection = () => {
//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Trending Collection</Text>
      
//       {/* Hoodie Section */}
//       <View style={styles.section}>
//         <View style={styles.grid}>
//           <View style={[styles.mainImageContainer, { backgroundColor: '#FFD54F' }]}>
//             <Image
//               source={{ uri: '/' }}
//               style={styles.mainImage}
//               resizeMode="contain"
//             />
//           </View>
//           <View style={styles.smallImagesContainer}>
//             <View style={[styles.smallImageWrapper, { backgroundColor: '#2B97A9' }]}>
//               <Image
//                 source={{ uri: '/' }}
//                 style={styles.smallImage}
//                 resizeMode="contain"
//               />
//             </View>
//             <View style={[styles.smallImageWrapper, { backgroundColor: '#FF6B6B' }]}>
//               <Image
//                 source={{ uri: '/' }}
//                 style={styles.smallImage}
//                 resizeMode="contain"
//               />
//             </View>
//           </View>
//         </View>
//         <Text style={styles.sectionTitle}>Hoodie</Text>
//       </View>

//       {/* Jesus Section */}
//       <View style={styles.section}>
//         <View style={styles.grid}>
//           <View style={[styles.mainImageContainer, { backgroundColor: '#FFD54F' }]}>
//             <Image
//               source={{ uri: '/' }}
//               style={styles.mainImage}
//               resizeMode="contain"
//             />
//           </View>
//           <View style={styles.smallImagesContainer}>
//             <View style={[styles.smallImageWrapper, { backgroundColor: '#FF9F43' }]}>
//               <Image
//                 source={{ uri: '/' }}
//                 style={styles.smallImage}
//                 resizeMode="contain"
//               />
//             </View>
//             <View style={[styles.smallImageWrapper, { backgroundColor: '#4A4E6A' }]}>
//               <Image
//                 source={{ uri: '/' }}
//                 style={styles.smallImage}
//                 resizeMode="contain"
//               />
//             </View>
//           </View>
//         </View>
//         <Text style={styles.sectionTitle}>Jesus</Text>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#1A237E',
//     padding: 16,
//   },
//   section: {
//     marginBottom: 24,
//   },
//   grid: {
//     flexDirection: 'row',
//     padding: 16,
//     gap: 8,
//   },
//   mainImageContainer: {
//     flex: 1,
//     aspectRatio: 1,
//     borderRadius: 12,
//     overflow: 'hidden',
//   },
//   mainImage: {
//     width: '100%',
//     height: '100%',
//   },
//   smallImagesContainer: {
//     flex: 1,
//     gap: 8,
//   },
//   smallImageWrapper: {
//     flex: 1,
//     borderRadius: 12,
//     overflow: 'hidden',
//   },
//   smallImage: {
//     width: '100%',
//     height: '100%',
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     paddingHorizontal: 16,
//     marginTop: 8,
//   },
// });

// export default TrendingCollection;





// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   StyleSheet,
// } from 'react-native';

// const TrendingCollection = () => {
//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Trending Collection</Text>

//       {/* === Nhóm Hoodie === */}
//       <View style={styles.section}>
//         <View style={styles.shadowContainer}>
//           <View style={styles.grid}>
//             {/* Ảnh lớn */}
//             <View style={styles.mainImageContainer}>
//               <Image
//                 source={{ uri: 'https://example.com/hoodie-main.jpg' }} 
//                 style={styles.image}
//                 resizeMode="contain"
//               />
//             </View>
//             {/* Ảnh nhỏ */}
//             <View style={styles.smallImagesContainer}>
//               <View style={styles.smallImageWrapper}>
//                 <Image
//                   source={{ uri: 'https://example.com/hoodie-1.jpg' }}
//                   style={styles.image}
//                   resizeMode="contain"
//                 />
//               </View>
//               <View style={styles.smallImageWrapper}>
//                 <Image
//                   source={{ uri: 'https://example.com/hoodie-2.jpg' }}
//                   style={styles.image}
//                   resizeMode="contain"
//                 />
//               </View>
//             </View>
//           </View>
//         </View>
//         <Text style={styles.sectionTitle}>Hoodie Collection</Text>
//       </View>

//       {/* === Nhóm Jesus === */}
//       <View style={styles.section}>
//         <View style={styles.shadowContainer}>
//           <View style={styles.grid}>
//             {/* Ảnh lớn */}
//             <View style={styles.mainImageContainer}>
//               <Image
//                 source={{ uri: 'https://example.com/jesus-main.jpg' }} 
//                 style={styles.image}
//                 resizeMode="contain"
//               />
//             </View>
//             {/* Ảnh nhỏ */}
//             <View style={styles.smallImagesContainer}>
//               <View style={styles.smallImageWrapper}>
//                 <Image
//                   source={{ uri: 'https://example.com/jesus-1.jpg' }}
//                   style={styles.image}
//                   resizeMode="contain"
//                 />
//               </View>
//               <View style={styles.smallImageWrapper}>
//                 <Image
//                   source={{ uri: 'https://example.com/jesus-2.jpg' }}
//                   style={styles.image}
//                   resizeMode="contain"
//                 />
//               </View>
//             </View>
//           </View>
//         </View>
//         <Text style={styles.sectionTitle}>Jesus Collection</Text>
//       </View>

//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#1A237E',
//     padding: 16,
//   },
//   section: {
//     marginBottom: 24,
//   },
//   shadowContainer: {
//     marginHorizontal: 16,
//     padding: 8,
//     borderRadius: 16,
//     backgroundColor: '#FFF',
//     elevation: 8, 
//     shadowColor: '#000', 
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//   },
//   grid: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   mainImageContainer: {
//     flex: 1,
//     aspectRatio: 1,
//     borderRadius: 12,
//     overflow: 'hidden',
//     backgroundColor: '#FFD54F',
//   },
//   smallImagesContainer: {
//     flex: 1,
//     gap: 8,
//   },
//   smallImageWrapper: {
//     flex: 1,
//     borderRadius: 12,
//     overflow: 'hidden',
//     backgroundColor: '#2B97A9',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     paddingHorizontal: 16,
//     marginTop: 8,
//   },
// });

// export default TrendingCollection;



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
