
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   KeyboardTypeOptions,
// } from 'react-native';

// import { Ionicons } from '@expo/vector-icons';
// import { Stack } from 'expo-router';
// import CustomHeader from '../../CustomHeader';
// // import CheckoutScreen from './Payment';
// import OrderReview from './odreReview'; // Sửa lỗi chính tả nếu cần: 'odreReview' -> 'orderReview'

// // Component Input tái sử dụng
// interface CustomInputProps {
//   placeholder: string;
//   keyboardType?: KeyboardTypeOptions;
//   style?: object;
//   maxLength?: number;
//   onChangeText?: (text: string) => void;
//   value?: string;
//   [key: string]: any;
// }

// const CustomInput: React.FC<CustomInputProps> = ({
//   placeholder,  
//   keyboardType,
//   style,
//   maxLength,
//   onChangeText,
//   value,
//   ...props
// }) => (
//   <TextInput
//     style={[styles.input, style]}
//     placeholder={placeholder}
//     placeholderTextColor="#666"
//     keyboardType={keyboardType}
//     maxLength={maxLength}
//     onChangeText={onChangeText}
//     value={value}
//     {...props}
//   />
// );

// // Component Checkbox tái sử dụng
// interface CheckboxProps {
//   label: string;
//   onPress: () => void;
//   checked: boolean;
// }

// const Checkbox: React.FC<CheckboxProps> = ({ label, onPress, checked }) => (
//   <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
//     <View style={[styles.checkbox, checked && styles.checkboxChecked]} />
//     <Text style={styles.checkboxLabel}>{label}</Text>
//   </TouchableOpacity>
// );

// // Component Country Selector tái sử dụng
// interface CountrySelectorProps {
//   country: string;
//   onPress: () => void;
// }

// const CountrySelector: React.FC<CountrySelectorProps> = ({ country, onPress }) => (
//   <TouchableOpacity style={styles.countrySelector} onPress={onPress}>
//     <Text>{country}</Text>
//     <Ionicons name="chevron-down" size={16} color="#000" />
//   </TouchableOpacity>
// );

// // Danh sách mã quốc gia
// const countryCodes = [
//   { flag: '🇺🇸', code: '+1', name: 'United States' },
//   { flag: '🇬🇧', code: '+44', name: 'United Kingdom' },
//   { flag: '🇻🇳', code: '+84', name: 'Vietnam' },
//   { flag: '🇯🇵', code: '+81', name: 'Japan' },
//   { flag: '🇦🇺', code: '+61', name: 'Australia' },
// ];

// // Component chọn mã quốc gia
// const CountryCodeSelector: React.FC<{ onSelect: (code: string) => void }> = ({ onSelect }) => {
//   const [isDropdownVisible, setDropdownVisible] = useState(false);
//   const [selectedCode, setSelectedCode] = useState('🇺🇸 +1');

//   const handleSelect = (item: { flag: string; code: string }) => {
//     setSelectedCode(`${item.flag} ${item.code}`);
//     onSelect(item.code);
//     setDropdownVisible(false);
//   };

//   return (
//     <View style={styles.countryCodeContainer}>
//       <TouchableOpacity
//         style={styles.countryCode}
//         onPress={() => setDropdownVisible(!isDropdownVisible)}
//       >
//         <Text>{selectedCode}</Text>
//         <Ionicons name="chevron-down" size={16} color="#000" />
//       </TouchableOpacity>

//       {isDropdownVisible && (
//         <ScrollView style={styles.dropdown} nestedScrollEnabled>
//           {countryCodes.map((item, index) => (
//             <TouchableOpacity
//               key={index}
//               style={styles.countryOption}
//               onPress={() => handleSelect(item)}
//             >
//               <Text>{`${item.flag} ${item.code} (${item.name})`}</Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       )}
//     </View>
//   );
// };

// export default function PaymentScreen() {
//   const [phoneCode, setPhoneCode] = useState('+1');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [sendToFriend, setSendToFriend] = useState(false);
//   const [address, setAddress] = useState('');
//   const [apartment, setApartment] = useState('');
//   const [city, setCity] = useState('');

