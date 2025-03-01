import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom'
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
import { PencilSquareIcon, TrashIcon, BackwardIcon } from "@heroicons/react/24/outline";
import convertDate from '../utils/convertDate';

import CommentsTask from '../features/Task/components/CommentsTask';
import TaskFormModal from '../features/Task/components/TaskFormModal';

import { selectTask } from '../features/Task/store/selectors';
import { fetchTask, addComment, editTask, removeTask } from '../features/Task/store/actions';

function TaskDetail(props) {
  const { task, fetchTask, addComment, editTask, removeTask } = props;
  const [openTaskForm, setOpenTaskForm] = useState(false)
  const { id } = useParams();
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleOpenTaskForm = () => {
    setOpenTaskForm(prevState => !prevState);
  }

  const handleDeletTask = async () => {
    await removeTask(task?._id)
    navigate('/dashboard')
  }

  useEffect(() => {
    fetchTask(id);
  }, [])

  return (
    <div>
        <Link to="/dashboard" className='flex m-5 text-xl items-center dark:text-white'><BackwardIcon className='size-6'/> Back</Link>
        <div className='flex justify-between items-center border-2 border-gray-300 h-auto p-5 m-2'>
            <h1 className='text-6xl text-gray-600 dark:text-white'>{task?.title}</h1>
            <div className='flex'>
                <button className='cursor-pointer' onClick={handleOpenTaskForm}><PencilSquareIcon className='size-7' /></button>
                <button className='cursor-pointer' onClick={handleDeletTask}><TrashIcon className='size-7' /></button>
            </div>
        </div>
        <div className='border-2 border-gray-300 h-auto p-5 m-2'>
            <div className='text-gray-600 dark:text-white'>
                {t('taskStatus')}: {task?.status}
            </div>
            <div className='text-gray-600 dark:text-white'>
                {t('taskDueDate')}: {convertDate(task?.dueDate)}
            </div>
            <div className='text-gray-600 dark:text-white'>
                {t('taskCategory')}: {task?.category}
            </div>
            <div className='text-gray-600 dark:text-white'>
                {t('taskProgress')}: {task?.percentage}
            </div>
            <div className='text-gray-600 dark:text-white'>
                {t('taskDesc')}:
                <p className='border-2 border-gray-300 p-4 ml-20'>{task?.description}</p>
            </div>
        </div>
        <CommentsTask task={task} addComment={addComment} />
        <TaskFormModal t={t} selectedTask={task} editTask={editTask} open={openTaskForm} setOpen={handleOpenTaskForm} />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
    task: selectTask(),
  });
  
  const mapDispatchToProps = dispatch => {
    return {
        fetchTask: (taskId) => {
            dispatch(fetchTask(taskId))
        },
        addComment: (comment) => {
            dispatch(addComment(comment))
        },
        editTask: (taskId, taskData) => {
            dispatch(editTask(taskId, taskData))
        },
        removeTask: (taskId) => {
            dispatch(removeTask(taskId))
        }
    }
  }
  
  const withConnect = connect(mapStateToProps, mapDispatchToProps)
  export default (withConnect)(TaskDetail);