import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from '@prisma/client';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getTasks() {
    return await this.tasksService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    return await this.tasksService.getTaskById(id);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try {
      return await this.tasksService.deleteTask(id);
    } catch (error) {
      throw new NotFoundException('La tarea ha eliminar no existe');
    }
  }

  @Post()
  @HttpCode(204)
  async createTask(@Body() task: Task) {
    return await this.tasksService.createTask(task);
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() data: Task) {
    try {
      return await this.tasksService.updateTask(id, data);
    } catch (error) {
      throw new NotFoundException('La tarea ha actualizar no existe');
    }
  }
}
