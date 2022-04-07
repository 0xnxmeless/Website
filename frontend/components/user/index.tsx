import { createContext, useContext } from "react";

type User = {
    username: string | unknown;
    uuid: string | unknown;
};

type UserProviderProps = {
    value: any;
    children: React.ReactNode;
};

interface IUserContext {
    user?: User;
    setUser?: any;
}

const defaultState = {
    user: {
        username: null,
        uuid: null,
    },
};

export const UserContext = createContext<IUserContext>(defaultState);

export const UserProvider = ({ value, children }: UserProviderProps) => {
    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
