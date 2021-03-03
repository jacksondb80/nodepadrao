import Sequelize, { Model } from 'sequelize';

class Destinatario extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
            },
            {
                tableName: 'destinatarios',
                sequelize,
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
}

export default Destinatario;
