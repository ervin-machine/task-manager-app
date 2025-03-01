import React from 'react'
import TaskCard from './TaskCard'
import { Droppable } from "@hello-pangea/dnd";

function TaskContent(props) {
  const { handleOpenTaskForm, tasks, removeTask, contentTitle, taskStatus, boardType } = props

  return (
    <div className='w-1/1 p-2'>
        <div className='h-10 bg-white dark:bg-[#76ABAE] w-[100%] lg:m-2 rounded-md text-center border-2 border-gray-300 shadow-sm pt-1'>{contentTitle}</div>
        <Droppable droppableId={boardType.title}>
          {(droppableProvided, snapshot) => (
            <div  ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps} className={snapshot.isDraggingOver ? " isDraggingOver" : ""}>
                {tasks?.map((task, index) => (
                   <TaskCard key={task._id} index={index} task={task} taskStatus={taskStatus} handleOpenTaskForm={handleOpenTaskForm} removeTask={removeTask} />
                ))}
                {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>  
      </div>
  )
}

export default TaskContent