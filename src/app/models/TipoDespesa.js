import Sequelize, { Model } from 'sequelize';

class TipoDespesa extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
            },
            {
                tableName: 'tipos_despesa',
                sequelize,
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
}

export default TipoDespesa;
