import * as Yup from 'yup';
import Receita from '../models/Receita';

class ReceitaController {
    async index(req, res) {
        const receitas = await Receita.findAll();
        return res.json(receitas);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string().required().min(2),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação.' });
        }

        const { nome } = req.body;

        const receitas = await Receita.create({
            user_id: req.userId,
            nome,
        }).catch((err) => res.status(400).json({ error: err.message }));

        return res.json(receitas);
    }

    async update(req, res) {
        const { receita_id } = req.params;

        const receita = await Receita.findByPk(receita_id);

        if (!receita) {
            return res.status(400).json({ error: 'Receita não existe.' });
        }

        await receita.update(req.body);

        return res.json(receita);
    }

    async delete(req, res) {
        const { receita_id } = req.params;

        const receita = await Receita.findByPk(receita_id);

        if (!receita) {
            return res.status(400).json({ error: 'Receita não existe.' });
        }

        await receita.destroy();

        return res.send();
    }
}

export default new ReceitaController();
