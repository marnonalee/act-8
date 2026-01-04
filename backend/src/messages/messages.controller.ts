import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private service: MessagesService) {}

  @Post()
  create(@Body() dto: CreateMessageDto) {
    return this.service.create(dto.sender, dto.content, dto.chatroomId);
  }

  @Get(':chatroomId')
  getMessages(@Param('chatroomId') id: number) {
    return this.service.findByRoom(id);
  }
}
