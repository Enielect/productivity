import { auth } from "@/auth";

import { formatNotesAccDay, getNotes } from "@/server/db/queries/select";
import type { SelectNotes } from "@/server/db/schema";
import { redirect } from "next/navigation";
import React from "react";
import AddNote from "./component/AddNote";
import Notecard from "./component/Notecard";
import { ScrollArea } from "@/components/ui/scroll-area";
import NoteDisplayWrapper from "./component/NoteDisplayWrapper";
import SearchBar from "@/components/SearchBar";

//organize notes by date created

const NotesPage = async () => {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const allUserNotes = await getNotes(session.user.id);
  const notesByDate = await formatNotesAccDay(allUserNotes);
  const dayCreated = Object.keys(notesByDate);
  return (
    <div className="w-full px-6">
      {allUserNotes.length > 0 ? (
        <div className="grid">
          <div className="flex h-[3rem] w-[calc(100%-480px)] items-center bg-white">
            <h1 className="text-xl font-semibold"> Notes</h1>{" "}
            {/* <Input placeholder="search" className="ml-10" /> */}
            <SearchBar />
          </div>
          <ScrollArea className="h-[calc(100dvh-3rem-60px)] pb-[3rem] pr-5">
            <NoteDisplayWrapper
              dayCreated={dayCreated}
              notesByDate={notesByDate}
            />
          </ScrollArea>
        </div>
      ) : (
        <div className="flex items-center">Add your first Note today</div>
      )}
      <AddNote />
    </div>
  );
};

type WrapperProps = {
  dayCreated: string;
  notes: SelectNotes[];
};

export function NotesByDateWrapper({ dayCreated, notes }: WrapperProps) {
  return (
    <div>
      <h2 className="border-b border-t py-2 text-lg">{dayCreated}</h2>
      <div className="space-y-3 py-4">
        {notes.map((note) => (
          <Notecard
            key={note.id}
            noteId={note.id}
            title={note.title}
            content={note.content}
          />
        ))}
      </div>
    </div>
  );
}

//we should be able to filter notes by day created

export default NotesPage;
