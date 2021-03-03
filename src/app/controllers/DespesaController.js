import * as Yup from 'yup';
import Despesa from '../models/Despesa';

class DespesaController {
    async index(req, res) {
        const despesas = await Despesa.findAll();
        return res.json(despesas);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string().required().min(2),
            tipo_despesa_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação.' });
        }

        const { nome, tipo_despesa_id } = req.body;

        const despesas = await Despesa.create({
            user_id: req.userId,
            nome,
            tipo_despesa_id,
        }).catch((err) => res.status(400).json({ error: err.message }));

        return res.json(despesas);
    }

    async update(req, res) {
        const { despesa_id } = req.params;

        const despesa = await Despesa.findByPk(despesa_id);

        if (!despesa) {
            return res.status(400).json({ error: 'Despesa não existe.' });
        }

        await despesa.update(req.body);

        return res.json(despesa);
    }

    async delete(req, res) {
        const { despesa_id } = req.params;

        const despesa = await Despesa.findByPk(despesa_id);

        if (!despesa) {
            return res.status(400).json({ error: 'Despesa não existe.' });
        }
        await despesa.destroy();

        return res.send();
    }
}

export default new DespesaController();
