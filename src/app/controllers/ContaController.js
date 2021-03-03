import * as Yup from 'yup';
import Conta from '../models/Conta';

class ContaController {
    async index(req, res) {
        const contas = await Conta.findAll();
        return res.json(contas);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string().required().min(2),
            tipo_conta_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação.' });
        }

        const { nome, tipo_conta_id } = req.body;

        const contas = await Conta.create({
            user_id: req.userId,
            nome,
            tipo_conta_id,
        }).catch((err) => res.status(400).json({ error: err.message }));

        return res.json(contas);
    }

    async update(req, res) {
        const { conta_id } = req.params;

        const conta = await Conta.findByPk(conta_id);

        if (!conta) {
            return res.status(400).json({ error: 'Conta não existe.' });
        }

        await conta.update(req.body);

        return res.json(conta);
    }

    async delete(req, res) {
        const { conta_id } = req.params;

        const conta = await Conta.findByPk(conta_id);

        if (!conta) {
            return res.status(400).json({ error: 'Conta não existe.' });
        }
        await conta.destroy();

        return res.send();
    }
}

export default new ContaController();
