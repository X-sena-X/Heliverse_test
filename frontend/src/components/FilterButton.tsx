import React from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Input } from "./ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "./ui/checkbox";
type Props = {
    className: string;
};

const FilterButton = ({ className }: Props) => {
    return (
        <div className={className}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-x-2">
                        <PlusIcon />
                        Add filters
                    </Button>
                </PopoverTrigger>
                <Button variant={"destructive"} className=" ml-5">
                    Clear Filters
                </Button>
                <PopoverContent className="w-72 flex flex-col gap-y-4">
                    <div className="flex items-center space-x-4">
                        <Checkbox id="Domains" />
                        <Label htmlFor="Domains" className=" text-base">
                            Domains
                        </Label>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Checkbox id="Availability" />
                        <Label htmlFor="Availability" className=" text-base">
                            Available
                        </Label>
                    </div>
                    <Select>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Select a Gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="others">Others</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default FilterButton;
