import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "../shared/Icons";
const Header = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.headerContainer, { paddingTop: insets.top + 20 }]}>
      <View style={styles.leftContainer}>
        <Icon name={"HeaderLeftLogo"} style={styles.logoLeft} />
        <View>
          <Text style={styles.restaurantName}>Restaurant Name</Text>
          <Text style={styles.timing}>8:00 - 16:00</Text>
        </View>
      </View>

      <View style={styles.rightContainer}>
        <Icon name="HeaderRightLogo" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    // paddingTop: 20,
    backgroundColor: "rgba(255, 255, 255, 1)",
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
