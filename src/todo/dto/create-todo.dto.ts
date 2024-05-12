/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  name: string
}