import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { View, StyleSheet, Image, Text } from "react-native";
import { width } from "../../constants/Layout";
import { RootStackParamList } from "../../types";
import { SharedElement } from "react-navigation-shared-element";
import { StarRatings } from "../../components";
import { getGenres } from "../../utils/getGenres";

const WIDTH = width * 0.9;

const Product = ({ route }: StackScreenProps<RootStackParamList, "Movie">) => {
  const { item } = route.params;
  const {
    title,
    id,
    backdrop_path,
    vote_average,
    poster_path,
    genre_ids,
  } = item;
  const genres = getGenres(genre_ids);

  return (
    <View style={styles.container}>
      <SharedElement id={`item ${title}`}>
        <Image
          style={{ ...styles.image }}
          resizeMode="cover"
          source={backdrop_path}
        />
      </SharedElement>
      <SharedElement id={`item ${id}`}>
        <View style={{ ...styles.card }}>
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
  image: {
    width: width,
    height: width * 0.7,
  },
  card: {
    width: WIDTH,
    height: WIDTH * 0.55,
    borderRadius: 5,
    marginTop: (-WIDTH * 0.55) / 2,
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
