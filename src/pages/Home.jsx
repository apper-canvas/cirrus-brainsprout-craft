import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

function Home() {
  const [currentTab, setCurrentTab] = useState('math');
  
  // Icon components
  const MathIcon = getIcon('Calculator');
  const ReadingIcon = getIcon('BookOpen');
  const GamesIcon = getIcon('Gamepad2');
  const StatsIcon = getIcon('BarChart');
  const SettingsIcon = getIcon('Settings');
  
  const tabVariants = {
    inactive: { 
      opacity: 0.7, 
      y: 0,
      transition: { duration: 0.2 } 
    },
    active: { 
      opacity: 1, 
      y: -5,
      transition: { duration: 0.3, type: "spring", stiffness: 300 } 
    }
  };
  
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    
    const messages = {
      math: "Math games loaded! 🧮",
      reading: "Reading activities ready! 📚",
      games: "Fun games section opened! 🎮",
      stats: "Progress tracking loaded! 📊",
      settings: "Settings menu opened! ⚙️"
    };
    
    toast.info(messages[tab]);
  };

  return (
    <div className="pb-20">
      {/* Hero section */}
      <section className="py-8 mb-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Making Learning <span className="text-gradient">Fun & Engaging</span>
            </h1>
            <p className="text-lg md:text-xl text-surface-600 dark:text-surface-300 mb-6">
              BrainSprout helps children aged 5-10 develop essential math and reading skills through interactive games.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="btn btn-primary"
                onClick={() => handleTabChange('math')}
              >
                Start Learning Math
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => handleTabChange('reading')}
              >
                Explore Reading
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <motion.img 
              src="https://pixabay.com/get/g81c95e3f46f44dbbe1edee2d673bdd9af1f0edd98b4eb5e83ab7dc4ceab17c8d5cc2a0b5eb8f8dc9ec4e9a0efc0a0d85_640.png" 
              alt="Children learning with BrainSprout" 
              className="w-full max-w-md rounded-2xl shadow-neu-light dark:shadow-neu-dark"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </section>
      
      {/* Main learning area */}
      <motion.section
        className="card"
        initial="hidden"
        animate="visible"
        variants={contentVariants}
      >
        <h2 className="text-2xl font-bold mb-6">Learning Dashboard</h2>
        
        {/* Main Feature Component */}
        <MainFeature currentSubject={currentTab} />
      </motion.section>
      
      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-900 shadow-lg border-t border-surface-200 dark:border-surface-700 p-2 z-30">
        <div className="flex justify-around max-w-xl mx-auto">
          <motion.button
            variants={tabVariants}
            initial="inactive"
            animate={currentTab === 'math' ? "active" : "inactive"}
            onClick={() => handleTabChange('math')}
            className="flex flex-col items-center p-2 rounded-lg"
          >
            <MathIcon size={24} className={`${currentTab === 'math' ? 'text-primary' : 'text-surface-500'}`} />
            <span className={`text-xs mt-1 ${currentTab === 'math' ? 'text-primary font-bold' : 'text-surface-500'}`}>Math</span>
          </motion.button>
          
          <motion.button
            variants={tabVariants}
            initial="inactive"
            animate={currentTab === 'reading' ? "active" : "inactive"}
            onClick={() => handleTabChange('reading')}
            className="flex flex-col items-center p-2 rounded-lg"
          >
            <ReadingIcon size={24} className={`${currentTab === 'reading' ? 'text-primary' : 'text-surface-500'}`} />
            <span className={`text-xs mt-1 ${currentTab === 'reading' ? 'text-primary font-bold' : 'text-surface-500'}`}>Reading</span>
          </motion.button>
          
          <motion.button
            variants={tabVariants}
            initial="inactive"
            animate={currentTab === 'games' ? "active" : "inactive"}
            onClick={() => handleTabChange('games')}
            className="flex flex-col items-center p-2 rounded-lg"
          >
            <GamesIcon size={24} className={`${currentTab === 'games' ? 'text-primary' : 'text-surface-500'}`} />
            <span className={`text-xs mt-1 ${currentTab === 'games' ? 'text-primary font-bold' : 'text-surface-500'}`}>Games</span>
          </motion.button>
          
          <motion.button
            variants={tabVariants}
            initial="inactive"
            animate={currentTab === 'stats' ? "active" : "inactive"}
            onClick={() => handleTabChange('stats')}
            className="flex flex-col items-center p-2 rounded-lg"
          >
            <StatsIcon size={24} className={`${currentTab === 'stats' ? 'text-primary' : 'text-surface-500'}`} />
            <span className={`text-xs mt-1 ${currentTab === 'stats' ? 'text-primary font-bold' : 'text-surface-500'}`}>Progress</span>
          </motion.button>
          
          <motion.button
            variants={tabVariants}
            initial="inactive"
            animate={currentTab === 'settings' ? "active" : "inactive"}
            onClick={() => handleTabChange('settings')}
            className="flex flex-col items-center p-2 rounded-lg"
          >
            <SettingsIcon size={24} className={`${currentTab === 'settings' ? 'text-primary' : 'text-surface-500'}`} />
            <span className={`text-xs mt-1 ${currentTab === 'settings' ? 'text-primary font-bold' : 'text-surface-500'}`}>Settings</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Home;