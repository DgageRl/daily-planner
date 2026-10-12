var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, BadRequestException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let TasksService = class TasksService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.task.findMany({
            orderBy: [
                { completed: 'asc' },
                { dueAt: 'asc' },
                { createdAt: 'desc' },
            ],
        });
    }
    async findOne(id) {
        const task = await this.prisma.task.findUnique({ where: { id } });
        if (!task)
            throw new NotFoundException('Task not found');
        return task;
    }
    create(body) {
        const data = {
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
        for (const field of ['startAt', 'endAt']) {
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
    async update(id, body) {
        await this.findOne(id);
        const data = {};
        if (body.title !== undefined) {
            if (!body.title.trim()) {
                throw new BadRequestException('Title cannot be empty');
            }
            data.title = body.title.trim();
        }
        if (body.description !== undefined)
            data.description = body.description;
        if (body.completed !== undefined)
            data.completed = body.completed;
        if (body.priority !== undefined)
            data.priority = body.priority;
        if (body.dueAt !== undefined) {
            if (body.dueAt === null || body.dueAt === '') {
                data.dueAt = null;
            }
            else {
                const date = new Date(body.dueAt);
                if (Number.isNaN(date.getTime())) {
                    throw new BadRequestException('Invalid dueAt date');
                }
                data.dueAt = date;
            }
        }
        for (const field of ['startAt', 'endAt']) {
            if (body[field] !== undefined) {
                const value = body[field];
                if (value === null || value === '') {
                    data[field] = null;
                }
                else {
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
    async remove(id) {
        await this.findOne(id);
        await this.prisma.task.delete({ where: { id } });
        return { success: true, id };
    }
};
TasksService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], TasksService);
export { TasksService };
//# sourceMappingURL=tasks.service.js.map