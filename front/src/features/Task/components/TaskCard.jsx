import React from 'react';
import { Link } from 'react-router-dom';
import TaskActions from './TaskActions';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import getPriorityClass from '../../../utils/getPriorityClass';
import convertDate from '../../../utils/convertDate';
import { Draggable } from "@hello-pangea/dnd";
import truncatText from '../../../utils/truncatText';

const TaskCard = React.memo((props) => {
  const { task, handleOpenTaskForm, removeTask, index } = props;

  return (
    <Draggable draggableId={String(task._id)} index={index}>
      {(provided, snapshot) => (
        <div
          sx={{ marginBottom: 1 }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div  
            style={{
              opacity: snapshot.isDragging ? 0.9 : 1,
              transform: snapshot.isDragging ? "rotate(-2deg)" : "",
            }}
            elevation={snapshot.isDragging ? 3 : 1} className="flex flex-col items-center justify-center border-2 border-gray-300 shadow-sm bg-white w-full mt-2 lg:m-2 rounded-md text-center p-5 dark:bg-[#76ABAE]"
          >
            <div className={`rounded-lg flex flex-col items-center justify-center pt-2 bg-gradient-to-t from-slate-50 ${getPriorityClass(task?.priority)} w-full h-auto`}>
              {task.priority}
              <div className="flex flex-col rounded-lg bg-white w-full p-5 h-auto mt-2">
                <div className="flex w-full">
                  <Link to={`/detail/${task._id}`} className="w-full">
                    <div data-testid="card" className="flex flex-col items-start border-dashed border-2 rounded-lg bg-white w-full p-5 h-auto mt-2">
                      <h3 data-testid="title">{task.title}</h3>
                      <p className='text-left'>{truncatText(task.description)}</p>
                    </div>
                  </Link>
                  <TaskActions handleOpenTaskForm={handleOpenTaskForm} task={task} removeTask={removeTask} />
                </div>
                <div className="flex">
                  <p className="m-2 flex items-center">
                    <ChatBubbleLeftIcon className="size-4 mt-1 mr-1" /> {task?.comments?.length}
                  </p>
                  <p className="m-2">{convertDate(task.dueDate)}</p>
                  <p className="m-2">{task.category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>)}
    </Draggable>
  );
});

export default TaskCard;
