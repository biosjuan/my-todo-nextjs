import { Request, Response } from 'express';
import { TODO } from './db-data';

export function deleteTodo(req: Request, res: Response) {
  console.log('Deleting todo ...');

  const id = req.params['id'];

  const todo = TODO[id];

  delete TODO[id];

  setTimeout(() => {
    res.status(200).json({ id });
  }, 2000);
}
