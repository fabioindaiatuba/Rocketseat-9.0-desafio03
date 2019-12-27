import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';
import Student from '../app/models/Student';
import Plan from '../app/models/Plan';
import Resgistration from '../app/models/Registration';

const models = [User, File, Student, Plan, Resgistration];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
