import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text, StyleSheet, Animated, View, Image } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SharedElement } from "react-navigation-shared-element";
import { height, width } from "../constants/Layout";
import { Item, Response, RootStackParamList } from "../types";

const WIDTH = width * 0.9;

interface SlideProps {
  item: Response;
  navigation: StackNavigationProp<RootStackParamList, "Home">;
  scrollX: Animated.Value;
  index: number;
}

const Slide = ({ item, navigation, scrollX, index }: SlideProps) => {
  const {
    backdrop_path,
    title,
    popularity,
    vote_average,
    vote_count,
    id,
  } = item;
  const { top, bottom } = useSafeAreaInsets();

  const translateY = scrollX.interpolate({
    inputRange: [(index - 1) * width, index * width, (index + 1) * width],
    outputRange: [WIDTH * 0.5, 0, WIDTH * 0.5],
    extrapolate: "clamp",
  });

  const scale = scrollX.interpolate({
    inputRange: [(index - 1) * width, index * width, (index + 1) * width],
    outputRange: [1.6, 1, 1.6],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <SharedElement id={`item ${title}`} style={{ flex: 1 }}>
        <Image
          style={{ ...styles.image, marginTop: top, marginBottom: bottom }}
          resizeMode="cover"
          source={backdrop_path}
        />
      </SharedElement>
      <Animated.View
        style={{ ...styles.cardContainer, transform: [{ translateY }] }}
      >
        <SharedElement id={`item ${id}`}>
          <RectButton
            style={{
              ...styles.card,
            }}
            onPress={() => navigation.push("Movie", { item })}
          >
            <Text style={{ ...styles.text }}>{title}</Text>
          </RectButton>
        </SharedElement>
      </Animated.View>
    </View>
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
    width: width * 0.95,
    height: height,
    borderRadius: 10,
    alignSelf: "center",
    overflow: "hidden",
  },
  cardContainer: {
    position: "absolute",
    bottom: 0,
    width,
  },
  card: {
    width: WIDTH,
    height: WIDTH * 0.5,
    borderRadius: 5,
    marginBottom: (width * 0.1) / 3,
    alignSelf: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 30,
    color: "#ffffff",
  },
});
