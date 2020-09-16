import { ImageRequireSource } from "react-native";

export type RootStackParamList = {
  Home: undefined;
  Movie: { item: Response };
};
export interface SvgProps {
  size: number;
  color?: string;
}

export interface Response {
  id: number;
  video: boolean;
  vote_count: number;
  vote_average: number;
  title: string;
  release_date: string;
  original_language: string;
  original_title: string;
  original_name?: string;
  genre_ids: Array<number>;
  backdrop_path: ImageRequireSource;
  adult: boolean;
  overview: string;
  poster_path: string | ImageRequireSource;
  popularity: number;
  media_type: "tv" | "movie";
}
