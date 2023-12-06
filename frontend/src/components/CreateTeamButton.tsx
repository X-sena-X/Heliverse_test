import { Button } from "./ui/button";
import { UserType } from "@/lib/utils";
import { useContext, useEffect } from "react";
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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { useToast } from "./ui/use-toast";

type Props = {};

const formSchema = z.object({
    teamname: z.string().min(2, {
        message: "teamname must be at least 4 characters.",
    }),
    users: z.array(z.string()),
});

export function CreateTeamButton({}: Props) {
    const userContext = useContext(UserContext);
    const { selectedUsers } = userContext || [];
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            teamname: "",
            users: selectedUsers!.map((user) => user.id),
        },
    });
    async function onCreateTeam(values: z.infer<typeof formSchema>) {
        console.log(values);

        try {
            toast({
                title: "Creating Team",
                duration: 2000,
            });
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/team/`,
                { name: values.teamname, users: values.users }
            );
            toast({
                title: "Successfully created team",
                description: `created ${values.teamname} successfully`,
            });
        } catch (error) {
            console.log(error);
            toast({
                title: "Uh oh! something went wrong",
                variant: "destructive",
                description: `Error creating team. Please try again..`,
            });
        } finally {
        }
    }
    useEffect(() => {
        form.setValue(
            "users",
            selectedUsers!.map((user) => user.id)
        );
    }, [selectedUsers]);
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
                            Ready to make the team. Click submit
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onCreateTeam)}
                            className="space-y-8"
                        >
                            <div className="grid gap-4 py-4">
                                <FormField
                                    control={form.control}
                                    name="teamname"
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right">
                                                Team Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className="col-span-3"
                                                />
                                            </FormControl>
                                            <FormMessage className="col-span-4" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <DialogFooter>
                                <Button type="submit">Create</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}
