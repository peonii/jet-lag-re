import React from "react";

export type AuthContextType = {
    sid: string;
    setSid: (sid: string) => void;
};

export const AuthContext = React.createContext<AuthContextType>({ sid: "", setSid: () => { } });