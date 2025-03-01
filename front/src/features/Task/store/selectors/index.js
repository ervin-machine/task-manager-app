import { createSelector } from 'reselect'
import { get } from 'lodash'

const selectData = state => state.task

const selectTasks = () => createSelector(selectData, selectData => get(selectData, 'tasks'))
const selectTask = () => createSelector(selectData, selectData => get(selectData, 'task'))

export { selectTasks, selectTask }
