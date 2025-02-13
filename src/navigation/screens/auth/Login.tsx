import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "@/src/components/shared/Icons";
import { Colors } from "@/src/constants/Colors";
import Text from "@/src/components/shared/Text";
import Button from "@/src/components/shared/Button";
import { sendOTP } from "@/src/lib/helpers";
const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleLogin = () => {
    if (phoneNumber.length < 11) {
      Alert.alert(
        "Invalid phone number",
        "Phone number must be at least 11 digits long."
      );
      return;
    }
    sendOTP({ phoneNumber });
    navigation.navigate("OTPVerification", { phoneNumber });
  };

  return (
    <LinearGradient colors={["#EA374A", "#F47B88"]} style={styles.container}>
      <View style={[styles.topContainer, { paddingTop: insets.top }]}>
        <View style={styles.logoContainer}>
          <Icon name="LoginLogo" style={styles.logo} />
        </View>
        <Text style={styles.subText}>
          Login to get started with a seamless restaurant management experience
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Icon
              name="Phone"
              color="rgba(61, 61, 67, 1)"
              style={styles.icon}
              size={14}
            />
            <Text style={styles.inputLabel}> Phone Number</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Please enter your phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
            returnKeyType="done"
          />
        </View>
        <Button
          title="Login"
          textStyle={{ fontSize: 20, fontWeight: "600" }}
          style={[styles.button, { backgroundColor: Colors.primary }]}
          onPress={handleLogin}
        />
      </View>
      <StatusBar hidden />
    </LinearGradient>
  );
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
    color: "rgba(255, 255, 255, 1)",
    lineHeight: 19.09,
    fontWeight: "500",
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
    paddingVertical: 15,
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
