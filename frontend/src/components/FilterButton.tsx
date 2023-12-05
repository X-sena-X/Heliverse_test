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
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "@/context/ContextProvider";

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
    const userContext = useContext(UserContext);
    const { setUserData, setIsLoading, setPage, FetchData } = userContext || {};

    useEffect(() => {
        filters.domains = filterDomain!;
        filters.gender = filterGender!;
        filters.availability = filterAvailability ? filterAvailability : null;

        const filter = `${
            filters.domains != null ? `domain=${filters.domains}&` : ""
        }${filters.gender != null ? `gender=${filters.gender}&` : ""}${
            filters.availability ? "available=true" : ""
        }`.trim();

        //console.log(typeof filter, filter);

        async function getData() {
            try {
                if (filter !== "") {
                    setIsLoading(true);

                    const response = await axios.get(
                        `${
                            import.meta.env.VITE_SERVER_URL
                        }/user/filters?${filter}`
                    );
                    const data = response.data.data;
                    if (!data) return;
                    setPage(1);
                    setUserData(data);
                    setIsLoading(false);
                } else {
                    setIsLoading(true);
                    const response = await axios.get(
                        `${import.meta.env.VITE_SERVER_URL}/user?page=1`
                    );
                    const data = response.data.data;
                    setPage(1);
                    if (!data) return;
                    setUserData(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        /* if (filter != "" || null || undefined) {
            console.log(filter);
            FetchData({ filter: filter, normal: false, searchText: null });
        } else {
            FetchData({ filter: null, normal: true, searchText: null });
        }*/

        getData();
    }, [filterDomain, filterGender, filterAvailability]);

    async function clearFilterAction() {
        setFilterDomain(null);
        setFilterGender(null);
        setFilterAvailability(null);

        try {
            setIsLoading(true);
            const response = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/user?page=1`
            );
            const data = response.data.data;
            if (!data) return;
            setPage(1);
            setUserData(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
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
                <PopoverContent className="w-48 lg:w-64 flex flex-col gap-y-4">
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
                            <AccordionTrigger className="">
                                Domain
                            </AccordionTrigger>
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
                                        <RadioGroupItem
                                            value="UI Designing"
                                            id="r5"
                                        />
                                        <Label htmlFor="r5">UI Designing</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="Business Development"
                                            id="r6"
                                        />
                                        <Label htmlFor="r6">
                                            Business Development
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="IT" id="r7" />
                                        <Label htmlFor="r7">IT</Label>
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
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="Bigender"
                                            id="Bigender"
                                        />
                                        <Label htmlFor="r2">Bigender</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="Agender"
                                            id="Agender"
                                        />
                                        <Label htmlFor="r2">Agender</Label>
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
