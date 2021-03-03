import * as Yup from 'yup';
import LancamentoDespesa from '../models/LancamentoDespesa';

class LancamentoDespesaController {
    async index(req, res) {
        const lancamentosDespesa = await LancamentoDespesa.findAll();
        return res.json(lancamentosDespesa);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string().required().min(2),
            descricao: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação.' });
        }

        const {
            nome,
            descricao,
            conta_id,
            despesa_id,
            destinatario_id,
            valor_total,
            parcela = '1/1',
            valor_parcela = valor_total,
            fixo = false,
            dt_vencimento,
            pago = false,
            dt_pagamento = null,
            lancamento_id = null,
        } = req.body;

        const lancamentoDespesa = await LancamentoDespesa.create({
            user_id: req.userId,
            nome,
            descricao,
            conta_id,
            despesa_id,
            destinatario_id,
            valor_total,
            parcela,
            valor_parcela,
            fixo,
            dt_vencimento,
            pago,
            dt_pagamento,
            lancamento_id,
        }).catch((err) => res.status(400).json({ error: err.message }));

        return res.json(lancamentoDespesa);
    }

    async update(req, res) {
        const { lancamento_despesa_id } = req.params;

        const lancamento_despesa = await LancamentoDespesa.findByPk(
            lancamento_despesa_id
        );

        if (!lancamento_despesa) {
            return res
                .status(400)
                .json({ error: 'Lançamento de despesa não existe.' });
        }

        await lancamento_despesa.update(req.body);

        return res.json(lancamento_despesa);
    }

    async delete(req, res) {
        const { lancamento_despesa_id } = req.params;

        const lancamento_despesa = await LancamentoDespesa.findByPk(
            lancamento_despesa_id
        );

        if (!lancamento_despesa) {
            return res
                .status(400)
                .json({ error: 'Lançamento de despesa não existe.' });
        }
        await lancamento_despesa.destroy();

        return res.send();
    }

    async validarLancamento() {
        // verificar para lançar de acordo com o que esta enviado
    }
}

export default new LancamentoDespesaController();
