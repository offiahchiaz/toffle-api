/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TaskService } from '../task/task.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService, TaskService]
})
export class TodoModule {}