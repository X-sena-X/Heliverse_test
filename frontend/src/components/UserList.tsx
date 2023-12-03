import { UserData } from "@/lib/utils";
import UserCard from "./UserCard";

type Props = {};

export default function UserList({}: Props) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-x-3 gap-x-1 gap-y-5">
            {UserData.map((user, i) => UserCard({ user }))}
        </div>
    );
}
