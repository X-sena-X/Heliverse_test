import { UserType } from "@/lib/utils";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useToast } from "./ui/use-toast";
import { Switch } from "@/components/ui/switch";

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
    console.log(user);
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
        console.log(values);
        async function UpdateData() {
            try {
                const res = await axios.put(
                    `${import.meta.env.VITE_SERVER_URL}/user/${values.id}`,
                    values
                );
                toast({
                    title: "Successfully updated the user",
                    description: "Updated the user",
                    className: "bg-green-400",
                    duration: 3000,
                });
            } catch (error) {
                console.log(error);
                toast({
                    title: "uh oh!! something went wrong",
                    description: "Please try again later!",
                    variant: "destructive",
                    duration: 3000,
                });
            }
        }
        UpdateData();
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
                        className="space-y-8"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="grid gap-4 grid-cols-2  py-4">
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
                                        <FormControl>
                                            <Input
                                                className="col-span-3"
                                                {...field}
                                            />
                                        </FormControl>
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

                                        <FormMessage />
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
                                <Button type="submit">Save changes</Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default EditButton;

/**
 * 
 * <Form {...form}>
                    <form
                        className="space-y-8"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
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
                                        <FormControl>
                                            <Input
                                                className="col-span-3"
                                                {...field}
                                            />
                                            <FormMessage />
                                        </FormControl>
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

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="available"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Availability
                                            </FormLabel>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
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
 */
