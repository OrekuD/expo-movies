import { ImageRequireSource } from "react-native";

export type RootStackParamList = {
  Home: undefined;
  Product: { item: Item };
};
export interface SvgProps {
  size: number;
  color?: string;
}

export interface Item {
  key: string;
  label: string;
  color: string;
  image: ImageRequireSource;
}
