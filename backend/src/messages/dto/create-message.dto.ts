import { IsString, IsNumber } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  sender: string;

  @IsString()
  content: string;

  @IsNumber()
  chatroomId: number;
}
