import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { Message } from './message.entity';
import { ChatRoom } from '../chatrooms/chatroom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, ChatRoom])], // ✅ import both entities
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
