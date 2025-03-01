import { createSelector } from 'reselect'
import { get } from 'lodash'

const selectData = state => state.user

const selectToken = () => createSelector(selectData, selectData => get(selectData, 'token'))
const selectUser = () => createSelector(selectData, selectData => get(selectData, 'user'))
const selectIsLoading = () => createSelector(selectData, selectData => get(selectData, 'isLoading'))
const selectError = () => createSelector(selectData, selectData => get(selectData, 'error'))

export { selectToken, selectUser, selectIsLoading, selectError }
