import {
  StyleSheet,
  Text as RNText,
  TextStyle,
  I18nManager,
  StyleProp,
} from "react-native";
import React, { useContext } from "react";
import { LanguageContext } from "@/src/context/LanguageContext";

type TypographyVariant = "regular" | "medium" | "bold";

type TextProps = {
  children: React.ReactNode;
  variant?: TypographyVariant;
  style?: StyleProp<TextStyle>;
  color?: string;
  align?: "auto" | "left" | "right" | "center" | "justify";
  numberOfLines?: number;
  fontFamily?: string;
  size?: number;
};

const Text = ({
  children,
  variant = "regular",
  style,
  color = "#000",
  align = "auto",
  numberOfLines,
  size = 14,
  fontFamily,
}: TextProps) => {
  const languageContext = useContext(LanguageContext);
  const { changeLanguage, isRTL, language } = languageContext || {};

  const getFontFamily = () => {
    if (fontFamily) return fontFamily;
    switch (variant) {
      case "regular":
        return "SF-Pro-Display-Regular";
      case "medium":
        return "SF-Pro-Display-Medium";
      case "bold":
        return "SF-Pro-Display-Bold";
      default:
        return "SF-Pro-Display-Regular";
    }
  };

  return (
    <RNText
      style={[
        {
          color,
          fontSize: size,
          textAlign: isRTL ? "right" : align,
          fontFamily: getFontFamily(),
        },
        style,
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
};

export default Text;
