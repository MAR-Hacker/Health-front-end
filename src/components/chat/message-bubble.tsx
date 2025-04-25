import React from 'react';

interface MessageBubbleProps {
  message: string;
  isUserMessage: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isUserMessage }) => {
  return (
    <div className={`message-bubble ${isUserMessage ? 'user' : 'ai'}`}>
      {message}
    </div>
  );
};

export default MessageBubble;