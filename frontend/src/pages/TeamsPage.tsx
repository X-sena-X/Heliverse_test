import TeamList from "@/components/TeamList";

type Props = {};

function TeamsPage({}: Props) {
    return (
        <div className="w-screen min-h-screen max-h-fit mt-20 items-center dark:bg-black bg-white px-1 py-5 lg:p-5">
            <TeamList />
        </div>
    );
}

export default TeamsPage;
