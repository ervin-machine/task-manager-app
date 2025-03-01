import React, { useState } from "react";
import { EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const TaskActions = (props) => {
  const [openActions, setOpenActions] = useState(false);
  const { task, handleOpenTaskForm, removeTask } = props

  const handleOpenActions = () => {
    setOpenActions(prevState => !prevState);
  }


  return (
    <div className="flex justify-center z-50">
      <div className="dropdown relative">
          <button onClick={handleOpenActions} className="cursor-pointer"><EllipsisVerticalIcon className="size-6 mt-1" /></button>
          <div className={`${openActions ? "block" : "hidden"} flex flex-col sticky rouded-md shadow-md p-3`}>
            <button onClick={() => handleOpenTaskForm(task)}><PencilSquareIcon className="size-5" /></button>
            <button onClick={() => removeTask(task._id)}><TrashIcon className="size-5" /></button>
          </div>
      </div>
    </div>
  );
};

export default TaskActions;
