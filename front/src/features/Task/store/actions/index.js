import { types } from "../constants";
import { getTasks, createTask, updateTask, deleteTask, getTask, createComment } from "../../hooks"; 

const taskRequest = (type) => ({
    type,
});

const taskSuccess = (type, data) => ({
    type,
    payload: data,
});

const taskFailure = (type, error) => ({
    type,
    payload: error,
});

export const fetchTasks = (query) => {
    return async (dispatch) => {
        dispatch(taskRequest(types.GET_TASKS_REQUEST));
        try {
            const response = await getTasks(query);
            dispatch(taskSuccess(types.GET_TASKS_SUCCESS, { tasks: response.data.tasks.results }));
        } catch (error) {
            dispatch(taskFailure(types.GET_TASKS_FAILURE, error));
        }
    };
};

export const fetchTask = (taskId) => {
    return async (dispatch) => {
        dispatch(taskRequest(types.GET_TASK_REQUEST));
        try {
            const response = await getTask(taskId);
            dispatch(taskSuccess(types.GET_TASK_SUCCESS, { task: response.data.task }));
        } catch (error) {
            dispatch(taskFailure(types.GET_TASK_FAILURE, error));
        }
    };
};

export const addTask = (taskData) => {
    return async (dispatch) => {
        dispatch(taskRequest(types.CREATE_TASK_REQUEST));
        try {
            const response = await createTask(taskData);
            dispatch(taskSuccess(types.CREATE_TASK_SUCCESS, { task: response.data.task }));
        } catch (error) {
            dispatch(taskFailure(types.CREATE_TASK_FAILURE, error));
        }
    };
};

export const editTask = (taskId, updatedData) => {
    return async (dispatch) => {
        dispatch(taskRequest(types.UPDATE_TASK_REQUEST));
        try {
            const response = await updateTask(taskId, updatedData);
            dispatch(taskSuccess(types.UPDATE_TASK_SUCCESS, { task: response.data }));
        } catch (error) {
            dispatch(taskFailure(types.UPDATE_TASK_FAILURE, error));
        }
    };
};

export const removeTask = (taskId) => {
    return async (dispatch) => {
        dispatch(taskRequest(types.DELETE_TASK_REQUEST));
        try {
            const response = await deleteTask(taskId);
            dispatch(taskSuccess(types.DELETE_TASK_SUCCESS, { taskId: response.data.deletedTask._id }));
        } catch (error) {
            dispatch(taskFailure(types.DELETE_TASK_FAILURE, error));
        }
    };
};

export const addComment = (comment) => {
    return async (dispatch) => {
        dispatch(taskRequest(types.ADD_COMMENT_REQUEST));
        try {
            await createComment(comment);
            dispatch(taskSuccess(types.ADD_COMMENT_SUCCESS, { content: comment.content}));
        } catch (error) {
            dispatch(taskFailure(types.ADD_COMMENT_FAILURE, error));
        }
    };
};