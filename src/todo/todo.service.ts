/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto, EditTodoDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
// import { Task } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  getTodos(userId: number) {

    return this.prisma.todo.findMany({
      where: {
        userId
      }
    })
  }

  async getTasksByTodo( 
    userId: number, 
    todoId: number
  ) {
    // get task by todoId
    const todo = await this.prisma.todo.findUnique({
      where: {
        id: todoId,
      }
    });


    // check if user owns the todo
    if (!todo || todo.userId !== userId) {
      throw new ForbiddenException('Access to resource denied');
    }
    
    return this.prisma.task.findMany({
      where: {
        todoId
        
      }
    })
  }

  async getTodoById(
    userId: number, 
    todoId: number
  ) {

    // get todo by id
    const todo = await this.prisma.todo.findUnique({
      where: {
        id: todoId,
      }
    });

    if (!todo) {
      throw new NotFoundException(`Todo does not exist`);
    }

    // check if user owns the todo
    if (!todo || todo.userId !== userId) {
      throw new ForbiddenException('Access to resource denied');
    }

    return this.prisma.todo.findFirst({
      where: {
        id: todoId,
        userId
      }
    })
  }

  async createTodo(
    userId: number, 
    dto: CreateTodoDto
  ) {
    const todo = await this.prisma.todo.create({
      data: {
        userId,
        ...dto
      }
    });

    return todo;
  }

 async  editTodoById(
    userId: number, 
    todoId: number,
    dto: EditTodoDto,
  ) {
    // get todo by id
    const todo = await this.prisma.todo.findUnique({
      where: {
        id: todoId,
      }
    });

    // check if user owns the todo
    if (!todo || todo.userId !== userId) {
      throw new ForbiddenException('Access to resource denied');
    }

    return this.prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        ...dto
      }
    });
  }

  async deleteTodoById(
    userId: number, 
    todoId: number
  ) {
    const todo = await this.prisma.todo.findUnique({
      where: {
        id: todoId,
      }
    }); 

    // check if user owns the todo
    if (!todo || todo.userId !== userId) {
      throw new ForbiddenException('Access to resource denied');
    }

    await this.prisma.todo.delete({
      where: {
        id: todoId
      }
    })
  }
}
