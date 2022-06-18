import { Module } from '@nestjs/common';
import { EventModule } from '../event/event.module';
import { PrismaModule } from '../prisma/prisma.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [PrismaModule, EventModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
