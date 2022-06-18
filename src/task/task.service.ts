import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AnswerDto } from './answer.dto';
import { TaskDto } from './task.dto';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  public async saveTask(task: TaskDto): Promise<Task> {
    return await this.prisma.task.create({ data: task });
  }

  public async saveAnswer({ number }: AnswerDto): Promise<Task> {
    const { answer, certainty, id } = await this.getTask(number);
    return await this.prisma.task.update({
      data: { answer, certainty },
      where: { id },
    });
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
