import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { Languages } from "../constants/initialValues";

const ChangeLanguage = () => {
  const [openLanguage, setOpenLanguage] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem("language", e.target.value)
  };

  const handleOpenLanguage = () => {
    setOpenLanguage(prevState => !prevState);
  }

  return (
    <div className="flex justify-center items-center">
      <div className="dropdown relative">
          <button className="flex items-center justify-center cursor-pointer border-1 border-gray-300 w-25 p-2 rounded-sm shadow-md dark:text-white dark:bg-gray-800 text-black dark:text-white" onClick={handleOpenLanguage}>
            {localStorage?.getItem("language")?.toLocaleUpperCase()}
          </button>
            <AnimatePresence>
              {openLanguage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute z-20 flex flex-col top-12 left-0 border border-gray-300 rounded-md shadow-md bg-indigo-400 w-40 p-3 dark:bg-teal-600"
                >
                  <select
                    id="priority"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    name="priority"
                    onChange={changeLanguage}
                  >
                    {Languages.map((language) => (
                      <option key={language.id} value={language.short}>{language.name}</option>
                    ))}
                  </select>
                </motion.div>
                )}
            </AnimatePresence>
      </div>
    </div>
  );
};

export default ChangeLanguage;
