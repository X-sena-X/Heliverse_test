import { useEffect, useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

type filtersType = {
    availability: null | CheckedState;
    gender: null | string;
    domains: null | string;
};

let filters: filtersType = {
    gender: null,
    domains: null,
    availability: null,
};

type Props = {
    className: string;
};

const FilterButton = ({ className }: Props) => {
    const [filterDomain, setFilterDomain] = useState<string | null>(null);
    const [filterGender, setFilterGender] = useState<string | null>(null);
    const [filterAvailability, setFilterAvailability] =
        useState<CheckedState | null>(null);

    useEffect(() => {
        filters.domains = filterDomain!;
        filters.gender = filterGender!;
        filters.availability = filterAvailability ? filterAvailability : null;
        console.log(filters);
    }, [filterDomain, filterGender, filterAvailability]);

    function clearFilterAction() {
        setFilterDomain("");
        setFilterGender("");
        setFilterAvailability(null);
    }
    return (
        <div className={className}>
            <Popover>
                <div className="flex flex-row">
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="gap-x-2">
                            <PlusIcon />
                            Add filters
                        </Button>
                    </PopoverTrigger>
                    <Button
                        variant="destructive"
                        className="ml-2 lg:ml-5"
                        onClick={() => clearFilterAction()}
                    >
                        Clear Filters
                    </Button>
                </div>
                <PopoverContent className="w-72 flex flex-col gap-y-4">
                    <div className="flex items-center space-x-4">
                        <Checkbox
                            id="Availability"
                            checked={filterAvailability!}
                            onCheckedChange={(value) =>
                                setFilterAvailability(value)
                            }
                        />
                        <Label htmlFor="Availability" className=" text-base">
                            Available
                        </Label>
                    </div>
                    <Accordion type="multiple" className="w-full">
                        <AccordionItem value="domain">
                            <AccordionTrigger>Domain</AccordionTrigger>
                            <AccordionContent>
                                <RadioGroup
                                    onValueChange={(value) => {
                                        setFilterDomain(value);
                                        console.log(value);
                                    }}
                                    defaultValue={filterDomain!}
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="Sales"
                                            id="sales"
                                        />
                                        <Label htmlFor="sales">Sales</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="Finance"
                                            id="r2"
                                        />
                                        <Label htmlFor="r2">Finance</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="Marketing"
                                            id="r3"
                                        />
                                        <Label htmlFor="r3">Marketing</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="Management"
                                            id="r4"
                                        />
                                        <Label htmlFor="r4">Management</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="UI" id="r5" />
                                        <Label htmlFor="r5">UI</Label>
                                    </div>
                                </RadioGroup>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="gender">
                            <AccordionTrigger className="">
                                Gender
                            </AccordionTrigger>
                            <AccordionContent>
                                <RadioGroup
                                    onValueChange={(value) =>
                                        setFilterGender(value)
                                    }
                                    defaultValue={filterGender!}
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="Male"
                                            id="male"
                                        />
                                        <Label htmlFor="sales">Male</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="Female"
                                            id="female"
                                        />
                                        <Label htmlFor="r2">Female</Label>
                                    </div>
                                </RadioGroup>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default FilterButton;
