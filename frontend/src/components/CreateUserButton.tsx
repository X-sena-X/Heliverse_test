import React from "react";
import {
    Dialog,
    DialogClose,
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Switch } from "./ui/switch";
import { useNavigate } from "react-router-dom";

type Props = {};

const formSchema = z.object({
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

function CreateUserButton({}: Props) {
    const navigate = useNavigate();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            avatar: "https://github.com/shadcn.png",
            available: true,
        },
    });

    async function onCreateNewUser(values: z.infer<typeof formSchema>) {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/user`,
                values
            );
            toast({
                title: "Success Created User.",
                description: `created a new User ${
                    values.firstName + " " + values.lastName
                }.`,
                duration: 3000,
                draggable: true,
                className: "bg-green-400",
            });
            navigate("/");
        } catch (error) {
            console.log(error);
            toast({
                title: "Uh oh! something went wrong",
                description: `error creating new user`,
                duration: 3000,
                draggable: true,
            });
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"default"} className="text-xs lg:text-base">
                    New user
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] lg:max-w-[650px]">
                <DialogHeader>
                    <DialogTitle>Create a new User</DialogTitle>
                    <DialogDescription>
                        Fill in the details of user. Click create when you're
                        done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onCreateNewUser)}
                        className="space-y-8"
                    >
                        <div className="grid gap-4 grid-cols-2 py-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem className="grid lg:col-span-1 lg:grid-cols-4 items-center lg:gap-4">
                                        <FormLabel className="text-right">
                                            FirstName
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
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem className="grid  lg:col-span-1 lg:grid-cols-4 items-center lg:gap-4">
                                        <FormLabel className="text-right">
                                            LastName
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
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="grid lg:col-span-1 lg:grid-cols-4 items-center lg:gap-4">
                                        <FormLabel className="text-right">
                                            Email
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
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem className="grid lg:col-span-1 lg:grid-cols-4 items-center lg:gap-4">
                                        <FormLabel className="text-right">
                                            Gender
                                        </FormLabel>
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
                                        <FormMessage className="col-span-4" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="domain"
                                render={({ field }) => (
                                    <FormItem className="grid lg:col-span-1 lg:grid-cols-4 items-center lg:gap-4">
                                        <FormLabel className="text-right">
                                            Domain
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="col-span-3">
                                                <FormControl>
                                                    <SelectValue placeholder="Select Domain" />
                                                </FormControl>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Sales">
                                                    Sales
                                                </SelectItem>
                                                <SelectItem value="Finance">
                                                    Finance
                                                </SelectItem>
                                                <SelectItem value="Marketing">
                                                    Marketing
                                                </SelectItem>
                                                <SelectItem value="Management">
                                                    Management
                                                </SelectItem>
                                                <SelectItem value="IT">
                                                    IT
                                                </SelectItem>
                                                <SelectItem value="UI Designing">
                                                    UI Designing
                                                </SelectItem>
                                                <SelectItem value="Business Development">
                                                    Business Development
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="col-span-4" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="available"
                                render={({ field }) => (
                                    <FormItem className="grid col-span-1 grid-cols-4 items-center gap-y-4 lg:gap-8">
                                        <FormLabel className="text-left lg:text-right col-span-3 lg:col-span-1">
                                            Availability
                                        </FormLabel>

                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage className="col-span-4" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <DialogClose>
                                <Button type="submit">Create</Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default CreateUserButton;

/**
 *  <FormField
                                control={form.control}
                                name="available"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label className="text-right">
                                            Availability
                                        </Label>
                                        <Checkbox
                                            onChange={field.onChange}
                                            value={field.value}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
 */
