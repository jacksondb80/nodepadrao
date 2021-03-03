import { Router } from 'express';
import UserController from './app/controllers/UserController';
import TarefaController from './app/controllers/TarefaController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import TipoLancamentoController from './app/controllers/TipoLancamentoController';
import TipoDespesaController from './app/controllers/TipoDespesaController';
import TipoContaController from './app/controllers/TipoContaController';
import DespesaController from './app/controllers/DespesaController';
import ContaController from './app/controllers/ContaController';
import DestinatarioController from './app/controllers/DestinatarioController';
import ReceitaController from './app/controllers/ReceitaController';
import LancamentoDespesaController from './app/controllers/LancamentoDespesaController';

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

routes.post('/tipos_conta', TipoContaController.store);
routes.get('/tipos_conta', TipoContaController.index);
routes.put('/tipos_conta/:tipo_Conta_id', TipoContaController.update);
routes.delete('/tipos_conta/:tipo_Conta_id', TipoContaController.delete);

routes.post('/despesas', DespesaController.store);
routes.get('/despesas', DespesaController.index);
routes.put('/despesas/:despesa_id', DespesaController.update);
routes.delete('/despesas/:despesa_id', DespesaController.delete);

routes.post('/contas', ContaController.store);
routes.get('/contas', ContaController.index);
routes.put('/contas/:conta_id', ContaController.update);
routes.delete('/contas/:conta_id', ContaController.delete);

routes.post('/destinatarios', DestinatarioController.store);
routes.get('/destinatarios', DestinatarioController.index);
routes.put('/destinatarios/:destinatario_id', DestinatarioController.update);
routes.delete('/destinatarios/:destinatario_id', DestinatarioController.delete);

routes.post('/receitas', ReceitaController.store);
routes.get('/receitas', ReceitaController.index);
routes.put('/receitas/:receita_id', ReceitaController.update);
routes.delete('/receitas/:receita_id', ReceitaController.delete);

routes.get('/lancamentos_despesa', LancamentoDespesaController.index);
routes.post('/lancamentos_despesa', LancamentoDespesaController.store);
routes.put(
    '/lancamentos_despesa/:lancamento_despesa_id',
    LancamentoDespesaController.update
);
routes.delete(
    '/lancamentos_despesa/:lancamento_despesa_id',
    LancamentoDespesaController.delete
);

export default routes;
