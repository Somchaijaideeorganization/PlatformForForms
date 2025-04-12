"use client";

import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const AIModal = () => {
  return (
    <div className="fixed bottom-6 right-6 z-[101]">
      <Dialog>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  size="icon"
                  className="bg-primary text-white"
                >
                  <MessageSquare />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent side="left">Chat with AI (Beta)</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AI Chat (Beta)</DialogTitle>
            <DialogDescription>Ask anything about the form</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center">&lt; Conversation &gt;</p>
          </div>
          <DialogFooter>
            <DialogTrigger asChild>
              <Button variant="outline">Close</Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIModal;
