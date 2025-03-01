import React, { useState, useEffect } from 'react'
import { UserIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from "framer-motion";

function UserMenu({ logoutUser }) {
    const [openUserMenu, setOpenUserMenu] = useState(false);

    const handleOpenUserMenu = () => {
        setOpenUserMenu(prevState => !prevState);
    }

  
    return (
      <div className="flex justify-center items-center">
        <div className="dropdown relative">
                <button title="" className="flex items-center justify-center w-10 h-10 bg-white rounded-full dark:bg-black" onClick={handleOpenUserMenu}>
                    <UserIcon aria-hidden="true" className="size-6 text-black-600 dark:text-white"/>
                </button>
              <AnimatePresence>
                {openUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute top-12 right-0 border border-gray-300 rounded-md shadow-md bg-indigo-400 w-auto p-3 text-white dark:bg-teal-600 dark:text-black"
                  >
                    <button onClick={logoutUser}>Logout</button>
                 </motion.div>
                          )}
              </AnimatePresence>
        </div>
      </div>
  )
}

export default UserMenu