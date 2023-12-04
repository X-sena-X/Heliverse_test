//import { UserData } from "@/lib/utils";
import UserCard from "./UserCard";
import { useContext } from "react";
import { UserContext } from "@/context/ContextProvider";
import SkeletonList from "./SkeletonList";

type Props = {};

export default function UserList({}: Props) {
    const userContext = useContext(UserContext);
    const { userData, isLoading } = userContext || [];
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-x-3 gap-x-1 gap-y-5">
            {isLoading ? (
                <SkeletonList />
            ) : userData ? (
                userData.map((user, i) => UserCard({ user, key: i }))
            ) : (
                <>No user found</>
            )}
        </div>
    );
}
