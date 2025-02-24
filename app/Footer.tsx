
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 


export default function Footer() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.footer}>
      {/* Service Features */}
      <View style={styles.featuresContainer}>
        <View style={styles.featureItem}>
        <Icon name="truck" size={24} color="#4A90E2" />
          <View>
            <Text style={styles.title}>Worldwide Shipping</Text>
            <Text style={styles.description}>Available as Standard or Express delivery</Text>
            <TouchableOpacity onPress={() => openLink('#')}>
              <Text style={styles.link}>Learn more</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.featureItem}>
          <Icon name="shield" size={24} color="#4A90E2" />
          <View>
            <Text style={styles.title}>Secure Payments</Text>
            <Text style={styles.description}>100% Secure payment with 256-bit SSL Encryption</Text>
            <TouchableOpacity onPress={() => openLink('#')}>
              <Text style={styles.link}>Learn more</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.featureItem}>
          <Icon name="undo" size={24} color="#4A90E2" />
          <View>
            <Text style={styles.title}>Free Return</Text>
            <Text style={styles.description}>Exchange or money back guarantee for all orders</Text>
            <TouchableOpacity onPress={() => openLink('#')}>
              <Text style={styles.link}>Learn more</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.featureItem}>
          <Icon name="headphones" size={24} color="#4A90E2" />
          <View>
            <Text style={styles.title}>Local Support</Text>
            <Text style={styles.description}>24/7 Dedicated support</Text>
            <TouchableOpacity onPress={() => openLink('#')}>
              <Text style={styles.link}>Submit a request</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Main Footer Content */}
      <View style={styles.mainFooter}>
        <Text style={styles.mainText}>
          Printerval.com is a global online marketplace, where people come together to make, sell, buy, and collect unique items.
        </Text>

        <View style={styles.socialLinks}>
          <Text style={styles.socialTitle}>Follow us:</Text>
          <TouchableOpacity onPress={() => openLink('#')}>
            <Icon name="facebook" size={24} color="#1877F2" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('#')}>
            <Icon name="twitter" size={24} color="#1DA1F2" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('#')}>
            <Icon name="instagram" size={24} color="#E1306C" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('#')}>
            <Icon name="whatsapp" size={24} color="#25D366" />
          </TouchableOpacity>
        </View>

        <View style={styles.mailList}>
          <Text style={styles.mailListTitle}>Join our mailing list</Text>
          <Text style={styles.mailListDescription}>
            Stay up-to-date on all our promotions, news, and updates.
          </Text>
          <View style={styles.emailSubscription}>
            <TextInput style={styles.emailInput} placeholder="Enter your email" />
            <TouchableOpacity style={styles.subscribeButton}>
              <Text style={styles.subscribeButtonText}>Subscribe</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.quickLinks}>
          <Text style={styles.quickLinksTitle}>Quick Links</Text>
          <TouchableOpacity onPress={() => openLink('#')}>
            <Text style={styles.quickLink}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('#')}>
            <Text style={styles.quickLink}>Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('#')}>
            <Text style={styles.quickLink}>Terms & Conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('#')}>
            <Text style={styles.quickLink}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contact}>
          <Text style={styles.contactTitle}>Contact</Text>
          <Text style={styles.contactInfo}>123 Main Street, Suite 100, City, Country</Text>
          <Text style={styles.contactInfo}>Email: support@printerval.com</Text>
          <Text style={styles.contactInfo}>Phone: +123 456 789</Text>
        </View>
      </View>

      {/* Footer Bottom */}
      <View style={styles.footerBottom}>
        <Text style={styles.footerText}>&copy; 2025 Printerval, All rights reserved.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#2B4259',
  
    paddingBottom: 20,
  },
  featuresContainer: {
    padding: 20,
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  description: {
    fontSize: 14,
    color: '#D1D5DB',
  },
  link: {
    fontSize: 14,
    color: '#4A90E2',
    textDecorationLine: 'underline',
  },
  mainFooter: {
    padding: 20,
  },
  mainText: {
    color: '#D1D5DB',
    fontSize: 14,
    marginBottom: 20,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  socialTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mailList: {
    marginBottom: 20,
  },
  mailListTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  mailListDescription: {
    fontSize: 14,
    color: '#D1D5DB',
    marginBottom: 10,
  },
  emailInput: {
    padding: 10,
    borderRadius: 5,
    width: '75%',
    marginRight: 10,
    backgroundColor: '#F3F4F6',
  },
  emailSubscription: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subscribeButton: {
    backgroundColor: '#FF6B00',
    padding: 10,
    borderRadius: 5,
  },
  subscribeButtonText: {
    color: 'white',
  },
  quickLinks: {
    marginBottom: 20,
  },
  quickLinksTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  quickLink: {
    color: '#D1D5DB',
    fontSize: 14,
    marginBottom: 10,
  },
  contact: {
    marginBottom: 20,
  },
  contactTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  contactInfo: {
    color: '#D1D5DB',
    fontSize: 14,
  },
  footerBottom: {
    backgroundColor: '#1A2A38',
    paddingVertical: 10,
    textAlign: 'center',
  },
  footerText: {
    color: '#A1A1A1',
    fontSize: 12,
  },
});
