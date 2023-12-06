import { TeamData, UserType } from "@/lib/utils";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface TeamType {
    id: string;
    name: string;
    members: UserType[];
}

type Props = {
    TeamsData: Array<TeamType>;
};

function TeamCard({ TeamsData }: Props) {
    return (
        <div className="grid w-full h-fit gap-y-2 lg:gap-y-4">
            {TeamsData.map((team, i) => (
                <Card key={i} className=" p-4">
                    <CardHeader>
                        <CardTitle>
                            <span className=" text-violet-600">
                                {team.name}
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-x-2">
                        {team.members.map((member, i) => (
                            <Card className="col-span-1 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                                <CardHeader className=" items-center">
                                    <CardTitle className=" text-base lg:text-xl">
                                        {member.firstName +
                                            " " +
                                            member.lastName}
                                    </CardTitle>
                                    <Avatar className="w-18 h-18 lg:w-24 lg:h-24">
                                        <AvatarImage
                                            src={member.avatar}
                                            className="w-18 h-18 rounded-full"
                                        />
                                        <AvatarFallback>
                                            User logo
                                        </AvatarFallback>
                                    </Avatar>
                                </CardHeader>
                                <CardContent className=" flex flex-col">
                                    <div className="text-xs lg:text-base">
                                        <span className=" font-semibold ">
                                            Domain:{"  "}
                                        </span>
                                        {member.domain}
                                    </div>
                                    <div className="text-xs lg:text-base">
                                        <span className=" font-semibold ">
                                            Email:{"  "}
                                        </span>
                                        {member.email}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Card>
            ))}
        </div>
    );
}

export default TeamCard;
