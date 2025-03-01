import React from 'react';
import TaskContent from './TaskContent';
import { DragDropContext } from "@hello-pangea/dnd";
import { BoardType } from '../../../constants/initialValues';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

function TaskBoard(props) {
  const { handleOpenTaskForm, removeTask, editTask, tasks } = props;
  const { t } = useTranslation()
  
  const groupedTasks = useMemo(() => {
    return (status) => tasks?.filter(task => task.status === status) || [];
  }, [tasks]);
  

  const onDragEnd = (result) => {
    const { destination, source, draggableId  } = result;

    if (!destination) {
      return;
    }

    const newTasks = tasks.map(task =>
      task._id === draggableId ? { ...task, status: destination.droppableId } : task
    )

    const updatedTask = newTasks.filter(task => task._id === draggableId)
    editTask(updatedTask[0]._id, updatedTask[0])
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="relative justify-center flex w-full lg:flex-nowrap flex-wrap">
        {BoardType.map(boardType => (
          <TaskContent
            key={boardType.id}
            boardType={boardType}
            t={t}
            handleOpenTaskForm={handleOpenTaskForm}
            tasks={groupedTasks(boardType.title)}
            removeTask={removeTask}
            contentTitle={t(boardType.title)}
            taskStatus={boardType.id}
          />
        ))}
      </div>
    </DragDropContext>
      
  );
}

export default TaskBoard;
