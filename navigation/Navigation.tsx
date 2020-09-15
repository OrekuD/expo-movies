import React from "react";
import { TransitionPresets } from "@react-navigation/stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { HomeScreen, ProductScreen } from "../screens";

const RootStack = createSharedElementStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <RootStack.Navigator
      headerMode="none"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <RootStack.Screen name="Home" component={HomeScreen} />
      <RootStack.Screen
        name="Product"
        component={ProductScreen}
        sharedElementsConfig={(route) => {
          const { item } = route.params;
          return [
            `item ${item.color}`,
            `item ${item.key}`,
            `item ${item.label}`,
          ];
        }}
        options={{
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        }}
      />
    </RootStack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
};

export default Navigation;
