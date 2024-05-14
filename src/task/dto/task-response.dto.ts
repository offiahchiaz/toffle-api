/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEnum, IsInt } from 'class-validator';
import { TaskState, TaskStatus } from '../models/task-models';
// import { TaskStatus, TaskState } from './task.enum';

export class TaskResponseDto {
  @IsNotEmpty()
  dueDate: Date;

  @IsNotEmpty()
  description: string;

  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;

  @IsEnum(TaskState)
  @IsNotEmpty()
  state: TaskState;

  @IsInt()
  @IsNotEmpty()
  todoId: number;
}
