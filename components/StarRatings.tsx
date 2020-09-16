import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet } from "react-native";

interface StarRatingsProps {
  rating: number;
}

const StarRatings = ({ rating }: StarRatingsProps) => {
  const actRating = Math.floor(rating / 2);
  const stars = [
    ...Array(actRating).fill("star"),
    ...Array(5 - actRating).fill("staro"),
  ];
  return (
    <View style={styles.container}>
      {stars.map((name, index) => (
        <AntDesign
          name={name}
          color="gold"
          size={22}
          key={index}
          style={{ ...styles.star, marginLeft: index === 0 ? 0 : 4 }}
        />
      ))}
    </View>
  );
};

export default StarRatings;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    marginHorizontal: 4,
  },
});
