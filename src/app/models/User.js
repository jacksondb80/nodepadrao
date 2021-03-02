import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcryptjs';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
                email: Sequelize.STRING,
                cpf: Sequelize.INTEGER,
                senha: Sequelize.VIRTUAL,
                senha_hash: Sequelize.STRING,
            },
            {
                tableName: 'users',
                sequelize,
            }
        );

        this.addHook('beforeSave', async (user) => {
            if (user.senha) {
                user.senha_hash = await bcrypt.hash(user.senha, 8);
            }
        });

        return this;
    }

    checkSenha(senha) {
        return bcrypt.compare(senha, this.senha_hash);
    }
}

export default User;
