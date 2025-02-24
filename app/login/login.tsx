
// import { router, Stack } from 'expo-router';
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   // SafeAreaView from react-native is replaced with SafeAreaView from react-native-safe-area-context
//   Alert,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import CustomHeader from '../CustomHeader';
// import Footer from '../Footer';
// import Chill from '../Layout/chill';

// export default function LoginScreen() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     if (!email.includes('@') || !email.includes('.com')) {
//       Alert.alert(
//         'Nhập thiếu kìa',
//         'Nhập mấy cái này vào "@" and ".com"'
//       );
//       return;
//     }

//     if (password.length < 8) {
//       Alert.alert(
//         'Invalid Password',
//         'Password must be at least 8 characters long'
//       );
//       return;
//     }

//     router.push('/');
//   };

//   return (
//     <SafeAreaView style={styles.container} edges={['top']}> {/* Chỉ giữ safe area ở trên */}
//       <CustomHeader />
//       <ScrollView contentContainerStyle={styles.scrollView}>
//         <Stack.Screen options={{ headerShown: false }} />

//         <Text style={styles.header}>Login</Text>

//         <View style={styles.featuresContainer}>
//           <View style={styles.featureItem}>
//             <Text style={styles.featureTitle}>Rewards 10CP</Text>
//             <Text style={styles.featureSubtitle}>on every purchase</Text>
//           </View>
//           <View style={styles.featureItem}>
//             <Text style={styles.featureTitle}>Free return</Text>
//             <Text style={styles.learnMore}>Learn more</Text>
//           </View>
//         </View>

//         <Text style={styles.label}>Email</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Email Address"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />

//         <Text style={styles.label}>Password</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           autoCapitalize="none"
//         />

//         <View style={styles.rememberContainer}>
//           <Text style={styles.rememberText}>Remember Me</Text>
//           <TouchableOpacity>
//             <Text style={styles.forgotPassword}>Forgot Your Password?</Text>
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity
//           style={[
//             styles.loginButton,
//             (!email.includes('@') || !email.includes('.com') || password.length < 8) &&
//             styles.loginButtonDisabled
//           ]}
//           onPress={handleLogin}
//         >
//           <Text style={styles.loginButtonText}>Login</Text>
//         </TouchableOpacity>

//         <View style={styles.dividerContainer}>
//           <View style={styles.divider} />
//           <Text style={styles.dividerText}>or</Text>
//           <View style={styles.divider} />
//         </View>

//         <View style={styles.signupContainer}>
//           <Text style={styles.noAccountText}>Don't have an account? </Text>
//           <TouchableOpacity onPress={() => router.push('/login/SignUp')}>
//             <Text style={styles.signupText}>Sign Up Free</Text>
//           </TouchableOpacity>
//         </View>

//         <Chill />
//         <Footer />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9F9F9',
//   },
//   scrollView: {
//     flexGrow: 1,
//     paddingBottom: 30,
//     paddingHorizontal: 0, // Xóa padding hai bên để sát mép
//   },
//   header: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 24,
//     textAlign: 'center',
//   },
//   featuresContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//     gap: 10,
//     paddingHorizontal: 20, // Giữ padding nội tại để layout không sát mép quá
//     width: '100%', // Full width
//   },
//   featureItem: {
//     flex: 1,
//     padding: 10,
//     borderRadius: 8,
//     backgroundColor: '#FFF',
//     elevation: 3,
//   },
//   featureTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   featureSubtitle: {
//     fontSize: 14,
//     color: '#666',
//   },
//   learnMore: {
//     fontSize: 14,
//     color: '#007AFF',
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginBottom: 6,
//     paddingHorizontal: 20, // Giữ padding nội tại
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#DDD',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     backgroundColor: '#FFF',
//     marginBottom: 16,
//     marginHorizontal: 20, // Giữ margin nội tại
//     width: 'auto', // Để input tự mở rộng theo container
//   },
//   rememberContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//     paddingHorizontal: 20, // Giữ padding nội tại
//     width: '100%', // Full width
//   },
//   rememberText: {
//     fontSize: 14,
//   },
//   forgotPassword: {
//     color: '#007AFF',
//     fontSize: 14,
//   },
//   loginButton: {
//     backgroundColor: '#FF8B3D',
//     borderRadius: 8,
//     padding: 14,
//     alignItems: 'center',
//     marginBottom: 20,
//     marginHorizontal: 20, // Giữ margin nội tại
//     width: 'auto', // Để nút tự mở rộng theo container
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   dividerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//     paddingHorizontal: 20, // Giữ padding nội tại
//     width: '100%', // Full width
//   },
//   divider: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#DDD',
//   },
//   dividerText: {
//     marginHorizontal: 12,
//     color: '#666',
//   },
//   signupContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 20,
//     paddingHorizontal: 20, // Giữ padding nội tại
//     width: '100%', // Full width
//   },
//   noAccountText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   signupText: {
//     fontSize: 14,
//     color: '#007AFF',
//     fontWeight: '600',
//   },
//   loginButtonDisabled: {
//     backgroundColor: '#999',
//     opacity: 0.7,
//   },
// });



