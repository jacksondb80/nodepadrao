import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionsController {
    async store(req, res) {
        const { usuario, senha } = req.body;

        const cpf_ = usuario;
        const email_ = usuario;

        const user = await User.findOne({
            where: {
                [Op.or]: [
                    {
                        email: email_,
                    },
                    {
                        cpf: cpf_,
                    },
                ],
            },
        });

        if (!user) {
            res.status(401).json({ error: 'Usuário não existe.' });
        }

        if (!(await user.checkSenha(senha))) {
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        const { id, nome, email, cpf } = user;

        return res.json({
            user: {
                id,
                nome,
                cpf,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new SessionsController();
