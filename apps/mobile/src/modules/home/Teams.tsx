import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { trpc } from '../../utils/trpc';
import styled from "styled-components/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/nav";

const Loading = styled.Text`
    font-size: 12px;
    font-family: 'Inter';
    color: #f2e9e4;
`

const TeamsView = styled.ScrollView`
    flex: 1;
`

const Team = styled.TouchableOpacity`
    background-color: #4a4e69;
    padding: 10px;
    margin: 10px 20px;
    border-radius: 6px;
`

const TeamName = styled.Text`
    font-size: 18px;
    font-family: 'Inter-Bold';
    color: #f2e9e4;
`

const TeamBalance = styled.Text`
    font-size: 14px;
    font-family: 'Inter';
    color: #f2e9e4;
`

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Home", undefined>
}

export const Teams: React.FC<Props> = ({ navigation }) => {
    const { sid } = useContext(AuthContext);
    const teams = trpc.team.getAll.useQuery({ sid });

    if (!teams.data) {
        return (
            <Loading>...</Loading>
        )
    }

    return (
        <TeamsView>
            {teams.data.map(team => (
                <Team key={team.id} onPress={() => { navigation.navigate('Team', { teamId: team.id }) }}>
                    <TeamName>{team.name}</TeamName>
                    <TeamBalance>${team.balance}</TeamBalance>
                </Team>
            ))}
        </TeamsView>
    )
}