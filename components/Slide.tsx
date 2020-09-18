import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text, StyleSheet, Animated, View, Image } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SharedElement } from "react-navigation-shared-element";
import { IMAGE_BASE_URL } from "../constants/Api";
import { height, SLIDE_WIDTH, SPACING, width } from "../constants/Layout";
import { Response, RootStackParamList } from "../types";
import { getGenres } from "../utils/getGenres";
import StarRatings from "./StarRatings";

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
    poster_path,
    id,
    genre_ids,
  } = item;
  const { top, bottom } = useSafeAreaInsets();
  const genres = getGenres(genre_ids);

  const translateY = scrollX.interpolate({
    inputRange: [(index - 1) * width, index * width, (index + 1) * width],
    outputRange: [SLIDE_WIDTH * 0.5, 0, SLIDE_WIDTH * 0.5],
    extrapolate: "clamp",
  });

  return (
    <RectButton
      onPress={() => navigation.navigate("Movie", { item })}
      style={styles.container}
    >
      <SharedElement id={`item ${poster_path}`} style={{ flex: 1 }}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{ uri: IMAGE_BASE_URL + poster_path }}
        />
      </SharedElement>
    </RectButton>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: {
    width: SLIDE_WIDTH,
    height: SLIDE_WIDTH * 1.5,
    overflow: "hidden",
    marginRight: SPACING,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
  },
  cardContainer: {
    position: "absolute",
    bottom: 0,
    width,
  },
  card: {
    width: SLIDE_WIDTH,
    height: SLIDE_WIDTH * 0.55,
    borderRadius: 5,
    marginBottom: (width * 0.1) / 4,
    alignSelf: "center",
    backgroundColor: "white",
    flexDirection: "row",
    padding: 10,
  },
  poster_image: {
    width: SLIDE_WIDTH * 0.5 * 0.667,
    height: SLIDE_WIDTH * 0.5,
  },
  content: {
    flex: 1,
    paddingLeft: 10,
  },
  text: {
    fontSize: 20,
    fontFamily: "Poppins-Medium",
  },
  row: {
    flexDirection: "row",
    marginVertical: 10,
    flexWrap: "wrap",
    alignItems: "center",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "purple",
    marginRight: 5,
    marginBottom: 5,
  },
  badgeText: {
    color: "#ffffff",
    fontFamily: "Poppins-Regular",
    marginTop: 2,
  },
});
