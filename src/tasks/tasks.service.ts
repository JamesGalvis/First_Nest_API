import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.prisma.task.findMany();
  }

  async getTaskById(id: string): Promise<Task> {
    const taskFound = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!taskFound) {
      throw new NotFoundException(`La tarea con ID ${id} no existe`);
    }

    return taskFound;
  }

  async createTask(data: Task): Promise<Task> {
    return await this.prisma.task.create({
      data,
    });
  }

  async updateTask(id: string, data: Task): Promise<Task> {
    return await this.prisma.task.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteTask(id: string): Promise<Task> {
    return await this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
