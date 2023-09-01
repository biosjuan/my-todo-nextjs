import { Request, Response } from 'express';
import { TODO } from './db-data';

export function saveTodo(req: Request, res: Response) {
  console.log('Saving Todo ...');

  const id = req.params['id'],
    changes = req.body;

  TODO[id] = {
    ...TODO[id],
    ...changes,
  };

  setTimeout(() => {
    res.status(200).json(TODO[id]);
  }, 2000);
}
