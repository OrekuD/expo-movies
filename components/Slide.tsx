import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text, StyleSheet, Animated, View, Image } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SharedElement } from "react-navigation-shared-element";
import { height, width } from "../constants/Layout";
import { Response, RootStackParamList } from "../types";
import { getGenres } from "../utils/getGenres";
import StarRatings from "./StarRatings";

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
    poster_path,
    id,
    genre_ids,
  } = item;
  const { top, bottom } = useSafeAreaInsets();
  const genres = getGenres(genre_ids);

  const translateY = scrollX.interpolate({
    inputRange: [(index - 1) * width, index * width, (index + 1) * width],
    outputRange: [WIDTH * 0.5, 0, WIDTH * 0.5],
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
            <Image
              style={styles.poster_image}
              resizeMode="cover"
              source={poster_path}
            />
            <View style={styles.content}>
              <Text style={styles.text} numberOfLines={4}>
                {title}
              </Text>
              <StarRatings rating={vote_average} />
              <View style={styles.row}>
                {genres.map((genre) => (
                  <View key={genre} style={styles.badge}>
                    <Text style={styles.badgeText}>{genre}</Text>
                  </View>
                ))}
              </View>
            </View>
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
    height,
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
    height: WIDTH * 0.55,
    borderRadius: 5,
    marginBottom: (width * 0.1) / 3,
    alignSelf: "center",
    backgroundColor: "white",
    flexDirection: "row",
    padding: 10,
  },
  poster_image: {
    width: WIDTH * 0.5 * 0.667,
    height: WIDTH * 0.5,
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
