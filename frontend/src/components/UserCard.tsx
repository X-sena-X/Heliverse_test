import { UserType, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import EditButton from "./EditButton";
import { MoreHorizontal } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useContext } from "react";
import { UserContext } from "@/context/ContextProvider";
import { useToast } from "@/components/ui/use-toast";

type Props = {
    user: UserType;
};

type SelectedUserType = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    avatar: string;
    domain: string;
    available: boolean;
};
function UserCard({ user }: Props) {
    const { toast } = useToast();
    const userContext = useContext(UserContext);
    const { selectedUsers, setSelectedUsers } = userContext || {};

    const CheckTeamEligibility = ({ newUser }: { newUser: UserType }) => {
        if (!newUser.available) {
            toast({
                title: "Uh oh! This user cannot be added to the team.",
                variant: "destructive",
                description: "User not available currently.",
            });
            return;
        }

        if (!selectedUsers) {
            setSelectedUsers([newUser]);
            return;
        }

        if (selectedUsers.some((user) => user.id === newUser.id)) {
            toast({
                title: "Uh oh! This user cannot be added to the team.",
                variant: "destructive",
                description: "User already selected.",
            });
            return;
        }

        if (selectedUsers.some((user) => user.domain === newUser.domain)) {
            toast({
                title: "Uh oh! This user cannot be added to the team.",
                variant: "destructive",
                description: "User in the same domain.",
            });
            return;
        }

        setSelectedUsers([...selectedUsers, newUser]);
    };

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
                            "absolute -top-4 lg:top-1 -left-4 lg:left-0 lg:flex justify-end text-[10px] py-0 lg:text-xs ",
                            {
                                "bg-green-400 hover:bg-green-600":
                                    user.available,
                            },
                            { "bg-red-300 hover:bg-red-600": !user.available }
                        )}
                    >
                        {user.available ? "Available" : "unavailable"}
                    </Badge>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 absolute top-1 right-0"
                            >
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-5 w-5 " />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        user.id.toString()
                                    )
                                }
                            >
                                Copy User ID
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    CheckTeamEligibility({ newUser: user })
                                }
                            >
                                Add To Team
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <Dialog>
                                <DialogTrigger>
                                    <DropdownMenuItem
                                        onSelect={(e) => e.preventDefault()}
                                        className="w-full"
                                    >
                                        <EditButton user={user} />
                                    </DropdownMenuItem>
                                </DialogTrigger>
                            </Dialog>
                            <Dialog>
                                <DialogTrigger>
                                    <DropdownMenuItem
                                        onSelect={(e) => e.preventDefault()}
                                        className="w-full text-red-500"
                                    >
                                        Delete item
                                    </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Are you sure absolutely sure?
                                        </DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. This
                                            will permanently delete your account
                                            and remove your data from our
                                            servers.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <Button variant="default">
                                            Cancel
                                        </Button>
                                        <Button variant="destructive">
                                            Delete
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardTitle>
            </CardHeader>
            <CardDescription className="text-base text-center lg:text-xl font-bold">
                {user.first_name + " " + user.last_name}
            </CardDescription>

            <CardContent className="flex flex-col gap-y-2 pt-4">
                <span className="grid grid-cols-4 gap-x-2 text-xs lg:text-base">
                    <p className="col-span-2 lg:col-span-1   font-semibold">
                        Gender:
                    </p>
                    {user.gender}
                </span>
                <span className="grid grid-cols-4 gap-x-2 text-xs lg:text-base">
                    <p className="col-span-2 lg:col-span-1   font-semibold">
                        Domain:
                    </p>
                    <p className="col-span-2">{user.domain}</p>
                </span>
                <span className="grid grid-cols-4 gap-x-2 truncate	text-xs lg:text-base">
                    <p className="col-span-2 lg:col-span-1  font-semibold ">
                        Email:
                    </p>
                    {user.email}
                </span>
            </CardContent>
        </Card>
    );
}

export default UserCard;
