import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';

import TaskFormModal from '../features/Task/components/TaskFormModal';
import TaskNavbar from '../features/Task/components/TaskNavbar';
import TaskBoard from '../features/Task/components/TaskBoard';

import { selectTasks } from '../features/Task/store/selectors';
import { addTask, editTask, removeTask, fetchTasks } from '../features/Task/store/actions';
import { logoutUser } from '../features/User/store/actions';
import { selectUser } from '../features/User/store/selectors';
import { initialQuery } from '../constants/initialValues';

function Dashboard({ tasks, addTask, editTask, removeTask, fetchTasks, user }) {
  const [openTaskForm, setOpenTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [query, setQuery] = useState(initialQuery);
  const { t } = useTranslation();

  const completedTasks = tasks?.filter(task => task.status === "Completed");
  const percentageCompletedTasks = tasks.length === 0 ? 0 : Math.round((completedTasks?.length / tasks?.length) * 100);

  const handleOpenTaskForm = (task) => {
    setSelectedTask(task);
    setOpenTaskForm(prevState => !prevState);
  };

  const handleSetQuery = (newQuery) => {
    setQuery(prevState => ({
      ...prevState,
      ...newQuery, 
    }));
  };

  const handleDeleteQuery = (queryToDelete) => {
    setQuery(prevState => {
      const updatedQuery = { ...prevState };
      delete updatedQuery[queryToDelete];
      return updatedQuery;
    });
  };

  useEffect(() => {
    if (user?._id && !query.createdBy) {
      setQuery(prevQuery => ({
        ...prevQuery,
        createdBy: user._id, // Only set once to avoid unnecessary re-renders
      }));
    }
  }, [user]);
  
  useEffect(() => {
    if (user?._id && query.createdBy) {
      fetchTasks(query);
    }
  }, [query]); 

  return (
    <div>
      <TaskNavbar 
        percentageCompletedTasks={percentageCompletedTasks}
        query={query}
        t={t}
        handleOpenTaskForm={handleOpenTaskForm}
        handleSetQuery={handleSetQuery}
        handleDeleteQuery={handleDeleteQuery} 
      />
      <TaskBoard
        handleOpenTaskForm={handleOpenTaskForm}
        tasks={tasks}
        removeTask={removeTask}
        editTask={editTask} 
      />
      <TaskFormModal 
        t={t}
        userID={user?._id}
        selectedTask={selectedTask}
        editTask={editTask}
        addTask={addTask}
        open={openTaskForm}
        setOpen={handleOpenTaskForm} 
      />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  tasks: selectTasks(),
  user: selectUser(),
});

const mapDispatchToProps = dispatch => ({
  addTask: (taskData) => dispatch(addTask(taskData)),
  editTask: (taskId, taskData) => dispatch(editTask(taskId, taskData)),
  removeTask: (taskId) => dispatch(removeTask(taskId)),
  fetchTasks: (query) => dispatch(fetchTasks(query)),
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
