import { Controller, Get, Post, Body } from '@nestjs/common';
import { ChatRoomsService } from './chatrooms.service';
import { CreateChatRoomDto } from './dto/create-chatroom.dto';

@Controller('chatrooms')
export class ChatRoomsController {
  constructor(private service: ChatRoomsService) {}

  @Post()
  create(@Body() dto: CreateChatRoomDto) {
    return this.service.create(dto.name);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
