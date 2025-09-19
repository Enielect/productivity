
import { formatNotesAccDay, getNotes } from "@/server/db/queries/select";
import type { SelectNotes } from "@/server/db/schema";
import React from "react";
import AddNote from "./component/AddNote";
import Notecard from "./component/Notecard";
import { ScrollArea } from "@/components/ui/scroll-area";
import NoteDisplayWrapper from "./component/NoteDisplayWrapper";
import SearchBar from "@/components/SearchBar";
import { getAuthenticatedUserId } from "@/server/db/queries/insert";

//organize notes by date created

const NotesPage = async () => {
  const userId = await getAuthenticatedUserId();

  const allUserNotes = await getNotes(userId);
  const notesByDate = await formatNotesAccDay(allUserNotes);
  const dayCreated = Object.keys(notesByDate);
  return (
    <div className="h-[100dvh] w-full px-6 md:mt-0">
      {allUserNotes.length > 0 ? (
        <div className="grid">
          <div className="flex h-[3rem] items-center bg-white dark:bg-black">
            <h1 className="text-xl font-semibold"> Notes</h1>
            <SearchBar />
          </div>
          <ScrollArea className="h-[calc(100dvh-3rem-60px)] pb-[2rem] md:pr-5">
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
