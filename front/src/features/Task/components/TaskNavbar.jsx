import React from 'react'
import SortTasksDropdown from './SortTask'
import FilterTasksDropdown from './FilterTask'

function TaskNavbar({ handleOpenTaskForm, handleSetQuery, handleDeleteQuery, t, query, percentageCompletedTasks }) {
  const date = new Date().toLocaleDateString();
  return (
    <div className="pt-5 border-b-1 border-gray-300">
        <div className="px-4 mx-auto lg:px-6 lg:px-8">
            <div className="relative flex items-center justify-between lg:ml-20 lg:mr-20 items-center justify-between h-30 lg:h-20">
                <div className="flex items-center space-x-10 lg:flex-row md:flex-row flex-col">
                    <SortTasksDropdown t={t} handleSetQuery={handleSetQuery} handleDeleteQuery={handleDeleteQuery} />
                    <FilterTasksDropdown query={query} t={t} handleSetQuery={handleSetQuery} handleDeleteQuery={handleDeleteQuery} />
                    <p>Completed: {percentageCompletedTasks}%</p>
                </div>

                <div className="flex items-center space-x-10">
                    <p className="flex items-center justify-center border-1 border-gray-300 p-2 rounded-sm shadow-md dark:text-white">{date}</p>
                    <button onClick={() => handleOpenTaskForm(null)} className="w-auto rounded-md flex items-center justify-center cursor-pointer border-1 border-gray-300 p-2 shadow-md text-white bg-indigo-600 dark:bg-[#76ABAE] dark:text-black">{t('addNewTask')}</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TaskNavbar