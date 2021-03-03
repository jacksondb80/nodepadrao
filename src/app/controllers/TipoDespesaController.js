import * as Yup from 'yup';
import TipoDespesa from '../models/TipoDespesa';

class TipoDespesaController {
    async index(req, res) {
        const tipoDespesa = await TipoDespesa.findAll();
        return res.json(tipoDespesa);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string().required().min(2),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação.' });
        }

        const { nome } = req.body;

        const tipoDespesa = await TipoDespesa.create({
            user_id: req.userId,
            nome,
        }).catch((err) => res.status(400).json({ error: err.message }));

        return res.json(tipoDespesa);
    }

    async update(req, res) {
        const { tipo_Despesa_id } = req.params;

        const tipoDespesa = await TipoDespesa.findByPk(tipo_Despesa_id);

        if (!tipoDespesa) {
            return res.status(400).json({ error: 'Tipo despesa não existe.' });
        }

        await tipoDespesa.update(req.body);

        return res.json(tipoDespesa);
    }

    async delete(req, res) {
        const { tipo_Despesa_id } = req.params;

        const tipoDespesa = await TipoDespesa.findByPk(tipo_Despesa_id);

        if (!tipoDespesa) {
            return res.status(400).json({ error: 'Tipo despesa não existe.' });
        }

        await tipoDespesa.destroy();

        return res.send();
    }
}

export default new TipoDespesaController();
