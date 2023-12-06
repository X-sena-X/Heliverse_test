import React, { useEffect, useState, useContext } from "react";
import { Input } from "./ui/input";
import { Cross2Icon } from "@radix-ui/react-icons";
import { UserContext } from "@/context/ContextProvider";
import { cn } from "@/lib/utils";

type Props = {
    onInputChange: (text: string) => void;
};

function SearchInput({ onInputChange }: Props) {
    const userContext = useContext(UserContext);
    const { FetchData, setIsSearch, isLoading } = userContext || {};
    const [searchValue, setSearchValue] = useState<string>("");

    useEffect(() => {
        if (searchValue != "") {
            if (!isLoading) {
                onInputChange(searchValue);
            } else return;
        }
    }, [searchValue]);

    function clearInput() {
        if (searchValue === "") return;
        setSearchValue("");
        FetchData({ searchText: null, normal: true, filter: null });
    }
    return (
        <div className="flex flex-row items-center relative group">
            <Input
                type="text"
                placeholder="Search names..."
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                //disabled={isLoading ? true : false}
            />
            <Cross2Icon
                className="flex  w-8 h-8 absolute right-0 "
                onClick={() => clearInput()}
            />
        </div>
    );
}

export default SearchInput;
