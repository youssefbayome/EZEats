import React, { useEffect, useMemo, useRef, useState, useContext } from "react";
import { TouchableOpacity, StyleSheet, Image, I18nManager } from "react-native";
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
import View from "../shared/View";
import { Locales } from "@/src/lib/locales";
import { writeToStorage } from "@/src/lib/helpers";
import * as Updates from "expo-updates";
import { LanguageContext } from "@/src/context/LanguageContext";

const LANGUAGE_KEY = "selectedLanguage";

const BottomTabs = ({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) => {
  const { changeLanguage, isRTL, language } = useContext(LanguageContext) || {};
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "ar">(
    language || "en"
  );

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["30%"], []);

  const handleLanguagePress = () => {
    bottomSheetRef.current?.present();
  };

  const saveLanguageSelection = async () => {
    try {
      await writeToStorage(LANGUAGE_KEY, selectedLanguage);
      changeLanguage?.(selectedLanguage);
      I18nManager.forceRTL(selectedLanguage === "ar");
      await Updates.reloadAsync();
    } catch (error) {
      console.error("Failed to apply language settings:", error);
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
                  isFocused && { color: Colors.secondary, fontWeight: "500" },
                ]}
                variant={isFocused ? "bold" : "regular"}
              >
                {Locales.t(route.name)}
              </Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={handleLanguagePress}
        >
          <Icon name="Lang" color={"rgba(61, 61, 67, 1)"} />
          <Text style={styles.text}>{Locales.t("language")}</Text>
        </TouchableOpacity>
      </View>

      <CustomBottomSheetModal
        ref={bottomSheetRef}
        initialIndex={0}
        snapPoints={snapPoints}
        title={Locales.t("changeLanguage")}
      >
        <View style={styles.bottomSheetContainer}>
          <View style={{ flexDirection: "column" }}>
            <TouchableOpacity
              onPress={() => setSelectedLanguage("en")}
              style={styles.languageOption}
            >
              <View style={styles.languageWrapper}>
                <Image
                  source={require("@/src/assets/images/united-states.png")}
                  style={styles.flagImage}
                />
                <Text style={styles.languageText}>English</Text>
              </View>
              {selectedLanguage === "en" && (
                <Icon name="Check" color="green" size={20} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedLanguage("ar")}
              style={styles.languageOption}
            >
              <View style={styles.languageWrapper}>
                <Image
                  source={require("@/src/assets/images/egypt.png")}
                  style={styles.flagImage}
                />
                <Text style={styles.languageText}>العربية</Text>
              </View>
              {selectedLanguage === "ar" && (
                <Icon name="Check" color="green" size={20} />
              )}
            </TouchableOpacity>

            <Button
              title={Locales.t("save")}
              onPress={saveLanguageSelection}
              textStyle={{ fontWeight: "600", fontSize: 16 }}
              style={{ paddingVertical: 15, marginTop: 20 }}
            />
          </View>
        </View>
      </CustomBottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#rgba(255, 255, 255, 1)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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
    // paddingHorizontal: 20,
    // paddingVertical: 20,
  },
  languageOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    // paddingVertical: 15,
    backgroundColor: "#fff",
  },
  languageWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },
  flagImage: {
    width: 27,
    height: 27,
    resizeMode: "contain",
  },
  languageText: {
    fontSize: 16,
    flexShrink: 1,
  },
});

export default BottomTabs;
