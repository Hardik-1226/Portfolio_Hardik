"use client";

import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function ChatbotWidget() {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className="rounded-full w-16 h-16 bg-accent text-accent-foreground shadow-lg hover:bg-accent/90"
              onClick={() => {
                // Chatbot functionality to be added later
                // You can open a chat modal here.
              }}
            >
              <Bot className="w-8 h-8" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Ask me</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
