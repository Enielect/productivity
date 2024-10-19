import { formatGroupsAccWeekNum } from "@/server/db/queries/select";
import React, { ReactNode } from "react";
import SelectScrollable from "./components/SelectWeek";

const PerformanceLayout = async ({ children }: { children: ReactNode }) => {
  const weeksDict = await formatGroupsAccWeekNum();

  return (
    <div className="mt-[49px] px-3 md:mt-0">
      <div className="flex w-screen items-center justify-between border-b pr-5 md:w-full">
        <h2 className="py-3 text-lg font-semibold">
          Performance Characterization
        </h2>
        <SelectScrollable weeksDict={weeksDict!} />
      </div>
      {children}
    </div>
  );
};

export default PerformanceLayout;
