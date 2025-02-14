import React, { useLayoutEffect } from "react";
import { View, Image, ScrollView, StyleSheet, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "@/src/components/shared/Icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Card from "@/src/components/Order/Card";
import Button from "@/src/components/shared/Button";
import { Colors } from "@/src/constants/Colors";
import { Order } from "@/src/lib/Types";
import Text from "@/src/components/shared/Text";
import { useHeaderHeight } from "@react-navigation/elements";
import { Alert } from "react-native";
import { Locales } from "@/src/lib/locales";

const OrderDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { order } = route.params as { order: Order };
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  const handleRefund = () => {
    Alert.alert(
      "Management Approval Required",
      `This action requires management approval. Do you want to refund order with ${order.code}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Continue",
          onPress: () => {},
          style: "destructive",
        },
      ]
    );
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Refund"
          style={{ backgroundColor: Colors.primary, paddingHorizontal: 20 }}
          textStyle={{
            fontWeight: "600",
          }}
          onPress={handleRefund}
        />
      ),

      headerBackTitleVisible: false,
      headerTintColor: Colors.darkText,
    });
  }, []);
  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingTop: headerHeight + 20 },
      ]}
    >
      <Card>
        <View style={styles.clientRow}>
          <View>
            <Text style={styles.clientName} variant="bold">
              {Locales.t("clientName")}
            </Text>
            <Text style={styles.orderId}>{order.code}</Text>
          </View>
          <Pressable
            style={{
              backgroundColor: Colors.darkText,
              width: 43,
              height: 43,
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon name="Phone" size={24} color="#fff" />
          </Pressable>
        </View>
      </Card>

      <Card title={Locales.t("orderStatus")}>
        <View style={styles.statusRow}>
          <Text style={styles.statusText}>{Locales.t("orderTime")}</Text>
          <Text>{order.time}</Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusText}>{Locales.t("Type")}</Text>
          <Text>{Locales.t(order.type)}</Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusText}>{Locales.t("totalPrice")}</Text>
          <Text>{order.price} EGP</Text>
        </View>
      </Card>

      <Card
        title={`${Locales.t("orderItems")} (${order.items.length})`}
        isExpandable
      >
        {order.items.map((item, index) => (
          <View
            key={index}
            style={[
              styles.itemContainer,
              {
                borderBottomWidth: index === order.items.length - 1 ? 0 : 1,
                borderBottomColor: "rgba(0, 0, 0, 0.1)",
                paddingVertical: 15,
              },
            ]}
          >
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <Text style={styles.itemName}>
                  {item.name} ({item.quantity})
                </Text>
                <Text style={styles.itemPrice}>{item.price} EGP</Text>
              </View>
              {item.extras && item.extras.length > 0 && (
                <View>
                  <Text style={styles.extrasTitle}>{Locales.t("Extras")}</Text>
                  {item.extras.map((extra, i) => (
                    <View
                      key={i}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text key={i} style={styles.extraItem}>
                        {extra.name}
                      </Text>
                      <Text style={styles.extraPrice}>{extra.price} EGP</Text>
                    </View>
                  ))}
                </View>
              )}
              {item.notes && <Text style={styles.notes}>{item.notes}</Text>}
            </View>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 19 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: { fontSize: 20, fontWeight: "bold" },
  refundButton: {
    backgroundColor: "red",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  refundText: { color: "white", fontWeight: "bold" },
  card: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  clientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  clientName: { fontSize: 20, fontWeight: "500" },
  orderId: { color: Colors.textSecondary, fontSize: 20, marginTop: 12 },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  statusText: { fontWeight: "400", fontSize: 14, color: Colors.textSecondary },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  itemContainer: {
    flexDirection: "row",

    paddingVertical: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: Colors.textSecondary,
  },
  itemDetails: { flex: 1 },
  itemName: { fontWeight: "bold" },
  itemPrice: { fontWeight: "bold", color: "black", marginTop: 4 },
  extrasTitle: { fontWeight: "bold", marginTop: 4 },
  extraPrice: { color: "gray", marginTop: 2 },

  extraItem: { fontSize: 12, color: "gray", justifyContent: "space-between" },
  notes: { fontSize: 12, color: "red", marginTop: 4 },
});

export default OrderDetailsScreen;
