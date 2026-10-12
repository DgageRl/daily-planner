import { PrismaService } from '../prisma/prisma.service.js';
export declare class NotesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        title: string;
        content: string;
        pinned: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        title: string;
        content: string;
        pinned: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(title: string, content: string): import("@prisma/client").Prisma.Prisma__NoteClient<{
        id: string;
        title: string;
        content: string;
        pinned: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: {
        title?: string;
        content?: string;
        pinned?: boolean;
    }): Promise<{
        id: string;
        title: string;
        content: string;
        pinned: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        id: string;
    }>;
}
