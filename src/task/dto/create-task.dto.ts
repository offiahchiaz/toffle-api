/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsEnum, IsInt } from 'class-validator';
import { TaskState, TaskStatus } from '../models/task-models';

// import { TaskStatus, TaskState } from './task.enum';

export class CreateTaskDto {
  
  @IsNotEmpty()
  dueDate: Date;

  @IsNotEmpty()
  description: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus = TaskStatus.PENDING ;

  @IsOptional()
  state: TaskState;

  @IsInt()
  @IsNotEmpty()
  todoId: number;
}
