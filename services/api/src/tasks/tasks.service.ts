import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.task.findMany({
      orderBy: [
        { completed: 'asc' },
        { dueAt: 'asc' },
        { createdAt: 'desc' },
      ],
    });
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  create(body: {
    title: string;
    description?: string;
    priority?: string;
    dueAt?: string | null;
    startAt?: string | null;
    endAt?: string | null;
  }) {
    const data: {
      title: string;
      description: string;
      priority: string;
      dueAt?: Date | null;
      startAt?: Date | null;
      endAt?: Date | null;
    } = {
      title: body.title.trim(),
      description: body.description ?? '',
      priority: body.priority ?? 'medium',
    };

    if (body.dueAt) {
      const date = new Date(body.dueAt);
      if (Number.isNaN(date.getTime())) {
        throw new BadRequestException('Invalid dueAt date');
      }
      data.dueAt = date;
    }

    for (const field of ['startAt', 'endAt'] as const) {
      const value = body[field];
      if (value) {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) {
          throw new BadRequestException(`Invalid ${field} date`);
        }
        data[field] = date;
      }
    }

    if (data.startAt && data.endAt && data.endAt <= data.startAt) {
      throw new BadRequestException('endAt must be later than startAt');
    }

    return this.prisma.task.create({ data });
  }

  async update(
    id: string,
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
    await this.findOne(id);

    const data: {
      title?: string;
      description?: string;
      completed?: boolean;
      priority?: string;
      dueAt?: Date | null;
      startAt?: Date | null;
      endAt?: Date | null;
    } = {};

    if (body.title !== undefined) {
      if (!body.title.trim()) {
        throw new BadRequestException('Title cannot be empty');
      }
      data.title = body.title.trim();
    }

    if (body.description !== undefined) data.description = body.description;
    if (body.completed !== undefined) data.completed = body.completed;
    if (body.priority !== undefined) data.priority = body.priority;

    if (body.dueAt !== undefined) {
      if (body.dueAt === null || body.dueAt === '') {
        data.dueAt = null;
      } else {
        const date = new Date(body.dueAt);
        if (Number.isNaN(date.getTime())) {
          throw new BadRequestException('Invalid dueAt date');
        }
        data.dueAt = date;
      }
    }

    for (const field of ['startAt', 'endAt'] as const) {
      if (body[field] !== undefined) {
        const value = body[field];
        if (value === null || value === '') {
          data[field] = null;
        } else {
          const date = new Date(value);
          if (Number.isNaN(date.getTime())) {
            throw new BadRequestException(`Invalid ${field} date`);
          }
          data[field] = date;
        }
      }
    }

    const existing = await this.findOne(id);
    const startAt = data.startAt === undefined ? existing.startAt : data.startAt;
    const endAt = data.endAt === undefined ? existing.endAt : data.endAt;
    if (startAt && endAt && endAt <= startAt) {
      throw new BadRequestException('endAt must be later than startAt');
    }

    return this.prisma.task.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.task.delete({ where: { id } });
    return { success: true, id };
  }
}
