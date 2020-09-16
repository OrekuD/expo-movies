import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { View, StyleSheet, Image, Text } from "react-native";
import { width } from "../../constants/Layout";
import { RootStackParamList } from "../../types";
import { SharedElement } from "react-navigation-shared-element";

const WIDTH = width * 0.9;

const Product = ({ route }: StackScreenProps<RootStackParamList, "Movie">) => {
  const { item } = route.params;
  const { title, id, backdrop_path } = item;

  return (
    <View style={{ ...styles.container }}>
      <SharedElement id={`item ${title}`}>
        <Image
          style={{ ...styles.image }}
          resizeMode="cover"
          source={backdrop_path}
        />
      </SharedElement>
      <SharedElement id={`item ${id}`}>
        <View
          style={{
            ...styles.card,
          }}
        >
          <Text style={{ ...styles.text }}>{title}</Text>
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
    borderRadius: 5,
    alignSelf: "center",
    marginTop: -WIDTH * 0.25,
    backgroundColor: "white",
  },
  text: {
    fontSize: 30,
    color: "#ffffff",
  },
  image: {
    width: width,
    height: width * 0.8,
  },
});
