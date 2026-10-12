var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let NotesService = class NotesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.note.findMany({
            orderBy: { updatedAt: 'desc' },
        });
    }
    async findOne(id) {
        const note = await this.prisma.note.findUnique({
            where: { id },
        });
        if (!note) {
            throw new NotFoundException('Note not found');
        }
        return note;
    }
    create(title, content) {
        return this.prisma.note.create({
            data: { title, content },
        });
    }
    async update(id, data) {
        await this.findOne(id);
        return this.prisma.note.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.note.delete({
            where: { id },
        });
        return { success: true, id };
    }
};
NotesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], NotesService);
export { NotesService };
//# sourceMappingURL=notes.service.js.map