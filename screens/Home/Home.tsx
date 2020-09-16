import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { movies } from "../../data/movies";
import { RootStackParamList, Response } from "../../types";
import { Slide } from "../../components";

const MOVIE_DB_API_KEY = "005d6a62314e432e6fe64e784f23f799";

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

  // if (data.length === 0) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         alignItems: "center",
  //         justifyContent: "center",
  //         backgroundColor: "white",
  //       }}
  //     >
  //       <ActivityIndicator size="large" color="purple" />
  //     </View>
  //   );
  // }

  return (
    <View style={{ ...styles.container }}>
      <Animated.FlatList
        data={movies}
        keyExtractor={({ id }) => id}
        horizontal
        pagingEnabled
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
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
