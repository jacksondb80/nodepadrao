import { Op } from 'sequelize';
import * as Yup from 'yup';
import User from '../models/User';

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string().required().min(3),
            email: Yup.string().email().required(),
            cpf: Yup.string().required().min(11).max(11),
            senha: Yup.string().required.min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação.' });
        }

        const userExists = await User.findOne({
            // where: {email: req.body.email}
            where: {
                [Op.or]: [
                    {
                        email: req.body.email,
                    },
                    {
                        cpf: req.body.cpf,
                    },
                ],
            },
        });

        if (userExists) {
            return res.status(400).json({ error: 'Usuário já existe' });
        }

        const { id, nome, email, cpf } = await User.create(req.body);

        return res.json({
            id,
            nome,
            email,
            cpf,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string(),
            email: Yup.string().email(),
            senhaAnterior: Yup.string().min(6, 'Senha minimo 6 caracteres'),
            senha: Yup.string()
                .min(6)
                .when('senhaAnterior', (senhaAnterior, field) =>
                    senhaAnterior ? field.required() : field
                ),
            senhaConfirmacao: Yup.string().when('senha', (senha, field) =>
                senha ? field.required().oneOf([Yup.ref('senha')]) : field
            ),
        });

        // if (!(await schema.isValid(req.body))) {
        //     return res.status(400).json({ error: 'Falha na validação.' });
        // }

        try {
            await schema.validate(req.body);
        } catch (e) {
            console.log(JSON.stringify(e));
            return res
                .status(400)
                .json({ error: `Falha na validação. (${e.message})` });
        }

        const { email, senhaAnterior } = req.body;
        const user = await User.findByPk(req.userId);

        if (user.email !== email) {
            const userExists = await User.findOne({
                where: { email },
            });
            if (userExists) {
                return res.status(400).json({ error: 'Email já existe' });
            }
        }

        if (senhaAnterior && !(await user.checkSenha(senhaAnterior))) {
            return res.status(400).json({ error: 'senha atual inválida' });
        }

        const { id, nome, cpf } = await user.update(req.body);

        return res.json({
            id,
            nome,
            email,
            cpf,
        });
    }
}

export default new UserController();
