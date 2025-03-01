import { produce } from 'immer'
import { types } from '../constants'

export const initialState = {
    isLoading: false,
    error: null,
    tasks: [],
    task: {},
}

const taskReducer = (state = initialState, action) => 
    produce(state, draft => {
        switch(action.type) {
            case types.CREATE_TASK_REQUEST:
                draft.isLoading = true;
                break;
            case types.CREATE_TASK_SUCCESS:
                draft.isLoading = false;
                draft.tasks.push(action.payload.task)
                draft.error = null;
                break;
            case types.CREATE_TASK_FAILURE:
                draft.isLoading = false;
                draft.error = action.payload.err;
                break;
            case types.GET_TASKS_SUCCESS:
                draft.tasks = action.payload.tasks
                draft.error = null;
                break;
            case types.GET_TASK_SUCCESS:
                draft.task = action.payload.task
                draft.error = null;
                break;
            case types.DELETE_TASK_SUCCESS:
                {
                    draft.isLoading = false;
                    draft.tasks = draft.tasks.filter(task => task._id !== action.payload.taskId);
                    draft.error = null;
                    break;
                }
            case types.UPDATE_TASK_SUCCESS:
                {
                    const index = draft.tasks.findIndex(task => task._id === action.payload.task._id);
                    if (index !== -1) {
                        draft.task = action.payload.task
                        draft.tasks[index] = action.payload.task;
                    }
                    draft.error = null;
                    break;
                }
            case types.ADD_COMMENT_SUCCESS: {
                draft.isLoading = false;
            
                draft.task = { 
                    ...draft.task, 
                    comments: [...draft.task.comments, action.payload.content]
                };
                
                draft.error = null;
                break;
            }
            case types.UPDATE_TASK_REQUEST:
            case types.DELETE_TASK_REQUEST:
            case types.GET_TASKS_REQUEST:
            case types.GET_TASK_REQUEST:
            case types.ADD_COMMENT_REQUEST:
                draft.isLoading = true;
                break;
            case types.UPDATE_TASK_FAILURE:
            case types.DELETE_TASK_FAILURE:
            case types.GET_TASKS_FAILURE:
            case types.GET_TASK_FAILURE: 
            case types.ADD_COMMENT_FAILURE:
                draft.error = action.payload.err;
                break;
            default:
                break;
        }
    });

export default taskReducer