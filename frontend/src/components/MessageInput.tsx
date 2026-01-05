import React, { useState } from 'react';

interface Props {
  onSend: (content: string) => void;
}

const MessageInput: React.FC<Props> = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim() === '') return;
    onSend(text);
    setText('');
  };

  return (
    <div style={{ display: 'flex', marginTop: '1rem' }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message"
        style={{ flex: 1, padding: '0.5rem' }}
      />
      <button onClick={handleSend} style={{ padding: '0.5rem 1rem' }}>
        Send
      </button>
    </div>
  );
};

export default MessageInput;
