import { CreateTeamButton } from "@/components/CreateTeamButton";
import FilterButton from "@/components/FilterButton";
import SearchInput from "@/components/SearchInput";
import UserList from "@/components/UserList";
import { UserData } from "@/lib/utils";

function Homepage() {
    //const dispatch = useDispatch();
    const onSearchTextChange = (text: string) => {
        //dispatch(updateFilters("searchText", text));
    };

    return (
        <div className="w-screen min-h-screen max-h-fit mt-20 items-center dark:bg-black bg-white px-1 py-5 lg:p-5">
            <div className="w-full flex flex-col lg:flex-row justify-between px-4 lg:px-10">
                <div className="w-[80%] lg:w-1/3">
                    <SearchInput onInputChange={onSearchTextChange} />
                </div>
                <div className="flex flex-row gap-x-2 lg:gap-x-0 my-4 lg:my-0">
                    <FilterButton className="lg:mr-16" />
                    <CreateTeamButton userArray={UserData} />
                </div>
            </div>
            <div className="w-screen h-[80%] lg:px-5 lg:py-4 py-1">
                <UserList />
            </div>
        </div>
    );
}

export default Homepage;
