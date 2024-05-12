/* eslint-disable prettier/prettier */
import {IsOptional, IsString } from "class-validator";

export class EditTodoDto {
  @IsString()
  @IsOptional()
  name?: string
}