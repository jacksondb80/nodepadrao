import { Router } from 'express';
import UserController from './app/controllers/UserController';
import TarefaController from './app/controllers/TarefaController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import TipoLancamentoController from './app/controllers/TipoLancamentoController';
import TipoDespesaController from './app/controllers/TipoDespesaController';

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

routes.post('/tipos_lancamento', TipoLancamentoController.store);
routes.get('/tipos_lancamento', TipoLancamentoController.index);
routes.put(
    '/tipos_lancamento/:tipo_lancamento_id',
    TipoLancamentoController.update
);
routes.delete(
    '/tipos_lancamento/:tipo_lancamento_id',
    TipoLancamentoController.delete
);

routes.post('/tipos_despesa', TipoDespesaController.store);
routes.get('/tipos_despesa', TipoDespesaController.index);
routes.put('/tipos_despesa/:tipo_Despesa_id', TipoDespesaController.update);
routes.delete('/tipos_despesa/:tipo_Despesa_id', TipoDespesaController.delete);

export default routes;
