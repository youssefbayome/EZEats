import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Colors } from "../../constants/Colors";
import LangIcon from "../../assets/images/lang.png";

const BottomTabs = ({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) => {
  // console.log(descriptors)
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];
        // console.log(options)

        const icon = options.tabBarIcon
          ? options.tabBarIcon({
              focused: isFocused,
              color: isFocused ? Colors.secondary : Colors.text,
              size: 30,
            })
          : null;
        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[styles.tabButton]}
          >
            {icon}
            <Text
              style={[
                styles.text,
                isFocused && { color: Colors.secondary, fontWeight: "700" },
              ]}
            >
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity style={[styles.tabButton]}>
        <Image
          source={LangIcon}
          style={{ width: 30, height: 30 }}
          resizeMode="contain"
        />
        <Text style={[styles.text]}>Language</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#rgba(255, 255, 255, 1)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: -16,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  activeTab: {},
  text: {
    color: "#222",
    fontSize: 10,
  },
});
export default BottomTabs;
