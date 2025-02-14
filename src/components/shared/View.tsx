import { LanguageContext } from "@/src/context/LanguageContext";
import React, { useContext } from "react";
import { View as RNView } from "react-native";

interface ContainerProps {
  children: React.ReactNode;
  style?: object;
}

const View: React.FC<ContainerProps> = ({ children, style }) => {
  const languageContext = useContext(LanguageContext);
  const { isRTL, language } = languageContext || {};
  return (
    <RNView
      style={[
        { flexDirection: isRTL ? "row-reverse" : "row", width: "100%" },
        style,
      ]}
    >
      {children}
    </RNView>
  );
};

export default View;
