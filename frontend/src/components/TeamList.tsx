import React from "react";
import TeamCard from "./TeamCard";

type Props = {};

function TeamList({}: Props) {
    return (
        <div className="grid grid-cols-2 gap-x-1 gap-y-5">
            <TeamCard />
        </div>
    );
}

export default TeamList;
