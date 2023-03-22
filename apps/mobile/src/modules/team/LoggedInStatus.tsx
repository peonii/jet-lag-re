import React, { useContext } from "react";
import styled from "styled-components/native";
import { AuthContext } from "../../context/AuthContext";
import { trpc } from "../../utils/trpc";

type Props = {
    teamId: string;
}

const Team = styled.Text`
    color: #8a8ea9;
    font-size: 20;
    font-family: 'Inter';
    text-align: center;
`

export const LoggedInStatus: React.FC<Props> = ({ teamId }) => {
    const { sid } = useContext(AuthContext);
    const team = trpc.team.get.useQuery({ sid, id: teamId });

    if (!team.data) {
        return (
            <Team>
                ...
            </Team>
        )
    }

    return (
        <Team>
            {team.data.name}
        </Team>
    )
}