const sequelize = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) =>
        await queryInterface.createTable('tipos_lancamento', {
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
            user_id: {
                type: Sequelize.INTEGER,
                references: { model: 'users', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false,
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
        await queryInterface.dropTable('tipos_lancamento'),
};