//   // Xác thực email
//   const validateEmail = (text: string) => {
//     setEmail(text);
//     const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
//     setEmailError(emailRegex.test(text) ? '' : 'Please enter a valid email ending with .com');
//   };

//   // Kiểm tra form hợp lệ
//   const isFormValid = () => {
//     return (
//       firstName.trim() !== '' &&
//       lastName.trim() !== '' &&
//       phone.trim() !== '' &&
//       email.trim() !== '' &&
//       !emailError &&
//       address.trim() !== '' &&
//       city.trim() !== ''
//     );
//   };

//   // Xử lý đặt hàng
//   const handlePlaceOrder = () => {
//     if (isFormValid()) {
//       const orderData = {
//         firstName,
//         lastName,
//         phone: `${phoneCode}${phone}`,
//         email,
//         shippingAddress: {
//           address,
//           apartment,
//           city,
//           country: 'United States', // Có thể thay đổi nếu tích hợp CountrySelector
//         },
//         sendToFriend,
//       };
//       console.log('Order placed successfully!', orderData);
//       // Ở đây bạn có thể thêm logic như gửi API hoặc chuyển màn hình
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Stack.Screen options={{ headerShown: false }} />
//       <View style={styles.header}>
//         <CustomHeader />
//       </View>

//       <View style={styles.progress}>
//         <Text style={styles.activeStep}>Cart</Text>
//         <Text style={styles.separator}>—</Text>
//         <Text style={styles.activeStep}>Order Information</Text>
//         <Text style={styles.separator}>—</Text>
//         <Text style={styles.inactiveStep}>Complete</Text>
//       </View>

//       <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
//         <Text style={styles.sectionTitle}>Billing Information</Text>

//         <CustomInput
//           placeholder="First name (required)"
//           maxLength={20}
//           value={firstName}
//           onChangeText={setFirstName}
//         />
//         <CustomInput
//           placeholder="Last name (required)"
//           maxLength={20}
//           value={lastName}
//           onChangeText={setLastName}
//         />

//         <View style={styles.phoneContainer}>
//           <CountryCodeSelector onSelect={setPhoneCode} />
//           <CustomInput
//             placeholder="Phone (required)"
//             keyboardType="phone-pad"
//             style={styles.phoneInput}
//             maxLength={15}
//             value={phone}
//             onChangeText={setPhone}
//           />
//         </View>

//         <CustomInput
//           placeholder="Email (required)"
//           keyboardType="email-address"
//           value={email}
//           onChangeText={validateEmail}
//         />
//         {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

//         <Text style={styles.sectionTitle}>Shipping Address</Text>

//         <Checkbox
//           label="Send to your friend"
//           onPress={() => setSendToFriend(!sendToFriend)}
//           checked={sendToFriend}
//         />

//         <CountrySelector country="United States" onPress={() => {}} />

//         <CustomInput
//           placeholder="Address (required)"
//           value={address}
//           onChangeText={setAddress}
//         />
//         <CustomInput
//           placeholder="Apartment, suite, etc. (optional)"
//           value={apartment}
//           onChangeText={setApartment}
//         />
//         <CustomInput
//           placeholder="City / Suburb (required)"
//           value={city}
//           onChangeText={setCity}
//         />

//         <OrderReview />
//         {/* <CheckoutScreen /> */}

