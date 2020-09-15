import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { View, StyleSheet, Image, Text, Animated } from "react-native";
import { height, width } from "../../constants/Layout";
import { RootStackParamList } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SharedElement } from "react-navigation-shared-element";

const WIDTH = width * 0.9;

const Product = ({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, "Product">) => {
  const { item } = route.params;
  const { label, key, color, image } = item;

  return (
    <View style={{ ...styles.container }}>
      <SharedElement id={`item ${color}`}>
        <Animated.Image
          style={{ ...styles.image }}
          resizeMode="cover"
          source={image}
        />
      </SharedElement>
      <SharedElement id={`item ${key}`}>
        <View
          style={{
            ...styles.card,
            backgroundColor: color,
          }}
        >
          <Text style={{ ...styles.text }}>{label}</Text>
        </View>
      </SharedElement>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: WIDTH,
    height: WIDTH * 0.5,
    borderRadius: 12,
    marginBottom: 20,
    alignSelf: "center",
    marginTop: -WIDTH * 0.25,
  },
  text: {
    fontSize: 30,
    color: "#ffffff",
  },
  image: {
    width: width,
    height: 400,
  },
});
