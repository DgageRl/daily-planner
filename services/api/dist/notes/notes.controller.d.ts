import { NotesService } from './notes.service.js';
export declare class NotesController {
    private readonly notesService;
    constructor(notesService: NotesService);
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
    create(body: {
        title?: string;
        content?: string;
    }): import("@prisma/client").Prisma.Prisma__NoteClient<{
        id: string;
        title: string;
        content: string;
        pinned: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, body: {
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