//         <TouchableOpacity
//           style={[
//             styles.placeOrderButton,
//             !isFormValid() && styles.disabledButton,
//           ]}
//           onPress={handlePlaceOrder}
//           disabled={!isFormValid()}
//         >
//           <Text style={styles.placeOrderText}>Place Order</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     backgroundColor: '#fff',
//   },
//   progress: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     gap: 8,
//   },
//   activeStep: {
//     color: '#ff6b00',
//     fontWeight: '500',
//   },
//   inactiveStep: {
//     color: '#999',
//   },
//   separator: {
//     color: '#999',
//   },
//   form: {
//     padding: 16,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     marginBottom: 16,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 12,
//     fontSize: 16,
//   },
//   phoneContainer: {
//     flexDirection: 'row',
//     gap: 12,
//     marginBottom: 12,
//   },
//   countryCodeContainer: {
//     position: 'relative',
//   },
//   countryCode: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 12,
//     minWidth: 100,
//   },
//   dropdown: {
//     position: 'absolute',
//     top: 50,
//     left: 0,
//     right: 0,
//     maxHeight: 150,
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     zIndex: 10,
//   },
//   countryOption: {
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   phoneInput: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     marginBottom: 16,
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 4,
//   },
//   checkboxChecked: {
//     backgroundColor: '#ff6b00',
//     borderColor: '#ff6b00',
//   },
//   checkboxLabel: {
//     fontSize: 16,
//   },
//   countrySelector: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 12,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     marginBottom: 12,
//   },
//   placeOrderButton: {
//     backgroundColor: '#ff6b00',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 16,
//     marginBottom: 20,
//   },
//   disabledButton: {
//     backgroundColor: '#cccccc',
//     opacity: 0.6,
//   },
//   placeOrderText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardTypeOptions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import CustomHeader from '../../CustomHeader'; // Giả định đã có file này
import OrderReview from './odreReview'; // File OrderReview đã được cập nhật

// Component Input tái sử dụng
interface CustomInputProps {
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  style?: object;
  maxLength?: number;
  onChangeText?: (text: string) => void;
  value?: string;
  [key: string]: any;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  keyboardType,
  style,
  maxLength,
  onChangeText,
  value,
  ...props
}) => (
  <TextInput
    style={[styles.input, style]}
    placeholder={placeholder}
    placeholderTextColor="#666"
    keyboardType={keyboardType}
    maxLength={maxLength}
    onChangeText={onChangeText}
    value={value}
    {...props}
  />
);

// Component Checkbox tái sử dụng
interface CheckboxProps {
  label: string;
  onPress: () => void;
  checked: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, onPress, checked }) => (
  <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
    <View style={[styles.checkbox, checked && styles.checkboxChecked]} />
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

// Component Country Selector tái sử dụng
interface CountrySelectorProps {
  country: string;
  onPress: () => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ country, onPress }) => (
  <TouchableOpacity style={styles.countrySelector} onPress={onPress}>
    <Text>{country}</Text>
    <Ionicons name="chevron-down" size={16} color="#000" />
  </TouchableOpacity>
);

// Danh sách mã quốc gia
const countryCodes = [
  { flag: '🇺🇸', code: '+1', name: 'United States' },
  { flag: '🇬🇧', code: '+44', name: 'United Kingdom' },
  { flag: '🇻🇳', code: '+84', name: 'Vietnam' },
  { flag: '🇯🇵', code: '+81', name: 'Japan' },
  { flag: '🇦🇺', code: '+61', name: 'Australia' },
];

