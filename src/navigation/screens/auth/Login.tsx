import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";
import EZLogo from "@/src/assets/images/ezlogo.png";
import Phone from "@/src/assets/images/phoneBlack.png";
import { Colors } from "@/src/constants/Colors";

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleLogin = () => {
    sendOTP({ phoneNumber });
    navigation.navigate("OTPVerification", { phoneNumber });
  };

  return (
    <LinearGradient colors={["#EA374A", "#F47B88"]} style={styles.container}>
      <View style={[styles.topContainer, { paddingTop: insets.top }]}>
        <View style={styles.logoContainer}>
          <Image source={EZLogo} resizeMode="contain" style={styles.logo} />
        </View>
        <Text style={styles.subText}>
          Login to get started with a seamless restaurant management experience
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Image source={Phone} style={styles.icon} />
            <Text style={styles.inputLabel}> Phone Number</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Please enter your phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
            returnKeyType="send"
          />
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.primary }]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <StatusBar hidden />
    </LinearGradient>
  );
};

const sendOTP = async ({ phoneNumber }: { phoneNumber: string }) => {
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Your OTP Code",
      body: `Your OTP for login is: ${otp}`,
      sound: "default",
    },
    trigger: null,
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 0.7,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 36,
    paddingBottom: 30,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 114,
    height: 120,
  },
  subText: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
    fontWeight: "500",
    lineHeight: 19.09,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    justifyContent: "space-between",
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "400",
  },
  icon: {
    width: 12,
    height: 12,
    marginLeft: 10,
    tintColor: "rgba(0, 0, 0, 0.5)",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  button: {
    padding: 15,
    borderRadius: 100,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
