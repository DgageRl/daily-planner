import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service.js';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(
    @Body()
    body: {
      title?: string;
      description?: string;
      priority?: string;
      dueAt?: string | null;
      startAt?: string | null;
      endAt?: string | null;
    },
  ) {
    if (typeof body.title !== 'string' || !body.title.trim()) {
      throw new BadRequestException('Title is required');
    }
    if (
      body.description !== undefined &&
      typeof body.description !== 'string'
    ) {
      throw new BadRequestException('Description must be a string');
    }
    if (
      body.priority !== undefined &&
      !['low', 'medium', 'high'].includes(body.priority)
    ) {
      throw new BadRequestException('Priority must be low, medium, or high');
    }

    return this.tasksService.create({
      title: body.title,
      description: body.description,
      priority: body.priority,
      dueAt: body.dueAt,
      startAt: body.startAt,
      endAt: body.endAt,
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    body: {
      title?: string;
      description?: string;
      completed?: boolean;
      priority?: string;
      dueAt?: string | null;
      startAt?: string | null;
      endAt?: string | null;
    },
  ) {
    if (
      body.completed !== undefined &&
      typeof body.completed !== 'boolean'
    ) {
      throw new BadRequestException('Completed must be a boolean');
    }
    if (
      body.priority !== undefined &&
      !['low', 'medium', 'high'].includes(body.priority)
    ) {
      throw new BadRequestException('Priority must be low, medium, or high');
    }

    return this.tasksService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
