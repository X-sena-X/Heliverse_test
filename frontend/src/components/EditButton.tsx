import React from "react";
import { UserType, cn } from "@/lib/utils";
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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
type Props = {
    user: UserType;
};

const formSchema = z.object({
    id: z.number(),
    firstname: z.string().min(4, {
        message: "FirstName must be at least 4 characters.",
    }),
    lastname: z.string(),
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
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: user.id,
            firstname: user.first_name,
            lastname: user.last_name,
            avatar: user.avatar,
            domain: user.domain,
            gender: user.gender,
            available: user.available,
            email: user.email,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full h-4 font-normal">
                    Edit user
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] lg:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to user details. Click save when you're
                        done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <div className="grid gap-4 grid-cols-2  py-4">
                            <div className="grid grid-cols-2 col-span-2 gap-y-4 gap-x-2">
                                <FormField
                                    control={form.control}
                                    name="firstname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label
                                                htmlFor="firstname"
                                                className="text-right"
                                            >
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
                                    name="lastname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label
                                                htmlFor="LastName"
                                                className="text-right"
                                            >
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
