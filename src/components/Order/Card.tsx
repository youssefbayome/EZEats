import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Pressable,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Text from "../shared/Text";
interface CollapsibleCardProps {
  title?: string;
  children: React.ReactNode;
  isExpandable?: boolean;
}

const Card: React.FC<CollapsibleCardProps> = ({
  title,
  children,
  isExpandable = false,
}) => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => {
    if (isExpandable) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setExpanded(!expanded);
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={toggleExpand}
        style={styles.header}
        disabled={!isExpandable}
      >
        {title && <Text style={styles.title}>{title}</Text>}
        {isExpandable && (
          <Pressable onPress={toggleExpand}>
            <Entypo
              name={expanded ? "chevron-thin-up" : "chevron-thin-down"}
              size={20}
              color="black"
            />
          </Pressable>
        )}
      </TouchableOpacity>

      {(expanded || !isExpandable) && (
        <View style={styles.content}>{children}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 20, fontWeight: "500" },
  content: { marginTop: 10 },
});

export default Card;
