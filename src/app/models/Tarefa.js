import Sequelize, { Model } from 'sequelize';

class Tarefa extends Model {
    static init(sequelize) {
        super.init(
            {
                tarefa: Sequelize.STRING,
                check: Sequelize.BOOLEAN,
            },
            {
                tableName: 'tarefas',
                sequelize,
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
}

export default Tarefa;
