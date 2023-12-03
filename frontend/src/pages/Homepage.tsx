import FilterButton from "@/components/FilterButton";
import SearchInput from "@/components/SearchInput";
import UserList from "@/components/UserList";
import { UserData } from "@/lib/utils";
import { useContext, useState } from "react";
import { UserContext } from "@/context/ContextProvider";
import { CreateTeamButton } from "@/components/CreateTeamButton";

function Homepage() {
    //const dispatch = useDispatch();
    const userContext = useContext(UserContext);
    const { selectedUsers, setSelectedUsers } = userContext || {};
    const onSearchTextChange = (text: string) => {
        //dispatch(updateFilters("searchText", text));
    };
    const [page, setPage] = useState<Number>(1);
    return (
        <div className="w-screen min-h-screen max-h-fit mt-20 items-center dark:bg-black bg-white px-1 py-5 lg:p-5">
            <div className="w-full flex flex-col lg:flex-row justify-between px-4 lg:px-10">
                <div className="w-[80%] lg:w-1/3">
                    <SearchInput onInputChange={onSearchTextChange} />
                </div>
                <div className="flex flex-row gap-x-2 lg:gap-x-0 my-4 lg:my-0">
                    <FilterButton className="lg:mr-16" />
                </div>
            </div>
            <div className="w-screen h-[80%] lg:px-5 lg:py-4 py-1 mb-10 items-center flex flex-col">
                <UserList />
                <div className="join mt-2">
                    <button className="join-item btn">«</button>
                    <button className="join-item btn">
                        Page {page.toLocaleString()}
                    </button>
                    <button className="join-item btn">»</button>
                </div>
            </div>

            {selectedUsers ? (
                <div className=" w-screen bg-black fixed bottom-0 flex flex-row justify-between px-10 py-2 items-center">
                    <div className="flex flex-row gap-x-6 items-center">
                        {selectedUsers.map((user) => (
                            <div className="flex flex-col text-white relative">
                                <span>{user.first_name}</span>
                                <span>{user.domain}</span>
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
