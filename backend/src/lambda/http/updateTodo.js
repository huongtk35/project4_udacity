
import middy from 'middy';
import { cors, httpErrorHandler } from 'middy/middlewares';

import { updateTodo } from '../../businessLogic/todos.mjs';
import { getUserId } from '../utils.mjs';

export const handler = middy(async (event) => {
  try {
    const todoId = event.pathParameters.todoId;
    const updatedTodo = JSON.parse(event.body);
    const userId = getUserId(event);
    await updateTodo(userId, todoId, updatedTodo);
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      statusCode: 204,
      body: JSON.stringify({ item: updatedTodo }),
    };
  } catch (error) {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      statusCode: 500,
      body: JSON.stringify({ error: String(error) }),
    };
  }
});

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true,
  })
);
