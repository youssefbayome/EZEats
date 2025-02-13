import { Order } from "@/src/lib/Types";
import React from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "../shared/Icons";
import Button from "../shared/Button";
import { Colors } from "@/src/constants/Colors";
import { useNavigation } from "@react-navigation/native";

type OrderItemProps = {
  item: Order;
};

const OrderItem = React.memo(({ item }: OrderItemProps) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("OrderDetails", { order: item });
  };
  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <View style={styles.row}>
        <Text style={styles.waiterName}>{item.waiter}</Text>
        <Text style={styles.code}>{item.code}</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.detailsRow}>
          <Icon name="Clock" size={16} />
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Icon name={item.type} size={16} />
          <Text style={styles.type}>{item.type}</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <Button
          style={[
            styles.button,
            item.smsEnabled ? styles.activeButton : styles.disabledButton,
          ]}
          disabled={!item.smsEnabled}
          title="Send SMS"
          onPress={() => console.log("Send SMS")}
          icon="Sms"
          iconPosition="left"
          textStyle={{
            fontSize: 13,
          }}
          iconStyle={{
            width: 16,
            height: 16,
          }}
        />

        <Button
          style={[styles.button, styles.activeButton]}
          title="Picked Up"
          onPress={() => console.log("Picked Up")}
          icon="PickedUp"
          iconPosition="left"
          iconStyle={{
            width: 16,
            height: 16,
          }}
          textStyle={{
            fontSize: 13,
          }}
        />
      </View>
    </Pressable>
  );
});

export default OrderItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  waiterName: {
    fontSize: 20,
    fontWeight: "500",
    color: Colors.darkText,
  },
  code: {
    fontSize: 20,
    color: Colors.darkText,
    fontWeight: "600",
  },
  time: {
    fontSize: 14,
    color: Colors.darkText,
    marginLeft: 4,
  },
  type: {
    fontSize: 14,
    color: "gray",
    marginLeft: 4,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
    paddingTop: 16,
  },
  button: {
    flex: 1,
  },
  activeButton: {},
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});
