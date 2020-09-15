import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { SharedElement } from "react-navigation-shared-element";
import { width } from "../constants/Layout";
import { Item, RootStackParamList } from "../types";

interface CardProps {
  item: Item;
  navigation: StackNavigationProp<RootStackParamList, "Home">;
}

const WIDTH = width * 0.9;

const Card = ({ item, navigation }: CardProps) => {
  const { color, label, key } = item;
  return (
    <SharedElement id={`item ${key}`}>
      <RectButton
        style={{
          ...styles.container,
          backgroundColor: color,
        }}
        onPress={() => navigation.push("Product", { item })}
      >
        <Text style={{ ...styles.text }}>{label}</Text>
      </RectButton>
    </SharedElement>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: WIDTH * 0.5,
    borderRadius: 12,
    marginBottom: 20,
    alignSelf: "center",
  },
  text: {
    fontSize: 30,
    color: "#ffffff",
  },
});
