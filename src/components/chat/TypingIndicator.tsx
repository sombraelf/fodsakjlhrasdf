export const TypingIndicator = () => {
  return (
    <div className="flex justify-start w-full animate-fade-in">
      <div className="bg-chat-bot-bg text-chat-bot-text rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-current rounded-full animate-typing opacity-60"></div>
            <div className="w-2 h-2 bg-current rounded-full animate-typing opacity-60" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-current rounded-full animate-typing opacity-60" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <span className="text-xs ml-2 opacity-70">KI tippt...</span>
        </div>
      </div>
    </div>
  );
};