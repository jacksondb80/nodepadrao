import Sequelize, { Model } from 'sequelize';

class Conta extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
            },
            {
                tableName: 'contas',
                sequelize,
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.TipoConta, {
            foreignKey: 'tipo_conta_id',
            as: 'TipoConta',
        });
    }
}

export default Conta;
