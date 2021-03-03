import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Tarefa from '../app/models/Tarefa';
import Conta from '../app/models/Conta';
import Despesa from '../app/models/Despesa';
import Destinatario from '../app/models/Destinatario';
import Receita from '../app/models/Receita';
import TipoConta from '../app/models/TipoConta';
import TipoDespesa from '../app/models/TipoDespesa';
import TipoLancamento from '../app/models/TipoLancamento';
import LancamentoDespesa from '../app/models/LancamentoDespesa';

const models = [
    User,
    Tarefa,
    Conta,
    Despesa,
    Destinatario,
    Receita,
    TipoConta,
    TipoDespesa,
    TipoLancamento,
    LancamentoDespesa,
];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
        try {
            models
                .map((model) => model.init(this.connection))
                .map(
                    (model) =>
                        model.associate &&
                        model.associate(this.connection.models)
                );
        } catch (e) {
            console.log(`Error. (${e})`);
        }
    }
}

export default new Database();
