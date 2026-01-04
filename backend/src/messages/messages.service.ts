import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { ChatRoom } from '../chatrooms/chatroom.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private msgRepo: Repository<Message>,

    @InjectRepository(ChatRoom)
    private roomRepo: Repository<ChatRoom>,
  ) {}

  async create(sender: string, content: string, chatroomId: number) {
    const room = await this.roomRepo.findOne({
      where: { id: chatroomId },
    });

    if (!room) {
      throw new NotFoundException('Chatroom not found');
    }

    const msg = this.msgRepo.create({
      sender,
      content,
      chatroom: room, // ✅ now guaranteed ChatRoom
    });

    return this.msgRepo.save(msg);
  }

  findByRoom(chatroomId: number) {
    return this.msgRepo.find({
      where: { chatroom: { id: chatroomId } },
      order: { createdAt: 'ASC' },
    });
  }
}
