import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";

type Props = {
    onInputChange: (text: string) => void;
};

function SearchInput({ onInputChange }: Props) {
    const [searchValue, setSearchValue] = useState<string>("");

    useEffect(() => {
        async function call() {
            onInputChange(searchValue);
        }
        if (searchValue != "") {
            call();
        }
    }, [searchValue]);

    return (
        <>
            <Input
                type="text"
                placeholder="Search names..."
                onChange={(e) => setSearchValue(e.target.value)}
            />
        </>
    );
}

export default SearchInput;
