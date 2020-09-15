import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text, View, StyleSheet, Image, Animated } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { height, width } from "../constants/Layout";
import { Item, RootStackParamList } from "../types";
import Card from "./Card";

interface SlideProps {
  item: Item;
  navigation: StackNavigationProp<RootStackParamList, "Home">;
  scrollX: Animated.Value;
  index: number;
}

const Slide = ({ item, navigation, scrollX, index }: SlideProps) => {
  const { image, color } = item;

  const scale = scrollX.interpolate({
    inputRange: [(index - 1) * width, index * width, (index + 1) * width],
    outputRange: [1.1, 1, 1.1],
    extrapolate: "clamp",
  });

  return (
    <Animated.View style={styles.container}>
      <SharedElement id={`item ${color}`} style={{ flex: 1 }}>
        <Animated.Image
          style={{ ...styles.image, transform: [{ scale }] }}
          resizeMode="cover"
          source={image}
        />
      </SharedElement>
      <Card navigation={navigation} item={item} />
    </Animated.View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
});
