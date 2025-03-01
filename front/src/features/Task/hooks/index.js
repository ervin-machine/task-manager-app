import api from "../../../utils/api";
import queryParams from "../../../utils/queryParams";

export const createTask = (newTask) => {
    return api.post('task/', newTask);
}

export const updateTask = (id, updatedTask) => {
    return api.put('task/', { id, updatedData: updatedTask });
}

export const deleteTask = (taskId) => {
    return api.delete(`task/${taskId}`);
}

export const getTasks = (query) => {
    const params = new URLSearchParams({});
    queryParams(query, params)
    const url = `task?${params.toString()}`;
    return api.get(url);
}

export const getTask = (id) => {
    return api.get(`task/${id}`);
}

export const createComment = (comment) => {
    return api.post('task/add-comment', comment);
}