"use client";

import React, { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import { NotesByDateWrapper } from "../page";
import { useSearchParams } from "next/navigation";
import { searchUserNotes } from "@/server/db/queries/select";
import useDebounce from "@/app/hooks/useDebounce";
import { SelectNotes } from "@/server/db/schema";
import { Loader2 } from "lucide-react";

type WrapperProps = {
  notesByDate: Record<
    string,
    {
      id: number;
      createdAt: Date;
      updatedAt: Date | null;
      userId: string;
      title: string;
      content: string;
    }[]
  >;
  dayCreated: string[];
};

// const fetcher = (searchString: string) =>
//   searchUserNotes(searchString).then((res) => res);

const NoteDisplayWrapper = ({ dayCreated, notesByDate }: WrapperProps) => {
  const [searchedResult, setSearchResult] = useState<SelectNotes[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParam = useSearchParams();
  const searchValue = searchParam.get("search") ?? "";
  // const { data: searchResults } = useSWR(searchValue, debouncedFunction);

  const fetchSearchResults = useCallback(async (query: string) => {
    try {
      setLoading(true);
      const results = await searchUserNotes(query);
      setSearchResult(results);
      console.log(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // const debouncedFunction = useDebounce(fetchSearchResults, 200);
  useEffect(() => {
    if (searchValue.length > 0) {
      void fetchSearchResults(searchValue);
    }
  }, [searchValue, fetchSearchResults]);
  return (
    <div>
      {searchValue.length > 0 ? (
        <div>
          {/* <h3>Searched Result</h3> */}
          {loading ? (
            <div className="flex items-center h-[calc(100vh-200px)] justify-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <NotesByDateWrapper
              dayCreated={"SearchResult"}
              notes={searchedResult}
            />
          )}
          {/* Searched result */}
        </div>
      ) : (
        dayCreated?.map((day) => (
          <NotesByDateWrapper
            key={day}
            dayCreated={day}
            notes={notesByDate[day]!}
          />
        ))
      )}
    </div>
  );
};

export default NoteDisplayWrapper;
