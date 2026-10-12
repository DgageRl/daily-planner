
import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { NotesService } from './notes.service.js';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Post()
  create(@Body() body: { title?: string; content?: string }) {
    if (!body.title?.trim()) {
      throw new BadRequestException('Title is required');
    }

    return this.notesService.create(
      body.title.trim(),
      body.content ?? '',
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    body: {
      title?: string;
      content?: string;
      pinned?: boolean;
    },
  ) {
    if (
      body.title !== undefined &&
      (typeof body.title !== 'string' || !body.title.trim())
    ) {
      throw new BadRequestException('Title cannot be empty');
    }

    if (
      body.content !== undefined &&
      typeof body.content !== 'string'
    ) {
      throw new BadRequestException('Content must be a string');
    }

    if (
      body.pinned !== undefined &&
      typeof body.pinned !== 'boolean'
    ) {
      throw new BadRequestException('Pinned must be a boolean');
    }

    return this.notesService.update(id, {
      ...body,
      ...(body.title !== undefined
        ? { title: body.title.trim() }
        : {}),
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
