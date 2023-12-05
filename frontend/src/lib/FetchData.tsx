"use client";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/ContextProvider";
import axios from "axios";

type Props = {
    filter: string | null;
    searchText: string | null;
    normal: boolean | null;
};

export default function FetchData({ filter, normal, searchText }: Props) {
    const userContext = useContext(UserContext);

    const {
        setIsFirstPage,
        setIsLastPage,
        setUserData,
        setIsLoading,
        setPage,
        page,
        userData,
        setIsFilter,
        setIsSearch,
        isFilter,
        isSearch,
    } = userContext || {};

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

    async function server() {
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
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
                return;
            }
        }
        if (isFilter) {
            try {
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
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
                return;
            }
        }
        if (normal || (!isFilter && !isSearch)) {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/user?page=${page}`
                );
                const data = response.data.data;
                if (!data) return;
                setUserData(data);
                if (userData?.length! < 20) setIsLastPage(true);
                if (page > 1) setIsFirstPage(false);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
                return;
            }
        }
    }
}
