import * as Yup from 'yup';
import TipoConta from '../models/TipoConta';

class TipoContaController {
    async index(req, res) {
        const tipoConta = await TipoConta.findAll();
        return res.json(tipoConta);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string().required().min(2),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação.' });
        }

        const { nome } = req.body;

        const tipoConta = await TipoConta.create({
            user_id: req.userId,
            nome,
        }).catch((err) => res.status(400).json({ error: err.message }));

        return res.json(tipoConta);
    }

    async update(req, res) {
        const { tipo_Conta_id } = req.params;

        const tipoConta = await TipoConta.findByPk(tipo_Conta_id);

        if (!tipoConta) {
            return res.status(400).json({ error: 'Tipo conta não existe.' });
        }

        await tipoConta.update(req.body);

        return res.json(tipoConta);
    }

    async delete(req, res) {
        const { tipo_Conta_id } = req.params;

        const tipoConta = await TipoConta.findByPk(tipo_Conta_id);

        if (!tipoConta) {
            return res.status(400).json({ error: 'Tipo conta não existe.' });
        }

        await tipoConta.destroy();

        return res.send();
    }
}

export default new TipoContaController();
