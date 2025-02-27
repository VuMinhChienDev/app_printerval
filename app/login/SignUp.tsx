// import { router, Stack } from 'expo-router';
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
// } from 'react-native';
// import CustomHeader from '../CustomHeader';
// import Footer from '../Footer';
// import Layout from '../Layout/chill';

// export default function SignUpScreen() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   return (
//     <SafeAreaView style={styles.container}>
//       <CustomHeader />
//       <ScrollView contentContainerStyle={styles.scrollView}>
//         <Stack.Screen options={{ headerShown: false }} />

//         <Text style={styles.header}>Sign Up</Text>

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

//         <Text style={styles.label}>Name</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Name Address"
//           value={name}
//           onChangeText={setName}
//           keyboardType="default"
//         />

//         <Text style={styles.label}>Email</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Email Address"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//         />

//         <Text style={styles.label}>Password</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />

//         <Text style={styles.label}>Confirm Password</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChangeText={setConfirmPassword}
//           secureTextEntry
//         />

//         <TouchableOpacity style={styles.signupButton} onPress={() => router.push('/login/login')}>
//           <Text style={styles.signupButtonText}>Sign Up</Text>
//         </TouchableOpacity>

//         <View style={styles.dividerContainer}>
//           <View style={styles.divider} />
//           <Text style={styles.dividerText}>or</Text>
//           <View style={styles.divider} />
//         </View>

//         <View style={styles.loginContainer}>
//           <Text style={styles.haveAccountText}>Already have an account? </Text>
//           <TouchableOpacity onPress={() => router.push('/login/login')}>
//             <Text style={styles.loginText}>Login</Text>
//           </TouchableOpacity>
//         </View>

//         <Layout />
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
//     paddingHorizontal: 20,
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
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#DDD',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     backgroundColor: '#FFF',
//     marginBottom: 16,
//   },
//   signupButton: {
//     backgroundColor: '#007AFF',
//     borderRadius: 8,
//     padding: 14,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   signupButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   dividerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
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
//   loginContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   haveAccountText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   loginText: {
//     fontSize: 14,
//     color: '#007AFF',
//     fontWeight: '600',
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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // Đảm bảo đường dẫn đúng tới file firebaseConfig của bạn
import CustomHeader from '../CustomHeader';
import Footer from '../Footer';
import Layout from '../Layout/chill';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = useCallback(async () => {
    setIsLoading(true);

    if (!name.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên');
      setIsLoading(false);
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      Alert.alert('Lỗi', 'Vui lòng nhập email hợp lệ');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      Alert.alert('Lỗi', 'Mật khẩu phải dài ít nhất 8 ký tự');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Thành công', 'Đăng ký thành công!');
      router.push('/login/login');
    } catch (error) {
      console.log('Firebase error:', error); // Thêm log để debug
      const errorMessage = (error as { code?: string }).code
        ? {
            'auth/email-already-in-use': 'Email đã được sử dụng',
            'auth/invalid-email': 'Email không hợp lệ',
            'auth/weak-password': 'Mật khẩu quá yếu',
            'auth/network-request-failed': 'Lỗi kết nối mạng',
          }[(error as { code: string }).code] || 'Đã có lỗi xảy ra'
        : 'Đã có lỗi xảy ra';
      Alert.alert('Lỗi đăng ký', errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [name, email, password, confirmPassword]);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Stack.Screen options={{ headerShown: false }} />

        <Text style={styles.header}>Sign Up</Text>

        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>Rewards 10CP</Text>
            <Text style={styles.featureSubtitle}>on every purchase</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>Free return</Text>
            <Text style={styles.learnMore}>Learn more</Text>
          </View>
        </View>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="password"
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="password"
        />

        <TouchableOpacity
          style={[
            styles.signupButton,
            (isLoading || !name || !email || !password || password !== confirmPassword) &&
              styles.signupButtonDisabled,
          ]}
          onPress={handleSignUp}
          disabled={isLoading || !name || !email || !password || password !== confirmPassword}
        >
          <Text style={styles.signupButtonText}>
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.haveAccountText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/login/login')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>

        <Layout />
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
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  featureItem: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
    elevation: 3,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  featureSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  learnMore: {
    fontSize: 14,
    color: '#007AFF',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFF',
    marginBottom: 16,
  },
  signupButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signupButtonDisabled: {
    backgroundColor: '#999',
    opacity: 0.7,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDD',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#666',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  haveAccountText: {
    fontSize: 14,
    color: '#666',
  },
  loginText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
});