import {
  Controller,
  Post,
  BadRequestException,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AnswerDto } from './answer.dto';
import { TaskDto } from './task.dto';
import { TaskService } from './task.service';

@ApiTags('Tasks')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async task(@Body() task: TaskDto) {
    if (await this.taskService.doesTaskExist(task.number)) {
      throw new BadRequestException('Task already exists');
    }

    return this.taskService.saveTask(task);
  }

  @Post('/answer')
  async answer(@Body() answer: AnswerDto) {
    if (!(await this.taskService.doesTaskExist(answer.number))) {
      throw new BadRequestException('Task does not exist');
    }

    return this.taskService.saveAnswer(answer);
  }

  @Get()
  async getTasks() {
    return this.taskService.getTasks();
  }

  @ApiParam({ name: 'number', type: Number, required: true })
  @Get(':number')
  async getTask(@Param('number') number: number) {
    return this.taskService.getTask(number);
  }
}
