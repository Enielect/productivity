"use client";
import { removeNote } from "@/app/(userFacing)/notes/action/note";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";

export default function NoteDeleteDialog({
  children,
  noteId,
}: {
  children: React.ReactNode;
  noteId: number;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this file from our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button
            onClick={() => {
              startTransition(async () => {
                await removeNote(noteId);
              });
            }}
            className="rounded-md bg-blue-600 px-2 py-1 text-white"
            type="submit"
          >
            {pending ? <Loader2 className="animate-spin" /> : "Confirm"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
