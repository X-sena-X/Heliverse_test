import { Button } from "./ui/button";
import { UserType } from "@/lib/utils";
import { useContext } from "react";
import { UserContext } from "@/context/ContextProvider";

type Props = {};

export function CreateTeamButton({}: Props) {
    const userContext = useContext(UserContext);
    const { selectedUsers } = userContext || {};
    function onCreateTeam() {}

    return (
        <>
            <Button variant={"outline"} onClick={() => onCreateTeam()}>
                Create Team
            </Button>
        </>
    );
}
