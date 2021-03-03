import * as Yup from 'yup';
import Destinatario from '../models/Destinatario';

class DestinatarioController {
    async index(req, res) {
        const destinatarios = await Destinatario.findAll();
        return res.json(destinatarios);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string().required().min(2),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação.' });
        }

        const { nome } = req.body;

        const destinatarios = await Destinatario.create({
            user_id: req.userId,
            nome,
        }).catch((err) => res.status(400).json({ error: err.message }));

        return res.json(destinatarios);
    }

    async update(req, res) {
        const { destinatario_id } = req.params;

        const destinatario = await Destinatario.findByPk(destinatario_id);

        if (!destinatario) {
            return res.status(400).json({ error: 'Destinatario não existe.' });
        }

        await destinatario.update(req.body);

        return res.json(destinatario);
    }

    async delete(req, res) {
        const { destinatario_id } = req.params;

        const destinatario = await Destinatario.findByPk(destinatario_id);

        if (!destinatario) {
            return res.status(400).json({ error: 'Destinatario não existe.' });
        }

        await destinatario.destroy();

        return res.send();
    }
}

export default new DestinatarioController();
