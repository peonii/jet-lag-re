import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import styled from "styled-components/native";
import { RootStackParamList } from "../../types/nav";
import { LoginForm } from "./LoginForm";

const ScreenView = styled.View`
    flex: 1;
    background-color: #22223b;
`


type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginView: React.FC<Props> = (props) => {
    return (
        <ScreenView>
            <LoginForm />
        </ScreenView>
    )
}