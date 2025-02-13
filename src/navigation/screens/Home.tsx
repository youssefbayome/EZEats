import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useState } from "react";
import { Colors } from "../../constants/Colors";
import { orders, readyOrders } from "@/src/lib/data";
import OrderItem from "@/src/components/Home/Order";
import Text from "@/src/components/shared/Text";
type OrderListProps = {
  data: any[];
};

const OrderList = ({ data }: OrderListProps) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingHorizontal: 26, paddingVertical: 19 }}
      renderItem={({ item }) => <OrderItem item={item} />}
      ListEmptyComponent={
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No orders available</Text>
        </View>
      }
    />
  );
};

const AllRoute = () => <OrderList data={orders} />;
const ReadyRoute = () => <OrderList data={readyOrders} />;
function Home() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "All", title: "Home" },
    { key: "Ready", title: "Ready" },
  ]);

  const renderScene = SceneMap({
    All: AllRoute,
    Ready: ReadyRoute,
  });
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      // scrollEnabled={false}
      indicatorStyle={[
        styles.indicator,
        { backgroundColor: "rgba(41, 55, 107, 1)" },
      ]}
      style={styles.tabBar}
      tabStyle={{ flex: 1 }}
      activeColor={Colors.secondary}
      inactiveColor={"rgba(0, 0, 0, 0.2)"}
      renderLabel={({
        route,
        focused,
      }: {
        route: { key: string; title: string };
        focused: boolean;
      }) => (
        <Text style={[styles.tabLabel]} variant="bold">
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      style={styles.container}
    />
  );
}
export default Home;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8F8" },
  card: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  detailsRow: {
    flexDirection: "row",
    gap: 5,
  },
  waiterName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  code: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#001F54",
  },
  time: {
    fontSize: 14,
    color: "gray",
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
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 100,
    alignItems: "center",
    marginHorizontal: 4,
  },
  activeButton: {
    backgroundColor: "#001F54",
  },
  disabledButton: {
    backgroundColor: "rgba(41, 55, 107, 0.1)",
  },
  buttonText: { color: "white", fontWeight: "bold" },
  tabBar: {
    backgroundColor: "#fff",
    width: "100%",
  },
  tabLabel: {
    fontSize: 16,
  },

  indicator: {
    backgroundColor: "#001F54",
    height: 1,
  },
});
