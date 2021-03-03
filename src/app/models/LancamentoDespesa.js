import Sequelize, { Model } from 'sequelize';

class LancamentoDespesa extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
                descricao: Sequelize.STRING,
                valor_total: Sequelize.FLOAT,
                parcela: Sequelize.STRING,
                valor_parcela: Sequelize.FLOAT,
                fixo: Sequelize.BOOLEAN,
                dt_vencimento: Sequelize.DATE,
                pago: Sequelize.BOOLEAN,
                dt_pagamento: Sequelize.DATE,
            },
            {
                tableName: 'lancamentos_despesa',
                sequelize,
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.Conta, {
            foreignKey: 'conta_id',
            as: 'Conta',
        });
        this.belongsTo(models.Despesa, {
            foreignKey: 'despesa_id',
            as: 'Despesa',
        });
        this.belongsTo(models.Destinatario, {
            foreignKey: 'destinatario_id',
            as: 'Destinatario',
        });
        this.belongsTo(models.LancamentoDespesa, {
            foreignKey: 'lancamento_id',
            as: 'LancamentoDespesa',
        });
    }
}

export default LancamentoDespesa;
