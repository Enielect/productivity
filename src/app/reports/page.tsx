import { formatGroupsAccWeekNum } from "@/server/db/queries/select";
import Link from "next/link";
import React from "react";

const generateRandownLightColors = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const ReportsPage = async () => {
  const weeksDict = await formatGroupsAccWeekNum();
  const dictKeys = Object.keys(weeksDict);
  return (
    <div>
      {dictKeys.map((key) => (
        <ListItem key={key} url={key} />
      ))}
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
