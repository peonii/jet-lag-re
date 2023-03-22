import React, { useContext } from "react";
import styled from "styled-components/native";
import { AuthContext } from "../../../context/AuthContext";
import { trpc } from "../../../utils/trpc";

type Props = {
    teamId: string;
}

const Money = styled.Text`
    color: #f2e9e4;
    font-size: 80px;
    font-family: 'Inter-Bold';
    text-align: center;
`

export const MoneyDisplay: React.FC<Props> = ({ teamId }) => {
    const { sid } = useContext(AuthContext);
    const money = trpc.team.get.useQuery({ sid, id: teamId });

    if (!money.data) {
        return (
            <Money>...</Money>
        )
    }

    return (
        <Money>
            ${money.data.balance}
        </Money>
    )
}