import React, { createContext, useState } from "react";

export type UserType = {
    id: number;
    first_name: string;
    last_name: string;
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
};

const initUserContext: UserContextType = {
    selectedUsers: null,
    setSelectedUsers: () => {},
};

export const UserContext = createContext<UserContextType>(initUserContext);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [selectedUsers, setSelectedUsers] = useState<UserType[] | null>(null);

    return (
        <UserContext.Provider
            value={{
                selectedUsers,
                setSelectedUsers,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
