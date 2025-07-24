import { useState } from "react";
import { ChatWindow } from "./ChatWindow";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatWidgetProps {
  title?: string;
  welcomeMessage?: string;
  buttonColor?: string;
  position?: "bottom-right" | "bottom-left";
  className?: string;
}

export const ChatWidget = ({ 
  title = "KI-Assistent",
  welcomeMessage = "Hallo! Wie kann ich Ihnen helfen?",
  position = "bottom-right",
  className 
}: ChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6"
  };

  return (
    <div className={cn("fixed z-50", positionClasses[position], className)}>
      {/* Chat Window */}
      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        welcomeMessage={welcomeMessage}
        className={position === "bottom-left" ? "left-0" : "right-0"}
      />

      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className={cn(
          "h-14 w-14 rounded-full bg-gradient-primary hover:opacity-90 shadow-lg transition-all duration-300",
          "hover:scale-110 active:scale-95",
          isOpen && "rotate-180"
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-primary-foreground" />
        ) : (
          <MessageCircle className="h-6 w-6 text-primary-foreground" />
        )}
      </Button>
    </div>
  );
};