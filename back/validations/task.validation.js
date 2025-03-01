const Joi = require('joi');
const { password, objectId } = require('./custom.validation');
const { create } = require('../models/task.model');

const createTask = {
  body: Joi.object().keys({
    createdBy: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().required(),
    priority: Joi.string().required(),
    category: Joi.string().required(),
    dueDate: Joi.date().required(),
    comments: Joi.array()
  }),
};

const getTasks = {
  query: Joi.object().keys({
    createdBy: Joi.string(),
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
        _id: Joi.string(),
        createdBy: Joi.string(),
        title: Joi.string(),
        description: Joi.string(),
        status: Joi.string(),
        priority: Joi.string(),
        category: Joi.string(),
        dueDate: Joi.date(),
        comments: Joi.array(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        __v: Joi.number()
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
          content: Joi.string().required(),
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