/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, Delete, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskState } from './models/task-models';
import { UpdateTaskDto } from './dto/update-taks-dto';
import { UserId } from '../auth/decorators';
// import { TodoId } from './decorators';


@UseGuards(JwtGuard)
@Controller('tasks')
export class TaskController {
  constructor(
    private taskService: TaskService
  ) {}

  // @Get(':id/tasks')
  // getTasks(
  //   @Param('id', ParseIntPipe) todoId: number) {
  //   console.log('this is TodoID', todoId)
  //   return this.taskService.getTasks(
  //     todoId
  //   )
  // }

  


  @Post()
  async createTask(
    @Body() taskData : CreateTaskDto
  ) {

    if(!taskData.dueDate){
      throw new BadRequestException('The task due date is required');
    }

    const now = new Date();
    const dueDate =  new Date(taskData.dueDate) 
    
    const timeDifference = dueDate.getTime() - now.getTime();

    if(timeDifference < 0){
      throw new BadRequestException('The task due date should not be in the past');
    }
    
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference >= 72) {
      taskData.state = TaskState.GREEN;
    } else if (hoursDifference < 24 && hoursDifference >= 3) {
      taskData.state = TaskState.AMBER;
    } else if (hoursDifference < 3 && hoursDifference > 0) {
      taskData.state = TaskState.RED;
    } else {
      taskData.state = null; // Return null for completed or expired tasks
    }
    
    return await this.taskService.createTask(taskData)
  }


  @Patch(':id')
  updateTask(
    @UserId() userId: number,
    @Param('id', ParseIntPipe) taskId: number,
    @Body() taskData: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(
      userId,
      taskId,
      taskData

    )
  }

  
  @Delete(':id')
  deleteTask(
    @UserId() userId: number,
    @Param('id', ParseIntPipe) taskId: number
  ) {
    console.log('This is taskID', taskId)
    return this.taskService.deleteTask(
      userId,
      taskId,
    );
  }

 
}