// Component chọn mã quốc gia
const CountryCodeSelector: React.FC<{ onSelect: (code: string) => void }> = ({ onSelect }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCode, setSelectedCode] = useState('🇺🇸 +1');

  const handleSelect = (item: { flag: string; code: string }) => {
    setSelectedCode(`${item.flag} ${item.code}`);
    onSelect(item.code);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.countryCodeContainer}>
      <TouchableOpacity
        style={styles.countryCode}
        onPress={() => setDropdownVisible(!isDropdownVisible)}
      >
        <Text>{selectedCode}</Text>
        <Ionicons name="chevron-down" size={16} color="#000" />
      </TouchableOpacity>

      {isDropdownVisible && (
        <ScrollView style={styles.dropdown} nestedScrollEnabled>
          {countryCodes.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.countryOption}
              onPress={() => handleSelect(item)}
            >
              <Text>{`${item.flag} ${item.code} (${item.name})`}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default function PaymentScreen() {
  const [phoneCode, setPhoneCode] = useState('+1');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [sendToFriend, setSendToFriend] = useState(false);
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [totalAmount, setTotalAmount] = useState(0); // State để lưu tổng tiền từ OrderReview

  // Xác thực email
  const validateEmail = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    setEmailError(emailRegex.test(text) ? '' : 'Please enter a valid email ending with .com');
  };

  // Kiểm tra form hợp lệ
  const isFormValid = () => {
    return (
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      phone.trim() !== '' &&
      email.trim() !== '' &&
      !emailError &&
      address.trim() !== '' &&
      city.trim() !== ''
    );
  };

  // Xử lý đặt hàng với tổng tiền
  const handlePlaceOrder = () => {
    if (isFormValid()) {
      const orderData = {
        firstName,
        lastName,
        phone: `${phoneCode}${phone}`,
        email,
        shippingAddress: {
          address,
          apartment,
          city,
          country: 'United States', // Có thể thay đổi nếu tích hợp CountrySelector
        },
        sendToFriend,
        totalAmount, // Thêm tổng tiền vào dữ liệu đơn hàng
      };
      console.log('Order placed successfully!', orderData);
      // Ở đây bạn có thể thêm logic như gửi API hoặc chuyển màn hình
    }
  };

  // Nhận tổng tiền từ OrderReview
  const handleTotalCalculated = (total: number) => {
    setTotalAmount(total);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <CustomHeader />
      </View>

      <View style={styles.progress}>
        <Text style={styles.activeStep}>Cart</Text>
        <Text style={styles.separator}>—</Text>
        <Text style={styles.activeStep}>Order Information</Text>
        <Text style={styles.separator}>—</Text>
        <Text style={styles.inactiveStep}>Complete</Text>
      </View>

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Billing Information</Text>

        <CustomInput
          placeholder="First name (required)"
          maxLength={20}
          value={firstName}
          onChangeText={setFirstName}
        />
        <CustomInput
          placeholder="Last name (required)"
          maxLength={20}
          value={lastName}
          onChangeText={setLastName}
        />

        <View style={styles.phoneContainer}>
          <CountryCodeSelector onSelect={setPhoneCode} />
          <CustomInput
            placeholder="Phone (required)"
            keyboardType="phone-pad"
            style={styles.phoneInput}
            maxLength={15}
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <CustomInput
          placeholder="Email (required)"
          keyboardType="email-address"
          value={email}
          onChangeText={validateEmail}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <Text style={styles.sectionTitle}>Shipping Address</Text>

        <Checkbox
          label="Send to your friend"
          onPress={() => setSendToFriend(!sendToFriend)}
          checked={sendToFriend}
        />

      

        <CustomInput
          placeholder="Address (required)"
          value={address}
          onChangeText={setAddress}
        />
        <CustomInput
          placeholder="Apartment, suite, etc. (optional)"
          value={apartment}
          onChangeText={setApartment}
        />
        <CustomInput
          placeholder="City / Suburb (required)"
          value={city}
          onChangeText={setCity}
        />

        {/* Truyền callback để nhận tổng tiền từ OrderReview */}
        <OrderReview onTotalCalculated={handleTotalCalculated} />

        {/* Hiển thị tổng tiền */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.placeOrderButton,
            !isFormValid() && styles.disabledButton,
          ]}
          onPress={handlePlaceOrder}
          disabled={!isFormValid()}
        >
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
  },
  progress: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  activeStep: {
    color: '#ff6b00',
    fontWeight: '500',
  },
  inactiveStep: {
    color: '#999',
  },
  separator: {
    color: '#999',
  },
  form: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  phoneContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  countryCodeContainer: {
    position: 'relative',
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    minWidth: 100,
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    maxHeight: 150,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    zIndex: 10,
  },
  countryOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  checkboxChecked: {
    backgroundColor: '#ff6b00',
    borderColor: '#ff6b00',
  },
  checkboxLabel: {
    fontSize: 16,
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 12,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ff6b00',
  },
  placeOrderButton: {
    backgroundColor: '#ff6b00',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    opacity: 0.6,
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});