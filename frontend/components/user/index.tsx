import { Context, createContext, useState } from "react";

export type User = {
    username?: string;
    uuid?: string;
};

export type UserObject = {
    user?: User;
};

export const UserContext: Context<any> = createContext(null);

export const UserProvider = ({ value, children }: any) => {
    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

export const useUser = () => createContext(UserContext);
