import Goals from "@/app/(userFacing)/dashboard/components/Goals";
import GroupDialogWrapper from "./GroupDialogWrapper";
import { type GroupType } from "./TasKGroupCard";

interface DashboardProps {
  postGroups: GroupType[];
}

export default function Dashboard({ postGroups }: DashboardProps) {
  return (
    <>
      {postGroups.length === 0 && (
        <>
          <div className="flex h-[calc(100dvh-80px)] w-full min-w-[2rem] items-center justify-center px-4 text-center text-2xl text-[#444444] dark:text-white">
            There are not any tasks available yet, creat one below with the icon
            :)
          </div>
          <div className="flex justify-center">
            <GroupDialogWrapper>
              <button className="absolute bottom-[4rem] mx-auto flex h-[40px] w-[40px] items-center justify-center rounded-full bg-blue-700 p-1 px-2">
                <PlusIcon />
              </button>
            </GroupDialogWrapper>
          </div>
        </>
      )}

      {postGroups.length > 0 && <Goals postGroups={postGroups} />}
    </>
  );
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      style={{ fill: "white" }}
    >
      <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
    </svg>
  );
}
