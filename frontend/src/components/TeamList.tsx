import React, { useEffect } from "react";
import TeamCard from "./TeamCard";
import { UserType } from "@/lib/utils";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useContext } from "react";
import { UserContext } from "@/context/ContextProvider";
import { Skeleton } from "./ui/skeleton";

type Props = {};
interface TeamType {
    id: string;
    teamName: string;
    members: UserType[];
}

let TeamsData: Array<TeamType> = [];

function TeamList({}: Props) {
    const { toast } = useToast();
    const userContext = useContext(UserContext);
    const { isLoading, setIsLoading } = userContext || [];
    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/team`
                );

                const data = response.data.data;
                TeamsData = data;
                toast({
                    title: "Got the data",
                    variant: "default",
                });
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                toast({
                    title: "uh oh! something went wrong",
                    description: " error getting teams. Please try again..",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };
        //getData();
    });
    return (
        <div className="grid gap-x-1 gap-y-5 items-center justify-center">
            {isLoading ? (
                <div className=" gap-y-4">
                    <Skeleton className="w-full h-24" />
                    <Skeleton className="w-full h-24" />
                    <Skeleton className="w-full h-24" />
                </div>
            ) : TeamsData.length === 0 ? (
                <>
                    <TeamCard TeamsData={TeamsData} />

                    <span>No Team Found.. Create Teams</span>
                </>
            ) : (
                <TeamCard TeamsData={TeamsData} />
            )}
        </div>
    );
}

export default TeamList;
