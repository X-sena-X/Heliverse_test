import { Button } from "./ui/button";
import { UserType } from "@/lib/utils";
import { useContext } from "react";
import { UserContext } from "@/context/ContextProvider";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
type Props = {};

export function CreateTeamButton({}: Props) {
    const userContext = useContext(UserContext);
    const { selectedUsers } = userContext || {};
    function onCreateTeam() {}

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={"outline"}>Create Team</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create A new Team</DialogTitle>
                        <DialogDescription>
                            Ready to make the team click okay
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                defaultValue="Pedro Duarte"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Username
                            </Label>
                            <Input
                                id="username"
                                defaultValue=""
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
