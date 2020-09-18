import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Animated,
  ScrollView,
} from "react-native";
import { width } from "../../constants/Layout";
import { RootStackParamList } from "../../types";
import { SharedElement } from "react-navigation-shared-element";
import { StarRatings } from "../../components";
import { getGenres } from "../../utils/getGenres";
import { IMAGE_BASE_URL } from "../../constants/Api";

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
    overview,
  } = item;
  const genres = getGenres(genre_ids);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: "#f8f8f8",
      }}
    >
      <SharedElement id={`item ${poster_path}`} style={{ flex: 1 }}>
        <Image
          style={{ ...styles.image }}
          resizeMode="cover"
          source={{ uri: IMAGE_BASE_URL + poster_path }}
        />
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
    ...StyleSheet.absoluteFillObject,
  },
});
