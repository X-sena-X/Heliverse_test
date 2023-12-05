import { TeamData } from "@/lib/utils";
import React from "react";

type Props = {};

function TeamCard({}: Props) {
    return (
        <div className="w-[80%] h-fit">
            {TeamData.map((team, i) => (
                <div className="" key={i}>
                    <div className="">{team.teamName}</div>
                    <div className="">
                        {team.members.map((member, i) => (
                            <div></div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TeamCard;
