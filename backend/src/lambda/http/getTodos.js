
import middy from 'middy'; 
import { cors } from 'middy/middlewares'; 
import { getTodosForUser } from '../../businessLogic/todos.mjs'; 
import { getUserId } from '../utils.mjs'; 

export const handler = middy(async (event) => {
  try {
    const userId = getUserId(event);
    const todos = await getTodosForUser(userId);
    return {
      statusCode: 200,
      body: JSON.stringify({ items: todos }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: String(error) }), 
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  }
});

handler.use(
  cors({
    credentials: true,
  })
);
