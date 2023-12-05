import { UserType } from "@/lib/utils";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { useToast } from "./ui/use-toast";

type Props = {
    user: UserType;
};

const formSchema = z.object({
    id: z.string(),
    firstName: z.string().min(4, {
        message: "FirstName must be at least 4 characters.",
    }),
    lastName: z.string(),
    email: z
        .string({
            required_error: "Please enter a valid email address",
        })
        .email({
            message: "Not a valid email address",
        }),
    gender: z.string({
        required_error: "Please select a gender",
    }),
    avatar: z.string({
        required_error: "Please upload a avatar.",
    }),
    domain: z.string({
        required_error: "Please enter a domain.",
    }),
    available: z.boolean({
        required_error: "Please select availability.",
    }),
});

function EditButton({ user }: Props) {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
            domain: user.domain,
            gender: user.gender,
            available: user.available,
            email: user.email,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        //console.log(`${import.meta.env.VITE_SERVER_URL}/user/${values.id}`);
        console.log(values);
        console.log("here");

        try {
            /*const res = await axios.put(
                `${import.meta.env.VITE_SERVER_URL}/user/${values.id}`,
                values
            );
            toast({
                title: "Successfully updated the user",
                description: "Updated the user",
                className: "bg-green-400",
                duration: 3000,
            });*/
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full h-4 font-normal">
                    Edit user
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] lg:max-w-[600px]">
                <Form {...form}>
                    <form
                        className="space-y-8"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Make changes to user details. Click save when
                                you're done.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 grid-cols-2  py-4">
                            <div className="grid grid-cols-2 col-span-2 gap-y-4 gap-x-2">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label className="text-right">
                                                FirstName
                                            </Label>
                                            <Input
                                                className="col-span-3"
                                                {...field}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label className="text-right">
                                                LastName
                                            </Label>
                                            <Input
                                                className="col-span-3"
                                                {...field}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label
                                            htmlFor="gender"
                                            className="text-right"
                                        >
                                            Gender
                                        </Label>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="col-span-3">
                                                <FormControl>
                                                    <SelectValue placeholder="Select gender" />
                                                </FormControl>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Male">
                                                    Male
                                                </SelectItem>
                                                <SelectItem value="Female">
                                                    Female
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label className="text-right">
                                            Email
                                        </Label>
                                        <Input
                                            className="col-span-3"
                                            {...field}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="domain"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label className="text-right">
                                            Domain
                                        </Label>
                                        <Input
                                            className="col-span-3"
                                            {...field}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="available"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label
                                            htmlFor="gender"
                                            className="text-right"
                                        >
                                            Gender
                                        </Label>
                                        <Select
                                            onValueChange={(value) =>
                                                value === "Available"
                                                    ? form.setValue(
                                                          "available",
                                                          true
                                                      )
                                                    : form.setValue(
                                                          "available",
                                                          false
                                                      )
                                            }
                                            defaultValue={
                                                field.value
                                                    ? "Available"
                                                    : "Unavailable"
                                            }
                                        >
                                            <SelectTrigger className="col-span-3">
                                                <FormControl>
                                                    <SelectValue placeholder="Select Availability" />
                                                </FormControl>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Available">
                                                    Available
                                                </SelectItem>
                                                <SelectItem value="Unavailable">
                                                    Unavailable
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default EditButton;
