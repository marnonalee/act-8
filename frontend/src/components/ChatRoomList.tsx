import React from 'react';

interface ChatRoom {
  id: number;
  name: string;
}

interface Props {
  chatrooms: ChatRoom[];
  onSelect: (id: number) => void;
}

const ChatRoomList: React.FC<Props> = ({ chatrooms, onSelect }) => {
  return (
    <div style={{ width: '200px', borderRight: '1px solid #ccc', padding: '1rem' }}>
      <h3>Chat Rooms</h3>
      {chatrooms.map((room) => (
        <div
          key={room.id}
          onClick={() => onSelect(room.id)}
          style={{ cursor: 'pointer', padding: '0.5rem' }}
        >
          {room.name}
        </div>
      ))}
    </div>
  );
};

export default ChatRoomList;
