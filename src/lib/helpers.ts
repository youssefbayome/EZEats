import { Alert } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const sendOTP = async ({ phoneNumber }: { phoneNumber: string }) => {
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  try {
    Alert.alert("Your OTP Code", `Your OTP for login is: ${otp}`);
    return;
    //for feature implementation to send push notifications on real devices
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus === "granted") {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Your OTP Code",
          body: `Your OTP for login is: ${otp}`,
          sound: "default",
        },
        trigger: null,
      });
    } else {
      Alert.alert("Your OTP Code", `Your OTP for login is: ${otp}`);
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    Alert.alert("Your OTP Code", `Your OTP for login is: ${otp}`);
  }
};

export const saveUserData = async (userData: {
  phoneNumber: string;
  userName: string;
}) => {
  try {
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
    console.log("User data saved successfully");
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

export const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem("userData");
    console.log("User data removed successfully");
  } catch (error) {
    console.error("Error removing user data:", error);
  }
};
