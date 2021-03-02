import * as Yup from 'yup';
import Tarefa from '../models/Tarefa';

class TarefaController {
    async index(req, res) {
        const tarefas = await Tarefa.findAll({
            where: { user_id: req.userId, check: false },
        });
        return res.json(tarefas);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            tarefa: Yup.string().required().min(2),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação.' });
        }

        const { tarefa } = req.body;

        const tarefas = await Tarefa.create({
            user_id: req.userId,
            tarefa,
        }).catch((err) => res.status(400).json({ error: err.message }));

        return res.json(tarefas);
    }

    async update(req, res) {
        const { tarefa_id } = req.params;

        const tarefa = await Tarefa.findByPk(tarefa_id);

        if (!tarefa) {
            return res.status(400).json({ error: 'Tarefa não existe.' });
        }

        await tarefa.update({ check: true });

        return res.json(tarefa);
    }

    async delete(req, res) {
        const { tarefa_id } = req.params;

        const tarefa = await Tarefa.findByPk(tarefa_id);

        if (!tarefa) {
            return res.status(400).json({ error: 'Tarefa não existe.' });
        }

        if (tarefa.user_id !== req.userId) {
            return res
                .status(401)
                .json({ error: 'Requisição não autorizada.' });
        }

        await tarefa.destroy();

        return res.send();
    }
}

export default new TarefaController();
