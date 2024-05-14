/* eslint-disable prettier/prettier */

import { ExecutionContext, createParamDecorator } from "@nestjs/common";


// export const TodoId = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     return request.todo ? request.todo.id : null;
//   },
// );

export const TodoId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // Assuming you have middleware that attaches todoId to the request object
    return request.todoId;
  },
);