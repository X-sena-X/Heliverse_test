import React, { createContext, useState } from "react";

export type UserType = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    avatar: string;
    domain: string;
    available: boolean;
};

type UserProviderProps = {
    children: React.ReactNode;
};

type UserContextType = {
    selectedUsers: UserType[] | null;
    setSelectedUsers: (users: UserType[] | null) => void;
    userData: UserType[] | null;
    setUserData: (users: UserType[] | null) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
};
type UserDataType = {
    userData: UserType[] | null;
    setUserData: (users: UserType[] | null) => void;
};

const initUserContext: UserContextType = {
    selectedUsers: null,
    setSelectedUsers: () => {},
    userData: null,
    setUserData: () => {},
    isLoading: false,
    setIsLoading: () => {},
};

export const UserContext = createContext<UserContextType>(initUserContext);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [selectedUsers, setSelectedUsers] = useState<UserType[] | null>(null);
    const [userData, setUserData] = useState<UserType[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <UserContext.Provider
            value={{
                selectedUsers,
                setSelectedUsers,
                userData,
                setUserData,
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
