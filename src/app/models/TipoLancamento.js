import Sequelize, { Model } from 'sequelize';

class TipoLancamento extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
            },
            {
                tableName: 'tipos_lancamento',
                sequelize,
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
}

export default TipoLancamento;
