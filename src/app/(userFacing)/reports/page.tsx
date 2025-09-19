import { formatGroupsAccWeekNum } from "@/server/db/queries/select";
import Link from "next/link";
import React from "react";

const generateRandownLightColors = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const ReportsPage = async () => {
  const weeksDict = await formatGroupsAccWeekNum();

  if (weeksDict) {
    const dictKeys = Object.keys(weeksDict);

    return (
      <div className="mt-2 space-y-4 px-3 md:mt-3">
        {dictKeys.map((key) => (
          <ListItem key={key} url={key} />
        ))}
      </div>
    );
  }
  return (
    <div className="flex h-screen w-full items-center justify-center">
      Note enough data show report (create a new task/taskGroup to see report)
    </div>
  );
};

function ListItem({ url }: { url: string }) {
  const style = { "--bg-Color": generateRandownLightColors() };
  return (
    <Link
      href={`/reports/${url}`}
      style={style as React.CSSProperties}
      className="block rounded-md bg-[var(--bg-Color)] bg-opacity-50 px-3 py-2"
    >
      Week {url.split("-")[0]} of {url.split("-")[1]}
    </Link>
  );
}

export default ReportsPage;
