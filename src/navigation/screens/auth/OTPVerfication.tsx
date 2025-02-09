import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../..";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Colors } from "@/src/constants/Colors";
import { useDispatch } from "react-redux";
import { login } from "@/src/redux/slices/user";

type Props = NativeStackScreenProps<RootStackParamList, "OTPVerification">;

const OTPVerificationScreen = () => {
  //#region hooks
  const route = useRoute<Props["route"]>();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { phoneNumber } = route.params || {};
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(45);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      if (newOtp.every((digit) => digit !== "")) {
        verifyOTP(newOtp.join(""));
      }
    }
  };

  const resendOtp = () => {
    setTimer(45);
    sendOTP(phoneNumber);
  };

  const verifyOTP = (phone: string) => {
    dispatch(login(phone));
    setTimeout(() => {
      navigation.navigate("HomeTabs");
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.text}>
          We have sent a 4-digit code to your phone number{" "}
          <Text style={{ fontWeight: "600" }}>{phoneNumber || null}</Text>,
          please enter it below.
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              style={styles.otpBox}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              returnKeyType="next"
              contextMenuHidden
              onChangeText={(value) => handleOtpChange(index, value)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace" && !digit && index > 0) {
                  inputRefs.current[index - 1]?.focus();
                }
              }}
            />
          ))}
        </View>

        <Text style={styles.timer}>00:{timer < 10 ? `0${timer}` : timer}</Text>

        <TouchableOpacity onPress={resendOtp} disabled={timer > 0}>
          <Text style={styles.resendText}>Didn't receive code?</Text>
          <Text
            style={{
              color: timer > 0 ? Colors.textSecondary : Colors.primary,
              textAlign: "center",
              fontWeight: "800",
              fontSize: 20,
              textDecorationLine: "underline",
            }}
          >
            Resend
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => verifyOTP(phoneNumber)}
          disabled={otp.includes("")}
        >
          <Text style={styles.buttonText}>Confirm OTP</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const sendOTP = (phone: string) => {
  console.log(`Resending OTP to ${phone}`);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  content: {
    alignItems: "center",
    padding: 20,
  },
  text: { fontSize: 16, textAlign: "center" },
  otpContainer: {
    flexDirection: "row",
    marginVertical: 80,
  },
  otpBox: {
    width: 67,
    height: 67,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: "rgba(234, 55, 74, 0.1)",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 48,
    margin: 5,
    fontWeight: "700",
  },
  timer: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 30,
    color: "rgba(61, 61, 67, 1)",
  },
  resendText: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 10,
  },
  buttonContainer: {
    padding: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default OTPVerificationScreen;
