import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import {
  HomeIcon,
  ClockIcon,
  ChevLeftIcon,
  DeliveryIcon,
  HeaderLeftLogo,
  HeaderRightLogo,
  LangIcon,
  TableIcon,
  PickedUpIcon,
  PickUpIcon,
  SmsIcon,
  Phone,
  LoginLogo,
  EnglishIcon,
  ArabicIcon,
  Check,
} from "./Icons";

type IconProps = {
  name: keyof typeof iconMap;
  size?: number;
  color?: string;
  style?: ViewStyle;
};

const iconMap = {
  Home: HomeIcon,
  ChevLeft: ChevLeftIcon,
  PickUp: PickUpIcon,
  Sms: SmsIcon,
  Delivery: DeliveryIcon,
  Table: TableIcon,
  Clock: ClockIcon,
  PickedUp: PickedUpIcon,
  Lang: LangIcon,
  HeaderLeftLogo: HeaderLeftLogo,
  HeaderRightLogo: HeaderRightLogo,
  Phone: Phone,
  LoginLogo: LoginLogo,
  Eng: EnglishIcon,
  Ar: ArabicIcon,
  Check: Check,
};

const Icon = ({ name, size = 24, color = "black", style }: IconProps) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }

  return <IconComponent size={size} color={color} style={style} />;
};

export default Icon;
