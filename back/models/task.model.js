const mongoose = require('mongoose');
const { paginate } = require('./plugins');

const TaskSchema = new mongoose.Schema({
    createdBy: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    comments: {
        type: Array
    },
    category: {
        type: String,
        required: true
    }
}, { timestamps: true });

TaskSchema.plugin(paginate);

module.exports = mongoose.model('Task', TaskSchema);
