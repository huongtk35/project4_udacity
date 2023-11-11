import middy from 'middy'; 
import { cors, httpErrorHandler } from 'middy/middlewares'; 
import DeleteTodo from '../../businessLogic/todos/DeleteTodo.mjs';
import getUserId from '../utils/getUserId.mjs';

export const handler = middy(async (event) => {
  const todoId = event.pathParameters.todoId;
  const userId = getUserId(event);
  try {
    await DeleteTodo(userId, todoId);
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      statusCode: 204,
      body: "",
    };
  } catch (err) {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      statusCode: 500,
      body: JSON.stringify({ Error: err }),
    };
  }
});

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true,
  })
);
