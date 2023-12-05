import React, { createContext, useState } from "react";
import axios from "axios";

export type UserType = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    avatar: string;
    domain: string;
    available: boolean;
};

type FetchProps = {
    filter: string | null;
    searchText: string | null;
    normal: boolean | null;
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
    page: number;
    setPage: (page: number) => void;
    isLastPage: boolean;
    setIsLastPage: (isLastPage: boolean) => void;
    isFirstPage: boolean;
    setIsFirstPage: (isFirstPage: boolean) => void;
    isSearch: string | null;
    setIsSearch: (isSearch: string | null) => void;
    isFilter: string | null;
    setIsFilter: (isFilter: string | null) => void;
    FetchData: (props: FetchProps) => void;
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
    page: 1,
    setPage: () => {},
    isLastPage: false,
    setIsLastPage: () => {},
    isFirstPage: true,
    setIsFirstPage: () => {},
    isSearch: null,
    setIsSearch: () => {},
    isFilter: null,
    setIsFilter: () => {},
    FetchData: () => {},
};

export const UserContext = createContext<UserContextType>(initUserContext);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [selectedUsers, setSelectedUsers] = useState<UserType[] | null>(null);
    const [userData, setUserData] = useState<UserType[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [isLastPage, setIsLastPage] = useState<boolean>(false);
    const [isFirstPage, setIsFirstPage] = useState<boolean>(true);
    const [isSearch, setIsSearch] = useState<string | null>(null);
    const [isFilter, setIsFilter] = useState<string | null>(null);

    function FetchData({ filter, normal, searchText }: FetchProps) {
        if (filter) {
            setIsFilter(filter);
            setIsSearch(null);
            setIsFirstPage(true);
            setIsLastPage(false);
        }
        if (searchText) {
            setIsFilter(null);
            setIsSearch(searchText);
            setIsFirstPage(true);
            setIsLastPage(false);
        }
        if (normal) {
            setIsFilter(null);
            setIsSearch(null);
            setIsFirstPage(true);
            setIsLastPage(false);
        }

        async function callServer() {
            if (isSearch) {
                try {
                    setIsLoading(true);
                    const response = await axios.get(
                        `${
                            import.meta.env.VITE_SERVER_URL
                        }/user/search?name=${isSearch}&page=${page}`
                    );
                    const data = response.data.data;
                    if (!data) return;
                    setUserData(data);
                    if (userData?.length! < 20) setIsLastPage(true);
                    if (page > 1) setIsFirstPage(false);
                    return;
                } catch (error) {
                    console.log(error);
                } finally {
                    setIsLoading(false);
                    return;
                }
            }
            if (isFilter) {
                try {
                    setIsLoading(true);
                    const response = await axios.get(
                        `${
                            import.meta.env.VITE_SERVER_URL
                        }/user/filters?${filter}?page=${page}`
                    );
                    const data = response.data.data;
                    if (!data) return;

                    setUserData(data);
                    if (userData?.length! < 20) setIsLastPage(true);
                    if (page > 1) setIsFirstPage(false);
                    return;
                } catch (error) {
                    console.log(error);
                } finally {
                    setIsLoading(false);
                    return;
                }
            }
            if (normal || (!isFilter && !isSearch)) {
                try {
                    setIsLoading(true);
                    const response = await axios.get(
                        `${import.meta.env.VITE_SERVER_URL}/user?page=${page}`
                    );
                    const data = response.data.data;
                    if (!data) return;
                    setUserData(data);
                    if (userData?.length! < 20) setIsLastPage(true);
                    if (page > 1) setIsFirstPage(false);
                    return;
                } catch (error) {
                    console.log(error);
                } finally {
                    setIsLoading(false);
                    return;
                }
            }
        }
        callServer();
    }

    return (
        <UserContext.Provider
            value={{
                selectedUsers,
                setSelectedUsers,
                userData,
                setUserData,
                isLoading,
                setIsLoading,
                page,
                setPage,
                isLastPage,
                setIsLastPage,
                isFirstPage,
                setIsFirstPage,
                isSearch,
                setIsSearch,
                isFilter,
                setIsFilter,
                FetchData,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
