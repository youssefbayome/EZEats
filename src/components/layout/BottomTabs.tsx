import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Colors } from "../../constants/Colors";
import Icon from "../shared/Icons";
import Text from "../shared/Text";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import CustomBottomSheetModal from "../shared/BottomSheet";
import Button from "../shared/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Locales } from "@/src/lib/locales";

const LANGUAGE_KEY = "selectedLanguage";

const BottomTabs = ({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = React.useState({ visible: false, content: "" });

  const [settings, setSettings] = React.useState({
    language: "auto",
  });

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["30%"], []);
  useEffect(() => {
    const loadSelectedLanguage = async () => {
      try {
        const selectedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (selectedLanguage) {
          setSettings({ language: selectedLanguage });
        }
      } catch (error) {
        console.error("Failed to load language from AsyncStorage:", error);
        setMessage({
          visible: true,
          content: "Failed to load language settings.",
        });
      }
    };

    loadSelectedLanguage();
  }, []);

  const handleLanguagePress = () => {
    bottomSheetRef.current?.present();
  };

  const selectLanguage = async (lang: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, lang);
      setSettings({ language: lang });
      Locales.locale = lang;
    } catch (error) {
      console.error("Failed to save language to AsyncStorage:", error);
      setMessage({
        visible: true,
        content: "Failed to save language settings.",
      });
    }
  };
  return (
    <BottomSheetModalProvider>
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];
          const onPress = () => {
            if (!isFocused) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabButton}
            >
              <Icon
                name="Home"
                color={isFocused ? Colors.secondary : "rgba(61, 61, 67, 1)"}
              />
              <Text
                style={[
                  styles.text,
                  isFocused && { color: Colors.secondary, fontWeight: "bold" },
                ]}
              >
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={handleLanguagePress}
        >
          <Icon name="Lang" color={"rgba(61, 61, 67, 1)"} />
          <Text style={styles.text}>Language</Text>
        </TouchableOpacity>
      </View>

      <CustomBottomSheetModal
        ref={bottomSheetRef}
        initialIndex={0}
        snapPoints={snapPoints}
        title="Select Language"
      >
        <View style={styles.bottomSheetContainer}>
          <View>
            <TouchableOpacity
              onPress={() => selectLanguage("en")}
              style={styles.languageOption}
            >
              <Image
                source={require("@/src/assets/images/united-states (1) 1.png")}
                style={styles.flagImage}
              />
              <Text style={styles.languageText}>English</Text>
              {settings.language === "en" ? (
                <Icon name="Check" color="green" size={20} />
              ) : null}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => selectLanguage("ar")}
              style={styles.languageOption}
            >
              <Image
                source={require("@/src/assets/images/egypt (2) 1.png")}
                style={styles.flagImage}
              />
              <Text style={styles.languageText}>العربية</Text>
              {settings.language === "ar" ? (
                <Icon name="Check" color="green" size={20} />
              ) : null}
            </TouchableOpacity>
          </View>

          <Button
            title={Locales.t("common_close")}
            onPress={() => bottomSheetRef.current?.close()}
            textStyle={{ fontWeight: "600", fontSize: 16 }}
            style={{ paddingVertical: 15, marginTop: 20 }}
          />
        </View>
      </CustomBottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#rgba(255, 255, 255, 1)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 20,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  text: {
    fontSize: 10,
  },
  bottomSheetContainer: {
    // paddingVertical: 20,
    // paddingBottom: 20,
  },
  languageOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 10,
  },
  flagImage: {
    width: 27,
    height: 27,
    resizeMode: "contain",
  },
  languageText: {
    fontSize: 16,
    flex: 1,
  },
});

export default BottomTabs;
