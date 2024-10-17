"use client";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
import { getWeekNumber } from "@/lib/helpers";

export function RightCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const router = useRouter();
  const currentWeekString = `${getWeekNumber(date!)}-${date!.getFullYear()}`;
  const reg = /\//g;
  const dayFormat = date?.toLocaleDateString().replace(reg, "-");

  //This was unintentional. I remembered that javascript compares obnects by reference,
  //but again, I wouldn't want to call the router.push function in the render method.
  //I would rather use a useEffect hook to handle this.(MAYBE THIS WOULD BE BETTER)
  if (date !== new Date()) {
    router.push(`/reports/${currentWeekString}/${dayFormat}`);
  }

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  );
}
