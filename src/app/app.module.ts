import { Module } from '@nestjs/common';
import { EventModule } from '../event/event.module';
import { TaskModule } from '../task/task.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot(), TaskModule, EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
