import React, { useEffect, useState, useContext } from "react";
import { Input } from "./ui/input";
import { Cross2Icon } from "@radix-ui/react-icons";
import { UserContext } from "@/context/ContextProvider";

type Props = {
    onInputChange: (text: string) => void;
};

function SearchInput({ onInputChange }: Props) {
    const userContext = useContext(UserContext);
    const { FetchData, setIsSearch } = userContext || {};
    const [searchValue, setSearchValue] = useState<string>("");

    useEffect(() => {
        if (searchValue != "") {
            onInputChange(searchValue);
        }
    }, [searchValue]);

    function clearInput() {
        setSearchValue("");
        FetchData({ searchText: null, normal: true, filter: null });
    }
    return (
        <div className="flex flex-row items-center relative">
            <Input
                type="text"
                placeholder="Search names..."
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
            />
            <Cross2Icon
                className="w-8 h-8 absolute right-0 hover:text-red-300"
                onClick={() => clearInput()}
            />
        </div>
    );
}

export default SearchInput;
