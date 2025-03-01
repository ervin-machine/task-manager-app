import './App.css';
import { motion } from "framer-motion";

import Header from './layout/Header';
import AppRoutes from './routes/AppRoutes';

function App() {

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <AppRoutes />
    </motion.div>
    
  )
}

export default App
