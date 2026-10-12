var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Get, Post, Patch, Delete, Param, BadRequestException, } from '@nestjs/common';
import { NotesService } from './notes.service.js';
let NotesController = class NotesController {
    notesService;
    constructor(notesService) {
        this.notesService = notesService;
    }
    findAll() {
        return this.notesService.findAll();
    }
    findOne(id) {
        return this.notesService.findOne(id);
    }
    create(body) {
        if (!body.title?.trim()) {
            throw new BadRequestException('Title is required');
        }
        return this.notesService.create(body.title.trim(), body.content ?? '');
    }
    update(id, body) {
        if (body.title !== undefined &&
            (typeof body.title !== 'string' || !body.title.trim())) {
            throw new BadRequestException('Title cannot be empty');
        }
        if (body.content !== undefined &&
            typeof body.content !== 'string') {
            throw new BadRequestException('Content must be a string');
        }
        if (body.pinned !== undefined &&
            typeof body.pinned !== 'boolean') {
            throw new BadRequestException('Pinned must be a boolean');
        }
        return this.notesService.update(id, {
            ...body,
            ...(body.title !== undefined
                ? { title: body.title.trim() }
                : {}),
        });
    }
    remove(id) {
        return this.notesService.remove(id);
    }
};
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "findOne", null);
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "create", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "update", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "remove", null);
NotesController = __decorate([
    Controller('notes'),
    __metadata("design:paramtypes", [NotesService])
], NotesController);
export { NotesController };
//# sourceMappingURL=notes.controller.js.map