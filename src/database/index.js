import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../models/User';
import Post from '../models/Post';
import PostPhoto from '../models/PostPhoto';
import Comment from '../models/Comment';

const models = [User, Post, PostPhoto, Comment];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach(
    (model) => model.associate && model.associate(connection.models),
);
