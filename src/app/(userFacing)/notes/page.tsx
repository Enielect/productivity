import { auth } from "@/auth";

import { formatNotesAccDay, getNotes } from "@/server/db/queries/select";
import type { SelectNotes } from "@/server/db/schema";
import { redirect } from "next/navigation";
import React from "react";
import AddNote from "./component/AddNote";
import Notecard from "./component/Notecard";

//organize notes by date created

const NotesPage = async () => {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const allUserNotes = await getNotes();
  const notesByDate = await formatNotesAccDay(allUserNotes);
  const dayCreated = Object.keys(notesByDate);
  return (
    <div className="w-full px-6">
      {allUserNotes.length > 0 ? (
        <div className="grid">
          <h2 className="h-[3rem] w-[calc(100%-480px)] bg-white text-xl font-semibold">
            Notes
          </h2>
          <div className="h-[calc(100dvh-3rem)] overflow-auto">
            {dayCreated.map((day) => (
              <NotesByDateWrapper
                key={day}
                dayCreated={day}
                notes={notesByDate[day]!}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>Add your first Note today</div>
      )}
      <AddNote />
    </div>
  );
};

type WrapperProps = {
  dayCreated: string;
  notes: SelectNotes[];
};

function NotesByDateWrapper({ dayCreated, notes }: WrapperProps) {
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
