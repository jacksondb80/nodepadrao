import Sequelize, { Model } from 'sequelize';

class Receita extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
            },
            {
                tableName: 'receitas',
                sequelize,
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
}

export default Receita;