import { router, Stack } from 'expo-router';
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // Đảm bảo đường dẫn đúng
import CustomHeader from '../CustomHeader';
import Footer from '../Footer';
import Chill from '../Layout/chill';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(async () => {
    if (!email.includes('@') || !email.includes('.com')) {
      Alert.alert('Nhập thiếu', 'Email cần có "@" và ".com"');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Mật khẩu không hợp lệ', 'Mật khẩu phải dài tối thiểu 8 ký tự');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Thành công', `Chào mừng ${userCredential.user.email}!`);
      router.replace('/'); // Chuyển hướng về trang chính
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Đã có lỗi xảy ra';
      Alert.alert('Lỗi đăng nhập', errorMessage);
    }
  }, [email, password]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <CustomHeader />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={styles.header}>Đăng nhập</Text>

        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>Nhận 10CP</Text>
            <Text style={styles.featureSubtitle}>mỗi lần mua sắm</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>Miễn phí đổi trả</Text>
            <Text style={styles.learnMore}>Tìm hiểu thêm</Text>
          </View>
        </View>

        {/* Phần nhập tài khoản */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email của bạn"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
        />

        <Text style={styles.label}>Mật khẩu</Text>
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="password"
          textContentType="password"
        />

        <View style={styles.rememberContainer}>
          <Text style={styles.rememberText}>Ghi nhớ tôi</Text>
          <TouchableOpacity onPress={() => router.push('/login/forgot')}>
            <Text style={styles.forgotPassword}>Quên mật khẩu?</Text> 
      
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.loginButton,
            (!email.includes('@') || !email.includes('.com') || password.length < 8) &&
              styles.loginButtonDisabled,
          ]}
          onPress={handleLogin}
          disabled={!email || !password}
        >
          <Text style={styles.loginButtonText}>Đăng nhập</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>hoặc</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.noAccountText}>Chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => router.push('/login/SignUp')}>
            <Text style={styles.signupText}>Đăng ký miễn phí</Text>
          </TouchableOpacity>
        </View>

        <Chill />
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    marginVertical: 24,
    textAlign: 'center',
    color: '#333',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  featureItem: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFF',
    elevation: 2,
    marginHorizontal: 5,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  featureSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  learnMore: {
    fontSize: 12,
    color: '#007AFF',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
    paddingHorizontal: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFF',
    marginBottom: 16,
    marginHorizontal: 20,
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  rememberText: {
    fontSize: 14,
    color: '#666',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#007AFF',
  },
  loginButton: {
    backgroundColor: '#FF8B3D',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginButtonDisabled: {
    backgroundColor: '#999',
    opacity: 0.7,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDD',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#666',
    fontSize: 14,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  noAccountText: {
    fontSize: 14,
    color: '#666',
  },
  signupText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
});