import FilterButton from "@/components/FilterButton";
import SearchInput from "@/components/SearchInput";
import UserList from "@/components/UserList";
import { UserType, cn } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/ContextProvider";
import { CreateTeamButton } from "@/components/CreateTeamButton";
import { X } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import axios from "axios";

import CreateUserButton from "@/components/CreateUserButton";

function Homepage() {
    //const dispatch = useDispatch();
    const userContext = useContext(UserContext);
    const {
        selectedUsers,
        setSelectedUsers,
        setUserData,
        setIsLoading,
        setPage,
        page,
        isFirstPage,
        isLastPage,
        FetchData,
    } = userContext || {};

    const onSearchTextChange = async (text: string) => {
        if (text === null || undefined || "") return;

        try {
            setIsLoading(true);
            setPage(1);
            const response = await axios.get(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/user/search?name=${text}&page=${page}`
            );
            const data = response.data.data;
            if (!data) return;
            setUserData(data);
            //console.log(data);
            setPage(1);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
        //FetchData({ searchText: text, normal: false, filter: null });
    };

    function RemoveUserFromTeam(user: UserType) {
        if (!selectedUsers) return;
        if (selectedUsers.length === 1) setSelectedUsers(null);
        setSelectedUsers(
            selectedUsers?.filter((item) => item.id != user.id) || null
        );
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/user?page=${page}`
                );
                const data = response.data.data;
                if (data) {
                    setUserData(data);
                    //console.log(data);
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();

        //FetchData({ searchText: null, normal: true, filter: null });
    }, [page]);

    /*
    useEffect(() => {
        FetchData({ searchText: null, normal: null, filter: null });
    }),
        [page];*/

    function decrementPage() {
        setPage(page > 1 ? page - 1 : page);
    }
    function incrementPage() {
        setPage(isLastPage ? page : page + 1);
    }

    return (
        <div className="w-screen min-h-screen max-h-fit mt-20 items-center dark:bg-black bg-white px-1 py-5 lg:p-5">
            <div className="w-full flex flex-col lg:flex-row justify-between px-4 lg:px-10">
                <div className="w-[80%] lg:w-1/3">
                    <SearchInput onInputChange={onSearchTextChange} />
                </div>
                <div className="flex flex-row gap-x-2 lg:gap-x-0 my-4 lg:my-0">
                    <FilterButton className="lg:mr-16" />
                    <CreateUserButton />
                </div>
            </div>
            <div className="w-screen h-[80%] lg:px-5 lg:py-4 py-1 mb-10 items-center flex flex-col">
                <UserList />
                <div className="join mt-2">
                    <button
                        className={cn("join-item btn", {
                            "disabled cursor-not-allowed": isFirstPage,
                        })}
                        onClick={() => decrementPage()}
                    >
                        «
                    </button>
                    <button className="join-item btn">
                        Page {page.toLocaleString()}
                    </button>
                    <button
                        className={cn("join-item btn", {
                            "disabled cursor-not-allowed": isLastPage,
                        })}
                        onClick={() => incrementPage()}
                    >
                        »
                    </button>
                </div>
            </div>

            {selectedUsers ? (
                <div className=" w-screen bg-black fixed bottom-0 flex flex-row justify-between px-10 py-2 items-center">
                    <div className="flex flex-row gap-x-6 items-center">
                        {selectedUsers.map((user) => (
                            <div className="flex flex-col text-white relative px-4">
                                <span>{user.firstName}</span>
                                <span>{user.domain}</span>
                                <span className="absolute top-0 -right-1">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger
                                                asChild
                                                onClick={() =>
                                                    RemoveUserFromTeam(user)
                                                }
                                                className=" cursor-pointer"
                                            >
                                                <X className="w-4 h-4" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Remove user</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </span>
                            </div>
                        ))}
                    </div>

                    <CreateTeamButton />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default Homepage;
