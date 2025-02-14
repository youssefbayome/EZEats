import React, { useEffect, useState, useCallback, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";

import Home from "./screens/Home";
import BottomTabs from "../components/layout/BottomTabs";
import Header from "../components/layout/Header";
import LoginScreen from "./screens/auth/Login";
import OTPVerificationScreen from "./screens/auth/OTPVerfication";
import NotFound from "./screens/NotFound";
import OrderDetails from "./screens/OrderDetails";
import { RootState } from "@/store";
import { login, logout } from "../redux/slices/user";
import { Locales } from "../lib/locales";
import { Order } from "../lib/Types";
import { LanguageContext } from "../context/LanguageContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

const LANGUAGE_KEY = "selectedLanguage";

const HomeTabs = () => (
  <Tab.Navigator tabBar={(props) => <BottomTabs {...props} />}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        header: (props) => <Header {...props} />,
      }}
    />
  </Tab.Navigator>
);

const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { changeLanguage, isRTL, language } = useContext(LanguageContext) || {};

  const [fontsLoaded] = useFonts({
    "SF-Pro-Display-Regular": require("../../assets/fonts/SF-Pro-Display-Regular.otf"),
    "SF-Pro-Display-Medium": require("../../assets/fonts/SF-Pro-Display-Medium.otf"),
    "SF-Pro-Display-Bold": require("../../assets/fonts/SF-Pro-Display-Bold.otf"),
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          dispatch(login(JSON.parse(userData)));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserData();
  }, [dispatch]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer
      linking={{ enabled: true, prefixes: ["ezeats://"] }}
      onReady={onLayoutRootView}
    >
      <Stack.Navigator screenOptions={{}}>
        {!user.isAuthenticated ? (
          <>
            <Stack.Screen
              name="Auth"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OTPVerification"
              component={OTPVerificationScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="HomeTabs"
              component={HomeTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OrderDetails"
              component={OrderDetails}
              options={{
                headerTransparent: true,
                headerBackTitle: "Order Details",
                title: "",
                headerBackTitleStyle: {
                  fontFamily: "SF-Pro-Display-Bold",
                  fontSize: 18,
                },
              }}
            />
            <Stack.Screen
              name="NotFound"
              component={NotFound}
              options={{ title: "404" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

export type RootStackParamList = {
  Auth: undefined;
  HomeTabs: undefined;
  OTPVerification: { phoneNumber: string | undefined | undefined };
  OrderDetails: { order: Order };
  NotFound: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
