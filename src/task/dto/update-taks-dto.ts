/* eslint-disable prettier/prettier */
import { IsOptional, IsEnum } from 'class-validator';
import { TaskState, TaskStatus } from '../models/task-models';

// import { TaskStatus, TaskState } from './task.enum';

export class UpdateTaskDto {


  @IsOptional()
  dueDate: Date;

  @IsOptional()
  description: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus = TaskStatus.PENDING ;

  @IsOptional()
  state: TaskState;

  
}