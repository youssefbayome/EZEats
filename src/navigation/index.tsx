import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Image, TouchableOpacity } from "react-native";

import HomeIcon from "../assets/images/home-smile.png";
import ChevLeft from "@/src/assets/images/chevron-left.png";

import Home from "./screens/Home";
import * as SplashScreen from "expo-splash-screen";

import OTPVerificationScreen from "./screens/auth/OTPVerfication";
import LoginScreen from "./screens/auth/Login";

import BottomTabs from "../components/layout/BottomTabs";
import Header from "../components/layout/Header";
import { RootState } from "@reduxjs/toolkit/query";
import NotFound from "./screens/NotFound";
import { useFonts } from "expo-font";
import OrderDetails from "./screens/OrderDetails";
// Create Navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeTabs = () => (
  <Tab.Navigator tabBar={(props) => <BottomTabs {...props} />}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        header: (props) => <Header {...props} />,
        tabBarIcon: ({ color, size }) => (
          <Image
            source={HomeIcon}
            tintColor={color}
            style={{ width: size, height: size }}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

const RootStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeTabs"
      component={HomeTabs}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="orderDetails"
      component={OrderDetails}
      options={{ headerTransparent: true }}
    />
    <Stack.Screen
      name="NotFound"
      component={NotFound}
      options={{ title: "404" }}
    />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerBackButtonDisplayMode: "minimal" }}>
    <Stack.Screen
      name="Auth"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="OTPVerification"
      component={OTPVerificationScreen}
      options={({ navigation }) => ({
        title: "",
        headerLeft: ({ canGoBack }) => (
          <TouchableOpacity onPress={() => canGoBack && navigation.goBack()}>
            <Image source={ChevLeft} resizeMode="contain" />
          </TouchableOpacity>
        ),
      })}
    />
  </Stack.Navigator>
);
const Navigation = () => {
  const [fontsLoaded] = useFonts({
    // "SFPRODISPLAYMEDIUM": require("../assets/fonts/SFPRODISPLAYMEDIUM.OTF"),
  });
  const user = useSelector((state: RootState<any, any, any>) => state.user);
  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer
      linking={{
        enabled: true,
        prefixes: ["ezeats://"],
      }}
      onReady={onLayoutRootView}
    >
      {user ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;

export type RootStackParamList = {
  HomeTabs: undefined;
  OrderDetails: { order: any };
  OTPVerification: { phoneNumber: any };
  NotFound: undefined;
};
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
