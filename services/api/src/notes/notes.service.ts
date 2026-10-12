import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.note.findMany({
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const note = await this.prisma.note.findUnique({
      where: { id },
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    return note;
  }

  create(title: string, content: string) {
    return this.prisma.note.create({
      data: { title, content },
    });
  }

  async update(
    id: string,
    data: {
      title?: string;
      content?: string;
      pinned?: boolean;
    },
  ) {
    await this.findOne(id);

    return this.prisma.note.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.note.delete({
      where: { id },
    });

    return { success: true, id };
  }
}
