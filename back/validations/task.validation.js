const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createTask = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().required(),
    priority: Joi.string().required(),
    category: Joi.string().required(),
    dueDate: Joi.date().required(),
  }),
};

const getTasks = {
  query: Joi.object().keys({
    createdBy: Joi.string().optional(),
    status: Joi.string(),
    priority: Joi.string(),
    dueDate: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTask = {
  params: Joi.object().keys({
    taskId: Joi.string(),
  }),
};

const updateTask = {
  params: Joi.object().keys({
    taskId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
        title: Joi.string(),
        description: Joi.string(),
        status: Joi.string(),
        priority: Joi.string(),
        category: Joi.string(),
        dueDate: Joi.date(),
    })
    .min(1),
};

const deleteTask = {
  params: Joi.object().keys({
    taskId: Joi.string(),
  }),
};

const addComment = {
    params: Joi.object().keys({
      taskId: Joi.required(),
    }),
    body: Joi.object()
      .keys({
          comment: Joi.string().required(),
      })
      .min(1),
  };

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  addComment
};