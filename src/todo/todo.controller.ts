/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { TodoService } from './todo.service';
import { UserId } from '../auth/decorators';
import { CreateTodoDto, EditTodoDto } from './dto';


@UseGuards(JwtGuard)
@Controller('todos')
export class TodoController {
  constructor(
    private todoService: TodoService,
  ) {}

  @Get()
  getTodos(@UserId() userId: number) {
    return this.todoService.getTodos(
      userId
    )
  }

  @Get(':id')
  getTodoById(
    @UserId() userId: number,
    @Param('id', ParseIntPipe) todoId: number
  ) {
    return this.todoService.getTodoById(
      userId,
      todoId,
    )
  }

  @Post()
  createTodo(
    @UserId() userId: number,
    @Body() dto: CreateTodoDto
  ) {
    console.log("This is the userId",userId)
    return this.todoService.createTodo(
      userId,
      dto,
    )
  }

  @Patch(':id')
  editTodoById(
    @UserId() userId: number,
    @Param('id', ParseIntPipe) todoId: number,
    @Body() dto: EditTodoDto
  ) {
    return this.todoService.editTodoById(
      userId,
      todoId,
      dto,
    )
  }

  @Delete(':id')
  deleteTodoById(
    @UserId() userId: number,
    @Param('id', ParseIntPipe) todoId: number
) {
  return this.todoService.deleteTodoById(
    userId,
    todoId,
  )
}

}
