import { UserType, cn } from "@/lib/utils";
import React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type Props = {
    user: UserType;
};

function UserCard({ user }: Props) {
    return (
        <Card className="w-[180px] lg:w-[310px] hover:shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <CardHeader>
                <CardTitle className="flex flex-col items-center relative gap-y-2 text-base lg:text-2xl">
                    <Avatar className="w-10 h-10 lg:w-18 lg:h-18 rounded-full">
                        <AvatarImage
                            src={user.avatar}
                            className="w-18 h-18 rounded-full"
                        />
                        <AvatarFallback>User logo</AvatarFallback>
                    </Avatar>
                    <Badge
                        className={cn(
                            "hidden absolute top-1 right-0 lg:flex justify-end",
                            {
                                "bg-green-400 hover:bg-green-600":
                                    user.available,
                            },
                            { "bg-red-300 hover:bg-red-600": !user.available }
                        )}
                    >
                        {user.available ? "Available" : "unavailable"}
                    </Badge>

                    {user.first_name + " " + user.last_name}
                </CardTitle>
                <CardDescription className="flex flex-col gap-y-2 pt-10">
                    <span className="flex flex-row gap-x-2">
                        <p className="text-xs lg:text-base  font-bold">
                            Domain:
                        </p>
                        {user.domain}
                    </span>
                    <span className="flex flex-row gap-x-2">
                        <p className="text-xs lg:text-base  font-bold">
                            Gender:
                        </p>
                        {user.gender}
                    </span>
                    <span className="flex flex-row gap-x-2 truncate	">
                        <p className="text-xs lg:text-base font-bold ">
                            Email:
                        </p>
                        {user.email}
                    </span>
                </CardDescription>
            </CardHeader>
        </Card>
    );
}

export default UserCard;
