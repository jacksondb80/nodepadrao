import { Router } from 'express';
import UserController from './app/controllers/UserController';
import TarefaController from './app/controllers/TarefaController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/teste', (req, res) => res.json({ ok: true }));

routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/tarefas', TarefaController.store);
routes.get('/tarefas', TarefaController.index);
routes.put('/tarefas/:tarefa_id', TarefaController.update);
routes.delete('/tarefas/:tarefa_id', TarefaController.delete);

export default routes;
