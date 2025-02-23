import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { SvgUri } from 'react-native-svg';
import { router } from 'expo-router';
import tw from 'twrnc';

interface MenuItemProps {
  icon: string | any;
  title: string;
  onPress: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemContent}>
      {typeof icon === 'string' ? (
        <View style={[styles.iconBox, { backgroundColor: icon }]}>
          <Text style={styles.iconText}>{title[0]}</Text>
        </View>
      ) : (
        <Image source={icon} style={styles.icon} />
      )}
      <Text style={styles.menuItemText}>{title}</Text>
    </View>
    <ChevronRight size={20} color="#666" />
  </TouchableOpacity>
);

export default function NavigationDrawer() {
  const menuItems = [
    { id: 1, title: 'Order Tracking', icon: '#B0C4DE' },
    { id: 2, title: 'Loh In Sign Up', icon: '#B0C4DE' },
    { id: 3, title: 'Shop by Category', icon: '#B0C4DE' },
    { id: 4, title: 'Create Your Own', icon: '#FAFAD2' },
    { id: 5, title: 'Valentine 2025', icon: '#98FB98' },
    { id: 6, title: 'Gift Guides', icon: '#FAFAD2' },
    { 
      id: 7,
      title: 'Products',
      icon: { uri: 'https://cdn.printerval.com/unsafe/540x540/asset.prtvstatic.com/2024/04/23/2171191-538f58913168aa40c32d1532a58c0e91.png' }
    },
    {
      id: 8,
      title: 'Explore Designs',
      icon: { uri: 'https://cdn.printerval.com/image/540x540/design-trim,transparent,print-2022-10-12_c4f93b70-964c-4e00-9000-d83662a452fa,transparent.png'} 
    },
    {
      id: 9,
      title: 'Help Center',
      icon: {uri: 'https://cdn.printerval.com/unsafe/540x540/asset.prtvstatic.com/2025/01/28/055ffd88b471563b2adc052f295eefe2.jpg'}
    },
    {
      id: 10,
      title: 'Promo Code',
      icon: {uri: 'https://cdn.printerval.com/unsafe/540x540/asset.prtvstatic.com/2025/01/28/45c896e998a54af948c7dd4556805bd3.png'}
    },
    {
      id: 11,
      title: 'FREE E-Card',
      icon: {uri: 'https://cdn.printerval.com/unsafe/540x540/asset.prtvstatic.com/2024/11/01/pullover-hoodie-mockup-featuring-an-autumn-outfit-m1272-049d2b3292c711914b30c3ab0d7016d0.png'}
    },
    {
      id: 12,
      title: 'Blog',
      icon: {uri:'https://cdn.printerval.com/unsafe/540x540/asset.prtvstatic.com/2023/09/09/polo-b025dcae00535e813dde415d01407c77.jpg'}
    },

  ];

  return (
    <SafeAreaView style={styles.container}>
 <TouchableOpacity 
  onPress={() => router.push('/')} 
  style={tw`flex items-center justify-center py-4`}
>
  <SvgUri width='120' height='40' uri='https://printerval.com/assets/images/logo.svg' />
</TouchableOpacity>

      <ScrollView style={styles.scrollView}>
        {menuItems.map((item, index) => (
          <MenuItem
            key={item.id}
            title={item.title}
            icon={item.icon}
            onPress={() => console.log(`Pressed ${item.title}`)}
          />
        ))}
        
        <View style={styles.footer}>
          <Text style={styles.footerHeader}>Delivery</Text>
          <Text style={styles.footerHeader}>Returns</Text>
          <Text style={styles.footerHeader}>Help Center</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  TouchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 18,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  footer: {
    padding: 16,
    paddingTop: 24,
  },
  footerHeader: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '600',
    marginBottom: 16,
  },
});
