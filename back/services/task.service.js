const { status } = require('http-status');
const { Task } = require('../models');
const logger = require('../config/logger')
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');

const createTask = async (taskBody) => {
  try {
      const newTask = new Task(taskBody);
      logger.info(`Task created: ${newTask}`)
      return await newTask.save();
  } catch (err) {
    console.error("Error when creating tasks:", err);
      throw new ApiError(status.INTERNAL_SERVER_ERROR, "Server error");
    }
}

const getTasks = async (filter, options) => {
  try {
    const tasks = await Task.paginate(filter, options)
    return tasks;
  } catch (err) {
    console.error("Error when getting tasks:", err);
    throw new ApiError(status.INTERNAL_SERVER_ERROR, "Server error");
  }
}

const getTask = async (taskParams) => {
  const { id } = taskParams
  try {
    const task = await Task.findById(id);
    return task;
  } catch (err) {
    console.error("Error when getting task:", err);
    throw new ApiError(status.INTERNAL_SERVER_ERROR, "Server error");
  }
}

const deleteTask = async (taskParams) => {
  const { id } = taskParams;
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) throw new ApiError(status.NOT_FOUND, "Task not found");

    logger.info(`Task deleted: ${task}`)
    return task;
  } catch (err) {
    throw new ApiError(status.INTERNAL_SERVER_ERROR, "Server error"); 
  }
}

const updateTask = async (taskBody) => {
  const { id, updatedData} = taskBody;
  try {
    delete updatedData._id;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: updatedData },
      { new: true }
  );

  if (!updatedTask) {
      throw new ApiError(status.BAD_REQUEST, 'Task not Found');
  }

  logger.info(`Task updated: ${updatedTask}`)
  return updatedTask;
  } catch (err) {
    console.error("Error when updating tasks:", err);
    throw new ApiError(status.INTERNAL_SERVER_ERROR, "Server error"); 
  }
}

const addComment = async (taskBody) => {
  const { comment } = taskBody;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(`Invalid ObjectId: ${id}`);
    }

    const task = await Task.findById(id);
    
    if (!task) {
      throw new Error(`Task not found`);
    }

    if (!Array.isArray(task.comments)) {
      task.comments = [];
    }

    task.comments.push(comment);
    await task.save();
  } catch (err) {
    console.error("Error when adding comment:", err);
    throw new ApiError(status.INTERNAL_SERVER_ERROR, "Server error"); 
  }
}

module.exports = {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
  addComment
}