/* eslint-disable prettier/prettier */
import { Controller, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('tasks')
export class TaskController {}
