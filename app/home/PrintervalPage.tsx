import React from "react";
import { View, Text, Image, StyleSheet, FlatList, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const features = [
  "A community doing good",
  "Support independent creators",
  "Peace of mind",
];

const PrintervalPage = () => {
  const renderHeader = () => (
    <View style={styles.innerContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://assets.printerval.com/assets/images/about-sell/about-sell-banner-2.png",
          }}
          style={styles.image}
          resizeMode="cover"
          onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
          onLoad={() => console.log("Image loaded successfully")}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Printerval</Text>
        <Text style={styles.subtitle}>Spice up your life</Text>
        <Text style={styles.description}>
          Printerval.com is an online marketplace, where people come together to make, sell, buy, and collect unique items.
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={features}
        keyExtractor={(item) => item}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <View style={styles.featureItem}>
            <View style={styles.iconContainer}>
              <Ionicons name="checkmark" size={20} color="#0f766e" />
            </View>
            <Text style={styles.featureText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  innerContainer: {
    width: width * 0.9,
  },
  imageContainer: {
    width: "100%",
    height: 350,
    borderRadius: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  contentContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ea580c",
    marginBottom: 0,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#065f46",
    marginBottom: 0,
  },
  description: {
    fontSize: 16,
    color: "#4b5563",
    textAlign: "center",
    marginVertical: 10,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    width: width * 0.9,
    alignSelf: "center",
  },
  iconContainer: {
    backgroundColor: "#99f6e4",
    borderRadius: 50,
    padding: 5,
    marginRight: 10,
  },
  featureText: {
    fontSize: 16,
    color: "#374151",
  },
});

export default PrintervalPage;