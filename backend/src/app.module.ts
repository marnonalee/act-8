import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { ChatRoomsModule } from './chatrooms/chatrooms.module'; // ✅ FIXED
import { MessagesModule } from './messages/messages.module';
import { ChatGateway } from './websocket/chat/chat.gateway';

@Module({
  imports: [
    // Load .env globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // TypeORM Async Configuration (NO TS ERRORS)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // ⚠️ dev only
      }),
    }),

    UsersModule,
    ChatRoomsModule, // ✅ FIXED
    MessagesModule,
  ],
  providers: [ChatGateway],
})
export class AppModule {}
