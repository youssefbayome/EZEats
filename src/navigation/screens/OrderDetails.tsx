import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { RootStackParamList } from "..";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "OrderDetails">;

const OrderDetails = () => {
  const route = useRoute<Props["route"]>();
  const { order } = route.params || {};

  return (
    <View>
      <Text>OrderDetails</Text>
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({});
