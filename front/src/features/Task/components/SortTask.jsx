import React, { useState } from "react";
import { Bars3BottomLeftIcon } from "@heroicons/react/16/solid";
import { motion, AnimatePresence } from "framer-motion";

const SortTasksDropdown = ({ t, handleSetQuery }) => {
  const [openSort, setOpenSort] = useState(false);

  const handleOpenSort = () => {
    setOpenSort(prevState => !prevState);
  }

  const handleSort = (sort) => {
    handleSetQuery(sort)
  }

  return (
    <div className="flex justify-center items-center m-1 lg:m-2">
      <div className="dropdown relative">
          {openSort && <div className="fixed inset-0 z-40 pointer-events-auto" onClick={handleOpenSort}></div>}
            <button className="flex items-center relative justify-center cursor-pointer border border-gray-300 w-auto p-2 p-2 pl-4 pr-4 rounded-sm shadow-md dark:text-white" onClick={handleOpenSort}>
              <Bars3BottomLeftIcon className="size-4 mr-2 mt-1" />
              {t('sort')}
            </button>
            <AnimatePresence>
              {openSort && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute flex z-70 flex-col top-12 left-0 border border-gray-300 rounded-md shadow-md bg-indigo-400 w-72 p-3 dark:bg-teal-600"
                >
                  <button onClick={() => handleSort({sortBy: "createdAt:asc"})} className="w-auto rounded-md mt-5 cursor-pointer border-1 border-gray-300 p-2 shadow-md text-white text-left mt-5 dark:bg-[#76ABAE] dark:text-black">{t('newest')}</button>
                  <button onClick={() => handleSort({sortBy: "createdAt:desc"})} className="w-auto rounded-md mt-5 cursor-pointer border-1 border-gray-300 p-2 shadow-md text-white text-left mt-5 dark:bg-[#76ABAE] dark:text-black">{t('oldest')}</button>
                  <button onClick={handleOpenSort} className="w-auto rounded-md mt-5 cursor-pointer border-1 border-gray-300 p-2 shadow-md text-white bg-indigo-600 mt-5 dark:bg-[#76ABAE] dark:text-black">{t('submitButton')}</button>
               </motion.div>
              )}
            </AnimatePresence>
      </div>
    </div>
  );
};

export default SortTasksDropdown;
