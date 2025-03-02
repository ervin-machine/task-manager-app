import React, { useState } from "react";
import { Bars3BottomLeftIcon } from "@heroicons/react/16/solid";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';

const ChangeLanguage = () => {
  const [openLanguage, setOpenLanguage] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng)
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
                  <button onClick={() => changeLanguage('en')}>{t('english')}</button>
                  <button onClick={() => changeLanguage('it')}>{t('italy')}</button>
                  <button onClick={() => changeLanguage('de')}>{t('germany')}</button>
                </motion.div>
                )}
            </AnimatePresence>
      </div>
    </div>
  );
};

export default ChangeLanguage;
