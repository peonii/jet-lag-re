import React, { useContext } from "react";
import styled from 'styled-components/native'
import { AuthContext } from "../../context/AuthContext";
import { trpc } from "../../utils/trpc";

const ScreenView = styled.View`
    flex: 1;
    background-color: #22223b;
`

const Title = styled.Text`
    font-size: 20px;
    font-family: 'Inter-Bold';
    color: #f2e9e4;
    text-align: center;
    flex: 1;
    margin-top: 50%;
`


export const HomeView: React.FC = () => {
    const { sid } = useContext(AuthContext);
    const self = trpc.user.self.useQuery({ sid });

    if (!self.data) {
        return (
            <ScreenView>
                <Title>Loading...</Title>
            </ScreenView>
        )
    }

    return (
        <ScreenView>
            <Title>Home Screen</Title>
            <Title>{self.data.name}</Title>
        </ScreenView>
    )
}