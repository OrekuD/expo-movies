import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  ActivityIndicator,
  FlatList,
  Text,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { movies } from "../../data/movies";
import { RootStackParamList, Response } from "../../types";
import { Slide, StarRatings } from "../../components";
import { MOVIE_DB_API_KEY } from "../../constants/Api";
import { SLIDE_WIDTH, SPACING, width } from "../../constants/Layout";

const TITLE_HEIGHT = 40;
const RATINGS_HEIGHT = 25;

const Home = ({ navigation }: StackScreenProps<RootStackParamList, "Home">) => {
  const { top: paddingTop } = useSafeAreaInsets();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [data, setData] = useState<Response[]>([]);

  const fetchData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${MOVIE_DB_API_KEY}`
    );

    const data = await response.json();
    setData(data.results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (data.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size="large" color="purple" />
      </View>
    );
  }

  const titleTranslateY = scrollX.interpolate({
    inputRange: [-(SLIDE_WIDTH + SPACING), 0, SLIDE_WIDTH + SPACING],
    outputRange: [TITLE_HEIGHT, 0, -TITLE_HEIGHT],
  });

  return (
    <View style={{ ...styles.container, paddingTop }}>
      <View style={{ flex: 1 }}>
        <View style={styles.titles}>
          <Animated.View
            style={{ transform: [{ translateY: titleTranslateY }] }}
          >
            {data.map(({ title }, index) => {
              return (
                <Text key={index} numberOfLines={1} style={{ ...styles.title }}>
                  {title}
                </Text>
              );
            })}
          </Animated.View>
        </View>
      </View>
      <View>
        <Animated.FlatList
          data={data}
          keyExtractor={({ id }) => String(id)}
          horizontal
          decelerationRate="fast"
          snapToInterval={SLIDE_WIDTH + SPACING}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { x: scrollX } },
              },
            ],
            { useNativeDriver: true }
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ padding: 15 }}
          renderItem={({ item, index }) => (
            <Slide
              navigation={navigation}
              item={item}
              scrollX={scrollX}
              index={index}
            />
          )}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  titles: {
    marginTop: 25,
    height: TITLE_HEIGHT,
    paddingHorizontal: 15,
    overflow: "hidden",
  },
  title: {
    fontFamily: "Poppins-Medium",
    fontSize: 40,
    lineHeight: 50,
  },
});
