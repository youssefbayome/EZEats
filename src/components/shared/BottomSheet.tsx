import { View, StyleSheet, Pressable, Platform } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  useBottomSheetSpringConfigs,
  BottomSheetFooter,
} from "@gorhom/bottom-sheet";

import Text from "./Text";
import Button from "./Button";
export type Ref = BottomSheetModal;

type CustomBottomSheetModalProps = {
  title?: string;
  initialIndex: number;
  children: React.ReactNode;
  footerComponent?: React.ReactNode | null;
  snapPoints?: string[];
  onFooterPress?: () => void;

};

const CustomBottomSheetModal = forwardRef<
  BottomSheetModal,
  CustomBottomSheetModalProps
>(({ title, initialIndex, children, footerComponent, snapPoints }, ref) => {
  const defaultSnapPoints = ["50%", "75%", "95%"];
  const finalSnapPoints = snapPoints || defaultSnapPoints;

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
        opacity={1}
      />
    ),
    []
  );

  const renderFooter = useCallback(
    (props) => {
      return (
        <BottomSheetFooter {...props}>
          <View style={styles.footerContainer}>
            {footerComponent ? footerComponent : null}
          </View>
        </BottomSheetFooter>
      );
    },
    [footerComponent]
  );

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });

  return (
    <BottomSheetModal
      ref={ref}
      index={initialIndex}
      enableDynamicSizing={false}
      snapPoints={finalSnapPoints}
      animateOnMount={true}
      backdropComponent={renderBackdrop}
      animationConfigs={animationConfigs}
      footerComponent={renderFooter}
      //   backgroundStyle={{ backgroundColor: currentColors.background }}
      // enablePanDownToClose={false}
      //   handleIndicatorStyle={{
      //     backgroundColor: currentColors.text,
      //   }}
      // containerComponent={(props) => {
      //   Platform.OS === "ios" && (
      //     <FullWindowOverlay>{props.children}</FullWindowOverlay>
      //   );
      // }}
    >
      <View style={styles.container}>
        <View
          style={[
            styles.header,
            // { borderBottomColor: currentColors.transparentBackground },
          ]}
        >
          <Text style={{ fontSize: 20, textAlign: "left", fontWeight: "600" }}>
            {title}
          </Text>
        </View>
        <View style={styles.contentContainer}>{children}</View>
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
  },
  contentContainer: {
    paddingHorizontal: 24,
  },
  header: {
    paddingBottom: 12,
    paddingHorizontal: 24,
  },
  footerContainer: {
    padding: 12,
    // margin: 12,
    paddingBottom: 20,
    borderRadius: 6,
  },
});

export default CustomBottomSheetModal;
