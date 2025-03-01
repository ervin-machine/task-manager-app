const { status } = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { taskService } = require('../services')
const pick = require('../utils/pick') 

const createTask = catchAsync(async(req, res) => {
    try {
        const task = await taskService.createTask(req.body)
        res.status(status.OK).json({ task });
    } catch (err) {
        console.log("Error", err)
        res.status(status.INTERNAL_SERVER_ERROR).send("Failed to create task", err)
    }
})

const getTasks = catchAsync(async(req, res) => {
    try {   
        const filter = pick(req.query, ['status', 'dueDate', 'priority', 'createdBy']);
        const options = pick(req.query, ['sortBy', 'limit', 'page']);
        const tasks = await taskService.getTasks(filter, options)
        res.status(status.OK).json({ tasks });
    } catch (err) {
        console.log("Error", err)
        res.status(status.INTERNAL_SERVER_ERROR).send("Failed to get tasks", err)
    }
})

const getTask = catchAsync(async(req, res) => {
    try {   
        const task = await taskService.getTask(req.params)
        res.status(status.OK).json({ task });
    } catch (err) {
        console.log("Error", err)
        res.status(status.INTERNAL_SERVER_ERROR).send("Failed to get tasks", err)
    }
})

const deleteTask = catchAsync(async(req, res) => {
    try {
        const deletedTask = await taskService.deleteTask(req.params)
        res.status(status.OK).json({ deletedTask: deletedTask })
    } catch (err) {
        console.log("Error", err)
        res.status(status.INTERNAL_SERVER_ERROR).send("Failed to delete task", err)
    }
})

const updateTask = catchAsync(async(req, res) => {
    try {
        const updatedTask = await taskService.updateTask(req.params.userId, req.body)
        res.status(status.OK).json({ updatedTask: updatedTask })
    } catch (err) {
        console.log("Error", err)
        res.status(status.INTERNAL_SERVER_ERROR).send("Failed to update task", err)
    }
})

const addComment = catchAsync(async(req, res) => {
    try {
        const comment = await taskService.addComment(req.body)
        res.status(status.OK).json({ comment: comment })
    } catch (err) {
        console.log("Error", err)
        res.status(status.INTERNAL_SERVER_ERROR).send("Failed to add comment to task", err)
    }
})


module.exports = { createTask, getTasks, getTask, deleteTask, updateTask, addComment }