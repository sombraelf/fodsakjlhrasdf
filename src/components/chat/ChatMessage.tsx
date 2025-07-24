import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp?: string;
}

export const ChatMessage = ({ message, isBot, timestamp }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex w-full animate-fade-in",
      isBot ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
        isBot 
          ? "bg-chat-bot-bg text-chat-bot-text rounded-bl-md" 
          : "bg-chat-user-bg text-chat-user-text rounded-br-md"
      )}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        {timestamp && (
          <p className={cn(
            "text-xs mt-1 opacity-70",
            isBot ? "text-chat-bot-text" : "text-chat-user-text"
          )}>
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
};