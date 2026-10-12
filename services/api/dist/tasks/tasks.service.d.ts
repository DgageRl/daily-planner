import { PrismaService } from '../prisma/prisma.service.js';
export declare class TasksService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        completed: boolean;
        priority: string;
        dueAt: Date | null;
        startAt: Date | null;
        endAt: Date | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        completed: boolean;
        priority: string;
        dueAt: Date | null;
        startAt: Date | null;
        endAt: Date | null;
    }>;
    create(body: {
        title: string;
        description?: string;
        priority?: string;
        dueAt?: string | null;
        startAt?: string | null;
        endAt?: string | null;
    }): import("@prisma/client").Prisma.Prisma__TaskClient<{
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        completed: boolean;
        priority: string;
        dueAt: Date | null;
        startAt: Date | null;
        endAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, body: {
        title?: string;
        description?: string;
        completed?: boolean;
        priority?: string;
        dueAt?: string | null;
        startAt?: string | null;
        endAt?: string | null;
    }): Promise<{
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        completed: boolean;
        priority: string;
        dueAt: Date | null;
        startAt: Date | null;
        endAt: Date | null;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        id: string;
    }>;
}
