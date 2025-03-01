import { useTheme } from "../layout/ThemeContext";
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  return (
    <motion.button
      onClick={toggleTheme}
      className="lg:px-4 lg:py-2 w-20 lg:w-1/1 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {theme === "light" ? `🌙 ${t('darkMode')}` : `☀️ ${t('lightMode')}`}
      </motion.button>
  );
};

export default ThemeToggle;
