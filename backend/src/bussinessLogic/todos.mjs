import { TodosAccess } from './todosAcess.mjs';
import { AttachmentUtils } from './attachmentUtils.mjs';
import createLogger from '../utils/logger.mjs';
import { v4 as uuidv4 } from 'uuid';

const logger = createLogger('TodosAccess');
const attachmentUtils = new AttachmentUtils();
const todosAccess = new TodosAccess();

export async function createTodo(newItem, userId) {
  logger.info('create todos');
  const todoId = uuidv4();
  const createdAt = new Date().toISOString();
  const s3AttachUrl = attachmentUtils.getAttachmentUrl(userId);
  const _newItem = {
    userId,
    todoId,
    createdAt,
    done: false,
    attachmentUrl: s3AttachUrl,
    ...newItem,
  };
  return await todosAccess.create(_newItem);
}

export async function getTodosForUser(userId) {
  logger.info('getall todos');
  return await todosAccess.getAll(userId);
}

export async function updateTodo(userId, todoId, updatedTodo) {
  logger.info('update todos');
  return await todosAccess.update(userId, todoId, updatedTodo);
}

export async function deleteTodo(userId, todoId) {
  logger.info('delete todos');
  return await todosAccess.delete(userId, todoId);
}

export async function createAttachmentPresignedUrl(userId, todoId) {
  logger.info(`createAttachmentPresignedUrl todos by ${userId}`);
  const uploadUrl = todosAccess.getUploadUrl(todoId, userId);
  return uploadUrl;
}
