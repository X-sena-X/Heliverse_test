import React from "react";
import { Button } from "./ui/button";
import { UserType } from "@/lib/utils";

type Props = {
    userArray: Array<UserType>;
};

export function CreateTeamButton({ userArray }: Props) {
    return (
        <>
            <Button>Create Team</Button>
        </>
    );
}
