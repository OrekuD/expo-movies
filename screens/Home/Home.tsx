import { StackScreenProps } from "@react-navigation/stack";
import React, { useRef } from "react";
import { View, StyleSheet, FlatList, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { products } from "../../data/products";
import { RootStackParamList } from "../../types";
import { Slide } from "../../components";

const Home = ({ navigation }: StackScreenProps<RootStackParamList, "Home">) => {
  const { top: paddingTop } = useSafeAreaInsets();
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={{ ...styles.container }}>
      <Animated.FlatList
        data={products}
        keyExtractor={({ key }) => key}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { x: scrollX } },
            },
          ],
          { useNativeDriver: false }
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
