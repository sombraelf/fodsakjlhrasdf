import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { Button } from "@/components/ui/button";
import { X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: string;
}

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  welcomeMessage?: string;
  className?: string;
}

export const ChatWindow = ({ 
  isOpen, 
  onClose, 
  title = "Freund - KI von iurFRIEND", 
  welcomeMessage = "Hallo, ich heiße \"Freund\" und bin die KI von iurFRIEND. Ich beantworte gerne alle Fragen zum Thema Trennung, Scheidung und Familienrecht.",
  className 
}: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: welcomeMessage,
      isBot: true,
      timestamp: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setIsTyping(true);

    try {
      // Call Flowise API
      const response = await fetch('https://flowise.iurfriend.net/api/v1/prediction/55d57180-f5fc-459f-8869-6480b6645f21', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: content
        })
      });

      if (!response.ok) {
        throw new Error('Netzwerkfehler bei der API-Anfrage');
      }

      const data = await response.json();
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.text || data.answer || 'Entschuldigung, ich konnte keine Antwort generieren.',
        isBot: true,
        timestamp: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Fehler beim Abrufen der API:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Entschuldigung, es gab ein Problem bei der Verbindung zum Server. Bitte versuchen Sie es später erneut.',
        isBot: true,
        timestamp: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={cn(
      "fixed bottom-4 right-4 w-96 h-[600px] bg-chat-widget-bg rounded-2xl shadow-2xl border border-border animate-float-up z-50",
      "flex flex-col overflow-hidden",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-primary text-primary-foreground rounded-t-2xl">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <h3 className="font-semibold">{title}</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 text-primary-foreground hover:bg-white/20 rounded-lg"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <div 
        ref={scrollAreaRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-background"
      >
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.content}
            isBot={message.isBot}
            timestamp={message.timestamp}
          />
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      {/* Input */}
      <ChatInput 
        onSendMessage={handleSendMessage} 
        disabled={isTyping}
        placeholder="Ihre Nachricht..."
      />
    </div>
  );
};