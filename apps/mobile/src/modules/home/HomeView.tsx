import React, { useContext } from "react";
import styled from 'styled-components/native'
import { AuthContext } from "../../context/AuthContext";
import { trpc } from "../../utils/trpc";
import { useSelf } from "../../hooks/useSelf";
import { Teams } from "./Teams";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/nav";

const ScreenView = styled.View`
    flex: 1;
    background-color: #22223b;
`

const Title = styled.Text`
    font-size: 20px;
    font-family: 'Inter-Bold';
    color: #4a4e69;
    margin: 15% 5% 
`

const TeamsText = styled.Text`
    font-size: 24px;
    font-family: 'Inter-Bold';
    color: #f2e9e4;
    margin: 5% 5% 0% 5%;
`

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeView: React.FC<Props> = ({ route, navigation }) => {
    const self = useSelf();

    if (!self.data) {
        return (
            <ScreenView>
                <Title>Loading...</Title>
            </ScreenView>
        )
    }

    return (
        <ScreenView>
            <Title>@{self.data.name}</Title>
            <TeamsText>Grupy</TeamsText>
            <Teams navigation={navigation} />
        </ScreenView>
    )
}