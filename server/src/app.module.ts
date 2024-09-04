import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { Event } from './events/entities/event.entity';
import { User } from './users/entities/user.entity';
import { DatabaseSeeder } from './database.seeder';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [Event, User],
        synchronize: true, // Be cautious with this in production
        retryAttempts: 10,
        retryDelay: 3000,
      }),
    }),
    EventsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseSeeder],
})
export class AppModule {}
