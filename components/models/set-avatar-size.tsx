"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {Button} from "@/components/ui/button";
import { useModal } from '@/hooks/use-dialog-store'
export const SetAvatarSize = () => {
  const {isOpen, onClose, type} = useModal();
  const isModalOpen = isOpen && type === "SetAvatarSize";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this? <br/>
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <Button variant="default">add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};