"use client";

import React, { useTransition } from "react";
import remarkGfm from "remark-gfm";
import { ChevronsDown, ChevronsUp, Edit, Loader2, Trash2 } from "lucide-react";
import Markdown from "react-markdown";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { updateNote } from "../action/note";
import DeleteDialog from "@/components/DeleteDialog";

type NoteCardProps = {
  title: string;
  content: string;
  noteId: number;
};

function NoteCard({ title, content, noteId }: NoteCardProps) {
  const [showMore, setShowMore] = React.useState(false);
  const [editTitle, setEditTitle] = React.useState(title);
  const [editValue, setEditValue] = React.useState(content);
  const [pending, startTransition] = useTransition();
  const [edit, setEdit] = React.useState(false);

  return (
    <div className="space-y-3 rounded-lg bg-[#ADD8E6] px-3 py-2">
      <header className="flex items-center justify-between dark:text-black">
        {<strong>{edit ? "Edit" : title}</strong>}
        <div className="flex items-center gap-4">
          <DeleteDialog deleteType="note" noteId={noteId}>
            <button>
              <Trash2 className="h-5 w-5" />
            </button>
          </DeleteDialog>
          <button onClick={() => setEdit(!edit)}>
            <Edit className="h-5 w-5" />
          </button>
        </div>
      </header>
      {edit ? (
        <div className="space-y-3">
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <Textarea
            className="h-16"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
        </div>
      ) : (
        <div className={`text-black`}>
          {showMore ? (
            <div className="markdown flex flex-wrap">
              <Markdown className="break" remarkPlugins={[remarkGfm]}>
                {content}
              </Markdown>
            </div>
          ) : (
            content.slice(0, 50) + "..."
          )}
        </div>
      )}

      {content.length >= 50 && !edit && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="flex items-center text-blue-600"
        >
          {showMore ? " see less" : "see more"}{" "}
          {showMore ? (
            <ChevronsUp className="h-5" />
          ) : (
            <ChevronsDown className="h-5" />
          )}
        </button>
      )}

      {edit && (
        <div className="flex justify-end">
          <button
            onClick={() => {
              startTransition(async () => {
                await updateNote(editTitle, editValue, noteId);
                setEdit(false);
              });
              // save the edit
            }}
            className="rounded-md bg-blue-600 px-2 py-1 text-white"
          >
            {pending ? <Loader2 className="animate-spin" /> : "Save"}
          </button>
        </div>
      )}
    </div>
  );
}

export default NoteCard;
