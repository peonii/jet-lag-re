import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type TeamId = { teamId: string };

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Team: TeamId;
};

export type MessageNavProps<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};

export type TeamTabParamList = {
  Money: TeamId;
  Powerups: TeamId;
  Tracker: TeamId;
  Quests: TeamId;
}

export type TeamTabProps<T extends keyof TeamTabParamList> = {
  navigation: BottomTabNavigationProp<TeamTabParamList, T>;
  route: RouteProp<TeamTabParamList, T>;
}