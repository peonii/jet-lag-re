import React from "react";

export type LoginContextType = {
    loggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
};

export const LoginContext = React.createContext<LoginContextType>({ loggedIn: false, setLoggedIn: () => { } });