import Sequelize, { Model } from 'sequelize';

class Despesa extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
            },
            {
                tableName: 'despesas',
                sequelize,
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.TipoConta, {
            foreignKey: 'tipo_despesa_id',
            as: 'TipoDespesa',
        });
    }
}

export default Despesa;
