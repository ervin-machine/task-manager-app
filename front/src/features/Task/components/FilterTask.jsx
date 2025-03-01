import React, { useState } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import { priorities, statuses } from "../../../constants/initialValues";

const FilterTasksDropdown = ({ handleSetQuery, handleDeleteQuery, t, query }) => {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(prevState => !prevState);
  }

  const handleChangePriority = (e) => {
    if(e.target.value !== "Select priority") handleSetQuery({ "priority": e.target.value })
    else handleDeleteQuery("priority")
  }

  const handleChangeStatus = (e) => {
    if(e.target.value !== "Select status") handleSetQuery({ "status": e.target.value })
    else handleDeleteQuery("status")
  }

  const handleChangeDueDate = (e) => {
    if(e.target.value !== "") handleSetQuery({ "dueDate": e.target.value })
    else handleDeleteQuery("dueDate")
  }

  return (
    <div className="flex justify-center items-center m-1 lg:m-5">
      <div className="dropdown relative">
        {openFilter && <div className="fixed inset-0 z-40 pointer-events-auto" onClick={handleOpenFilter}></div>}
        <button
          onClick={handleOpenFilter}
          className="flex items-center relative justify-center cursor-pointer border border-gray-300 w-auto p-2 p-2 pl-4 pr-4 rounded-sm shadow-md dark:text-white"
        >
          <AdjustmentsHorizontalIcon className="size-4 mr-2 mt-1" />
          {t('filter')}
        </button>
        <AnimatePresence>
          {openFilter && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-12 z-70 left-0 md:right-0 lg:right-0 border border-gray-300 rounded-md shadow-md bg-indigo-400 w-72 p-3 dark:bg-teal-600"
            >
              <label htmlFor="priority" className="mb-3 block text-base font-medium text-white">
                {t('taskPriority')}
              </label>
              <select
                id="priority"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                name="priority"
                value={query?.priority}
                onChange={handleChangePriority}
              >
                <option value={null}>{t('selectPriority')}</option>
                {priorities.map((priority) => (
                  <option key={priority.id} value={priority.name}>{priority.name}</option>
                ))}
              </select>
              <label htmlFor="dueDate" className="mb-3 block text-base font-medium text-white">
                {t('taskDueDate')}
              </label>
              <input
                id="dueDate"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                name="dueDate"
                type="date"
                onChange={handleChangeDueDate}
                value={query?.dueDate}
              />
              <label htmlFor="priority" className="mb-3 block text-base font-medium text-white">
                {t('taskStatus')}
              </label>
              <select
                id="status"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                name="status"
                onChange={handleChangeStatus}
                value={query?.status}
              >
                <option>{t('selectStatus')}</option>
                {statuses.map(status => (
                  <option key={status.id}>{status.name}</option>
                ))}
              </select>
              <button onClick={handleOpenFilter} className="w-auto rounded-md mt-5 cursor-pointer border-1 border-gray-300 p-2 shadow-md text-white bg-indigo-600 mt-5 dark:bg-[#76ABAE] dark:text-black">{t('submitButton')}</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FilterTasksDropdown;
