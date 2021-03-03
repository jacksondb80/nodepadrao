import * as Yup from 'yup';
import TipoLancamento from '../models/TipoLancamento';

class TipoLancamentoController {
    async index(req, res) {
        const tipoLancamento = await TipoLancamento.findAll();
        return res.json(tipoLancamento);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string().required().min(2),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação.' });
        }

        const { nome } = req.body;

        const tipoLancamento = await TipoLancamento.create({
            user_id: req.userId,
            nome,
        }).catch((err) => res.status(400).json({ error: err.message }));

        return res.json(tipoLancamento);
    }

    async update(req, res) {
        const { tipo_lancamento_id } = req.params;

        const tipoLancamento = await TipoLancamento.findByPk(
            tipo_lancamento_id
        );

        if (!tipoLancamento) {
            return res
                .status(400)
                .json({ error: 'Tipo lançamento não existe.' });
        }

        await tipoLancamento.update(req.body);

        return res.json(tipoLancamento);
    }

    async delete(req, res) {
        const { tipo_lancamento_id } = req.params;

        const tipoLancamento = await TipoLancamento.findByPk(
            tipo_lancamento_id
        );

        if (!tipoLancamento) {
            return res
                .status(400)
                .json({ error: 'Tipo lancamento não existe.' });
        }

        await tipoLancamento.destroy();

        return res.send();
    }
}

export default new TipoLancamentoController();
