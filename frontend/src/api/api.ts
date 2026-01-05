import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const api = axios.create({
  baseURL: BASE_URL,
});

export const getChatRooms = () => api.get('/chatrooms');
export const createChatRoom = (name: string) =>
  api.post('/chatrooms', { name });

export const getMessages = (chatroomId: number) =>
  api.get(`/messages/${chatroomId}`);

export const sendMessage = (
  sender: string,
  content: string,
  chatroomId: number,
) =>
  api.post('/messages', {
    sender,
    content,
    chatroomId,
  });
