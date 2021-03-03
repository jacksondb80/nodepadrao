const sequelize = require('sequelize');



module.exports = {

    up: async (queryInterface, Sequelize) =>

        await queryInterface.createTable('lancamentos_despesa', {

            id: {

                type: Sequelize.INTEGER,

                allowNull: false,

                autoIncrement: true,

                primaryKey: true,

            },

            nome: {

                type: Sequelize.STRING,

                allowNull: false,

            },

            descricao: {

                type: Sequelize.STRING,

                allowNull: true,

            },

            user_id: {

                type: Sequelize.INTEGER,

                references: { model: 'users', key: 'id' },

                onUpdate: 'CASCADE',

                onDelete: 'CASCADE',

                allowNull: false,

            },

            conta_id: {

                type: Sequelize.INTEGER,

                references: { model: 'contas', key: 'id' },

                onUpdate: 'CASCADE',

                onDelete: 'CASCADE',

                allowNull: false,

            },

            despesa_id: {

                type: Sequelize.INTEGER,

                references: { model: 'despesas', key: 'id' },

                onUpdate: 'CASCADE',

                onDelete: 'CASCADE',

                allowNull: false,

            },

            destinatario_id: {

                type: Sequelize.INTEGER,

                references: { model: 'destinatarios', key: 'id' },

                onUpdate: 'CASCADE',

                onDelete: 'CASCADE',

                allowNull: false,

            },

            valor_total: {

                type: Sequelize.FLOAT,

                allowNull: false,

            },

            parcela: {

                type: Sequelize.STRING,

                defaultValue: '1/1',

                allowNull: false,

            },

            valor_parcela: {

                type: Sequelize.FLOAT,

                allowNull: false,

            },

            fixo: {

                type: Sequelize.BOOLEAN,

                defaultValue: false,

                allowNull: false,

            },

            dt_vencimento: {

                type: Sequelize.DATE,

                allowNull: false,

            },

            pago: {

                type: Sequelize.BOOLEAN,

                defaultValue: false,

                allowNull: false,

            },

            dt_pagamento: {

                type: Sequelize.DATE,

                allowNull: true,

            },

            lancamento_id: {

                type: Sequelize.INTEGER,

                references: { model: 'lancamentos_despesa', key: 'id' },

                onUpdate: 'CASCADE',

                onDelete: 'SET NULL',

                allowNull: true,

            },

            created_at: {

                type: Sequelize.DATE,

                allowNull: false,

            },

            updated_at: {

                type: Sequelize.DATE,

                allowNull: false,

            },

        }),



    down: async (queryInterface) =>
        await queryInterface.dropTable('lancamentos_despesa'),

};

