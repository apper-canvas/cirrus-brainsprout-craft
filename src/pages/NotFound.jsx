import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function NotFound() {
  // Icon components
  const HomeIcon = getIcon('Home');
  const FrownIcon = getIcon('Frown');
  
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex justify-center mb-4">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full animate-ping"></div>
            <div className="relative bg-white dark:bg-surface-800 rounded-full p-4 shadow-soft">
              <FrownIcon size={64} className="text-primary" />
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-gradient">Oops!</span> Page Not Found
        </h1>
        <p className="text-lg md:text-xl text-surface-600 dark:text-surface-300 mb-8 max-w-md mx-auto">
          We can't seem to find the page you're looking for. Let's get you back to learning!
        </p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-semibold shadow-soft transition-all duration-300"
          >
            <HomeIcon size={20} />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8 p-6 bg-surface-50 dark:bg-surface-800/50 rounded-xl max-w-md"
      >
        <h3 className="font-bold mb-2">Try these instead:</h3>
        <ul className="text-left space-y-2">
          <li className="flex items-center gap-2">
            <span className="text-primary">•</span> 
            <Link to="/" className="text-primary hover:underline">Learn Math Skills</Link>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-secondary">•</span> 
            <Link to="/" className="text-secondary hover:underline">Practice Reading</Link>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent">•</span> 
            <Link to="/" className="text-accent hover:underline">Play Fun Games</Link>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

export default NotFound;