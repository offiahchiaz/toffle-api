/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-taks-dto';



@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    
    const todo = await this.prisma.todo.findUnique({
      where: {
        id: createTaskDto.todoId,
      }
    });

    if (!todo) {
      throw new NotFoundException(`Task cannot be created as Todo ID does not exist`);
    }

    return this.prisma.task.create({ data: createTaskDto});
  }


  async updateTask(
    userId: number,
    taskId: number,
    taskData: UpdateTaskDto,
  ) {
    // get task by id
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      }
    });

    if (!task) {
      throw new NotFoundException(`Task does not exist`);
    }

    // Get the todoId 
    const todo = await this.prisma.todo.findUnique({
      where: {
        id: task.todoId
      }
    })

    // check if user owns the todo
    if (!task || todo.userId !== userId) {
      throw new ForbiddenException('Access to resource denied');
    }

    return this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        ...taskData
      }
    });

  }


  async deleteTask(
    userId: number,
    taskId: number,
  ) {

    // get task by id
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      }
    });

    if (!task) {
      throw new NotFoundException(`Task does not exist`);
    }

    // Get the todoId 
    const todo = await this.prisma.todo.findUnique({
      where: {
        id: task.todoId
      }
    })

    // check if user owns the todo
    if (!task || todo.userId !== userId) {
      throw new ForbiddenException('Access to resource denied');
    }

    await this.prisma.task.delete({
      where: {
        id: taskId
      }
    });

  }


}
