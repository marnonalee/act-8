import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import { getChatRooms, getMessages, sendMessage } from '../api/api';
import ChatRoomList from '../components/ChatRoomList';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';

// ✅ socket connection
const socket = io('http://localhost:3001', {
  transports: ['websocket'],
});

interface ChatRoom {
  id: number;
  name: string;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  createdAt: string;
  chatroom: { id: number };
}

const ChatPage: React.FC = () => {
  const [chatrooms, setChatrooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [username] = useState(
    'User' + Math.floor(Math.random() * 1000),
  );

  // Load chatrooms
  useEffect(() => {
    loadChatRooms();
  }, []);

  // Load messages when room changes
  useEffect(() => {
    if (selectedRoom !== null) {
      loadMessages(selectedRoom);
    }
  }, [selectedRoom]);

  // ✅ WebSocket listener (SINGLE source of truth)
  useEffect(() => {
    const handler = (msg: Message) => {
      if (msg.chatroom.id === selectedRoom) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on('newMessage', handler);

    return () => {
      socket.off('newMessage', handler);
    };
  }, [selectedRoom]);

  const loadChatRooms = async () => {
    try {
      const res = await getChatRooms();
      setChatrooms(res.data);
      if (res.data.length > 0) {
        setSelectedRoom(res.data[0].id);
      }
    } catch (err) {
      console.error('Failed to load chatrooms', err);
    }
  };

  const loadMessages = async (roomId: number) => {
    try {
      const res = await getMessages(roomId);
      setMessages(res.data);
    } catch (err) {
      console.error('Failed to load messages', err);
    }
  };

  // ✅ FIXED: no more double message
  const handleSend = async (content: string) => {
    if (!selectedRoom) return;

    try {
      const res = await sendMessage(
        username,
        content,
        selectedRoom,
      );

      socket.emit('sendMessage', res.data);
      // ❌ HUWAG mag setMessages dito
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <ChatRoomList
        chatrooms={chatrooms}
        onSelect={setSelectedRoom}
      />

      <div
  style={{
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
  }}
>
  <ChatWindow messages={messages} currentUser={username} />
  <MessageInput onSend={handleSend} />
</div>

    </div>
  );
};

export default ChatPage;
