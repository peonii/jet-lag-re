import React from 'react';
import styled from 'styled-components/native';
import { MoneyDisplay } from './MoneyDisplay';
import { TeamTabProps } from "../../../types/nav";

const ScreenView = styled.View`
    flex: 1;
    background-color: #22223b;
    justify-content: center;
    align-items: center;
`

type Props = TeamTabProps<'Money'>;

export const MoneyView: React.FC<Props> = ({ route, navigation }) => {
    return (
        <ScreenView>
            <MoneyDisplay {...route.params} />
        </ScreenView>
    )
}