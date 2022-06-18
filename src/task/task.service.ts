import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AnswerDto } from './answer.dto';
import { TaskDto } from './task.dto';
import { Task } from '@prisma/client';
import { EventService } from '../event/event.service';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private readonly eventService: EventService,
  ) {}

  public async saveTask(task: TaskDto): Promise<Task> {
    const entity = await this.prisma.task.create({ data: task });
    this.eventService.emitFacilitator(entity);
    return entity;
  }

  public async saveAnswer({ number }: AnswerDto): Promise<Task> {
    const { answer, certainty, id } = await this.getTask(number);
    const entity = await this.prisma.task.update({
      data: { answer, certainty },
      where: { id },
    });

    this.eventService.emitCandidate(entity);
    return entity;
  }

  public async getTasks() {
    return await this.prisma.task.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lte: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
    });
  }

  public async getTask(number: number): Promise<Task> {
    return await this.prisma.task.findFirst({
      where: {
        number: Number(number),
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lte: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
    });
  }

  public async doesTaskExist(number: number): Promise<boolean> {
    return !!(await this.getTask(number));
  }
}
