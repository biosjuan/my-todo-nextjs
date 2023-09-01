import { Request, Response } from 'express';
import { TODO } from './db-data';

export function getAllTodos(req: Request, res: Response) {
  console.log('Retrieving TODO data ...');

  setTimeout(() => {
    res.status(200).json({ payload: Object.values(TODO) });
  }, 1000);
}
