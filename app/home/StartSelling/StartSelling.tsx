//   https://cdn.printerval.com/unsafe/540x540/printerval.com/assets/images/about-sell/design-seller02.jpg
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';

function StartSelling() {
    return ( 
        <ScrollView>
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{ uri: 'https://cdn.printerval.com/unsafe/540x540/printerval.com/assets/images/about-sell/design-seller02.jpg' }}
                />
                <Text style={styles.text}>
                    Support independent 'Artists'{"\n"}
                    and Crafters
                </Text>
                <Text style={styles.text}>
                    Sell your designs on Printerval
                </Text>
            </View>
        </ScrollView>
     );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20, // Added padding to prevent the content from touching the edges
    },
    image: {
        width: '100%',
        height: 400,
        resizeMode: 'cover',
        borderRadius: 12,  // Optional: Add some rounding to the corners
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center', // Center the text
    },
});

export default StartSelling;
