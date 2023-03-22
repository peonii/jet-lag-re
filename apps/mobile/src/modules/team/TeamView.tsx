import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { RootStackParamList, TeamTabParamList, TeamTabProps } from "../../types/nav";
import { LoggedInStatus } from './LoggedInStatus';
import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MoneyView } from './money/MoneyView';
import { TrackerView } from './tracker/TrackerView';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator<TeamTabParamList>();

type Props = NativeStackScreenProps<RootStackParamList, 'Team'>;

const TabView = styled.View`
    background-color: #000000;
`

type RouteIconType = {
    [key in keyof TeamTabParamList]: 'wallet-outline' | 'star-outline' | 'navigate-circle-outline' | 'checkbox-outline'
}

const routeIconNames: RouteIconType = {
    'Money': 'wallet-outline',
    'Powerups': 'star-outline',
    'Tracker': 'navigate-circle-outline',
    'Quests': 'checkbox-outline'
}

export const TeamView: React.FC<Props> = ({ route, navigation }) => {
    return (
        <Tab.Navigator
            screenOptions = {({ route }) => ({
                headerShown: false,
                tabBarActiveBackgroundColor: "#3a3e59",
                tabBarInactiveBackgroundColor: "#22223b",
                tabBarStyle: {
                    borderTopWidth: 0,
                },
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    const name = routeIconNames[route.name];

                    if (!name) throw new Error('s');

                    return <Ionicons name={name} size={size} color={color} />
                },
                tabBarActiveTintColor: '#f2e9e4',
                tabBarInactiveTintColor: '#a29994'
            })}
            tabBar={(props) => {
                return (
                    <TabView>
                        <BottomTabBar {...props} />
                    </TabView>
                )
            }}
        >
            <Tab.Screen name="Money" component={MoneyView} initialParams={{ teamId: route.params.teamId }} /> 
            <Tab.Screen name="Tracker" component={TrackerView} initialParams={{ teamId: route.params.teamId }} /> 
        </Tab.Navigator>
    )
}