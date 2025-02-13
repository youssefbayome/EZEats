import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../..";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Colors } from "@/src/constants/Colors";
import { useDispatch } from "react-redux";
import { login } from "@/src/redux/slices/user";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "@/src/components/shared/Icons";
import Text from "@/src/components/shared/Text";
import { sendOTP } from "@/src/lib/helpers";
type Props = NativeStackScreenProps<RootStackParamList, "OTPVerification">;

const OTPVerificationScreen = () => {
  //#region hooks
  const route = useRoute<Props["route"]>();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { phoneNumber } = route.params || {};
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(45);
  const [isLoading, setIsLoading] = useState(false);
  const insets = useSafeAreaInsets();
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

  const verifyOTP = async (otp: string) => {
    setIsLoading(true);

    setTimeout(() => {
      dispatch(login(phoneNumber));
      navigation.navigate("HomeTabs");

      setIsLoading(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.content, { paddingTop: insets.top }]}>
        <TouchableOpacity
          style={{ marginBottom: 16, alignSelf: "flex-start" }}
          onPress={() => navigation.goBack()}
        >
          <Icon name="ChevLeft" />
        </TouchableOpacity>

        <Text align="left" size={16}>
          We have sent a 4-digit code to your phone number{" "}
          <Text variant="bold">{phoneNumber || null}</Text>. Please enter it
          below to continue.
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
              editable={!isLoading}
            />
          ))}
        </View>

        <Text style={styles.timer}>00:{timer < 10 ? `0${timer}` : timer}</Text>

        <TouchableOpacity onPress={resendOtp} disabled={timer > 0 || isLoading}>
          <Text style={styles.resendText}>Didn't receive code?</Text>
          <Text
            style={{
              color: timer > 0 ? Colors.textSecondary : Colors.primary,
              textAlign: "center",
              fontSize: 20,
              textDecorationLine: "underline",
            }}
            variant="bold"
          >
            Resend
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, isLoading && styles.disabledButton]}
          onPress={() => verifyOTP(otp.join(""))}
          disabled={otp.includes("") || isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Verifying..." : "Confirm OTP"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
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
    color: Colors.darkText,
  },
  timer: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 30,
    color: "rgba(61, 61, 67, 1)",
  },
  resendText: {
    fontSize: 20,
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
  disabledButton: {
    backgroundColor: Colors.textSecondary,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OTPVerificationScreen;
