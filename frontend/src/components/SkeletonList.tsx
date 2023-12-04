import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

type Props = {};

function SkeletonList({}: Props) {
    const Data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    return (
        <>
            {Data.map((user, i) => (
                <Card
                    key={i}
                    className="w-[180px] lg:w-[310px] hover:shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                >
                    <CardHeader>
                        <CardTitle className="flex flex-col items-center relative gap-y-2 text-base lg:text-2xl">
                            <Avatar className="w-18 h-18 lg:w-24 lg:h-24 bg-slate-300">
                                <Skeleton className="w-full h-full rounded" />
                            </Avatar>
                        </CardTitle>
                    </CardHeader>
                    <CardDescription className="text-base text-center lg:text-xl font-bold text-black dark:text-white">
                        <Skeleton className="w-24 h-4" />
                        <Skeleton className="w-24 h-4" />
                    </CardDescription>
                    <CardContent className="flex flex-col gap-y-2 pt-4">
                        <Skeleton className="w-full h-6" />
                        <Skeleton className="w-full h-6" />
                    </CardContent>
                </Card>
            ))}
        </>
    );
}

export default SkeletonList;
