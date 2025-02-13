import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from "react-native";
import Text from "./Text";
import { Colors } from "@/src/constants/Colors";
import Icon from "./Icons";
type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  iconPosition?: "left" | "right";
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconStyle?: TextStyle;
  textWeight?: "regular" | "medium" | "bold";
};

const Button = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  style,
  textStyle,
  iconStyle,
  textWeight = "regular",
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <View style={styles.content}>
          {icon && iconPosition === "left" && (
            <Icon
              name={icon}
              size={16}
              color={disabled ? "rgba(0, 0, 0, 0.3)" : "#fff"}
              style={[{ marginRight: 4 }, iconStyle]}
            />
          )}
          <Text
            style={[
              styles.buttonText,
              disabled && { color: "rgba(0, 0, 0, 0.3)" },
              textStyle,
            ]}
          >
            {title}
          </Text>
          {icon && iconPosition === "right" && (
            <Icon
              name={icon}
              color={disabled ? "rgba(0, 0, 0, 0.3)" : "#fff"}
              style={[{ marginLeft: 4 }, iconStyle]}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.secondary,
    paddingVertical: 8,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  disabledButton: {
    backgroundColor: "rgba(41, 55, 107, 0.1)",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginHorizontal: 8,
  },
  icon: {
    marginHorizontal: 4,
  },
});

export default Button;
