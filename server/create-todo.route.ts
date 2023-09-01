import { Request, Response } from 'express';
import { TODO, Todo } from './db-data';

export var todoKeyCounter = 100;

export function createTodo(req: Request, res: Response) {
  console.log('Creating new todo ...');

  const changes = req.body;

  const newTodo: Todo = {
    id: todoKeyCounter,
    ...changes,
  };

  TODO[newTodo.id] = newTodo;

  todoKeyCounter += 1;

  setTimeout(() => {
    res.status(200).json(newTodo);
  }, 2000);
}
