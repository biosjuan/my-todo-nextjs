import * as express from 'express';
import { Application } from 'express';
import { getAllTodos } from './get-todo.route';
import { loginUser } from './auth.route';
import { saveTodo } from './save-todo.route';
import { createTodo } from './create-todo.route';
import { deleteTodo } from './delete-todo.route';

const bodyParser = require('body-parser');

const app: Application = express();

const cors = require('cors');

app.use(cors({ origin: true }));

app.use(bodyParser.json());

app.route('/api/login').post(loginUser);

app.route('/api/todos').get(getAllTodos);

app.route('/api/todo').post(createTodo);

app.route('/api/todo/:id').put(saveTodo);

app.route('/api/todo/:id').delete(deleteTodo);

const httpServer: any = app.listen(3001, () => {
  console.log(
    'HTTP REST API Server running at http://localhost:' +
      httpServer.address().port
  );
});
