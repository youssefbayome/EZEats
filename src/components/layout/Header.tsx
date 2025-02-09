import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import LogoRight from "../../assets/images/logoRight.png";
import LogoLeft from "../../assets/images/Group 33664.png";
const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        <Image source={LogoLeft} style={styles.logoLeft} />
        <View>
          <Text style={styles.restaurantName}>Restaurant Name</Text>
          <Text style={styles.timing}>8:00 - 16:00</Text>
        </View>
      </View>

      <View style={styles.rightContainer}>
        <Image source={LogoRight} style={styles.logoRight} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 126,
    backgroundColor: "rgba(255, 255, 255, 1)",
    paddingTop: 40, 
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 20,

  },
  logoLeft: {
    width: 40,
    height: 40,
    borderRadius: 50,
    resizeMode: "cover",
  },
  restaurantName: {
    fontSize: 20,
    color: Colors.text,
    fontWeight: "bold",
  },
  timing: {
    color: Colors.textSecondary,
  },
  rightContainer: {
    paddingHorizontal: 20,
  },
  logoRight: {
    width: 80,
    height: 28,
    resizeMode: "contain",
  },
});

export default Header;
