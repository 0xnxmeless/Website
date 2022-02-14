import { Context, createContext, useContext, useState } from "react";

type User = {
    username: string | unknown;
    uuid: string | unknown;
};

interface IUserContext {
    user?: User;
}

const defaultState = {
    user: {
        username: null,
        uuid: null,
    },
};

export const UserContext = createContext<IUserContext>(defaultState);

export const UserProvider = ({ value, children }: any) => {
    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
