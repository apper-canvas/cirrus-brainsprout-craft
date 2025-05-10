import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

function MainFeature({ currentSubject }) {
  // Icons
  const StarIcon = getIcon('Star');
  const TrophyIcon = getIcon('Trophy');
  const CheckCircleIcon = getIcon('CheckCircle');
  const AlertCircleIcon = getIcon('AlertCircle');
  const ChevronRightIcon = getIcon('ChevronRight');
  const RefreshCcwIcon = getIcon('RefreshCcw');
  const ArrowUpIcon = getIcon('ArrowUp');
  const ArrowDownIcon = getIcon('ArrowDown');
  const BadgeIcon = getIcon('Award');
  const FireIcon = getIcon('Flame');
  
  // State management
  const [currentLevel, setCurrentLevel] = useState(1);
  const [questionsInLevel, setQuestionsInLevel] = useState(10);
  const [askedQuestions, setAskedQuestions] = useState([]);
  const [levelComplete, setLevelComplete] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [badges, setBadges] = useState([
    { id: 1, name: "Math Starter", earned: true, icon: "Medal" },
    { id: 2, name: "Reading Explorer", earned: true, icon: "BookOpen" },
    { id: 3, name: "Addition Master", earned: false, icon: "Plus" },
    { id: 4, name: "Subtraction Pro", earned: false, icon: "Minus" },
    { id: 5, name: "Word Wizard", earned: false, icon: "BookText" }
  ]);

  // Questions based on subject and difficulty
  const questionBanks = {
    math: {
      easy: [
        { question: "What is 2 + 3?", answer: "5", options: ["4", "5", "6", "7"] },
        { question: "What is 5 - 2?", answer: "3", options: ["2", "3", "4", "5"] },
        { question: "What is 1 + 1?", answer: "2", options: ["1", "2", "3", "4"] },
        { question: "What is 4 + 0?", answer: "4", options: ["0", "4", "6", "8"] },
        { question: "What is 3 + 2?", answer: "5", options: ["3", "4", "5", "6"] },
        { question: "What is 6 - 2?", answer: "4", options: ["2", "3", "4", "5"] },
        { question: "What is 3 + 3?", answer: "6", options: ["4", "5", "6", "7"] },
        { question: "What is 7 - 3?", answer: "4", options: ["2", "3", "4", "5"] },
        { question: "What is 2 + 4?", answer: "6", options: ["5", "6", "7", "8"] },
        { question: "What is 5 + 1?", answer: "6", options: ["4", "5", "6", "7"] }
      ],
      medium: [
        { question: "What is 5 + 7?", answer: "12", options: ["10", "11", "12", "13"] },
        { question: "What is 10 - 4?", answer: "6", options: ["4", "5", "6", "7"] },
        { question: "What is 3 × 2?", answer: "6", options: ["5", "6", "7", "8"] },
        { question: "What is 8 - 3?", answer: "5", options: ["3", "4", "5", "6"] },
        { question: "What is 4 + 6?", answer: "10", options: ["8", "9", "10", "11"] }
      ],
      hard: [
        { question: "What is 12 + 9?", answer: "21", options: ["19", "20", "21", "22"] },
        { question: "What is 15 - 7?", answer: "8", options: ["7", "8", "9", "10"] },
        { question: "What is 4 × 3?", answer: "12", options: ["10", "11", "12", "13"] },
        { question: "What is 10 ÷ 2?", answer: "5", options: ["4", "5", "6", "7"] },
        { question: "What is 5 × 4?", answer: "20", options: ["18", "19", "20", "21"] }
      ]
    },
    reading: {
      easy: [
        { question: "Which letter makes the 'ah' sound in 'cat'?", answer: "a", options: ["c", "a", "t", "e"] },
        { question: "What is the first letter in 'dog'?", answer: "d", options: ["b", "d", "g", "p"] },
        { question: "Which word rhymes with 'hat'?", answer: "cat", options: ["hit", "hot", "cat", "cut"] },
        { question: "How many letters are in the word 'sun'?", answer: "3", options: ["2", "3", "4", "5"] },
        { question: "Which word starts with 'b'?", answer: "ball", options: ["apple", "ball", "car", "dog"] },
        { question: "Which letter makes the 'sss' sound?", answer: "s", options: ["c", "s", "z", "t"] },
        { question: "Which word rhymes with 'red'?", answer: "bed", options: ["ride", "rod", "bed", "bad"] },
        { question: "What is the last letter in 'fish'?", answer: "h", options: ["f", "i", "s", "h"] },
        { question: "Which word has the sound 'oo'?", answer: "moon", options: ["man", "moon", "mine", "map"] },
        { question: "How many vowels in 'cat'?", answer: "1", options: ["0", "1", "2", "3"] }
      ],
      medium: [
        { question: "What is the opposite of 'hot'?", answer: "cold", options: ["warm", "cool", "cold", "wet"] },
        { question: "Finish the sentence: 'The sky is ___'", answer: "blue", options: ["green", "blue", "red", "yellow"] },
        { question: "Which word doesn't rhyme with 'cake'?", answer: "cat", options: ["bake", "make", "lake", "cat"] },
        { question: "How many syllables in 'elephant'?", answer: "3", options: ["2", "3", "4", "5"] },
        { question: "Which word means 'very big'?", answer: "huge", options: ["tiny", "small", "medium", "huge"] }
      ],
      hard: [
        { question: "Which is the verb in 'The dog runs fast'?", answer: "runs", options: ["the", "dog", "runs", "fast"] },
        { question: "What does 'enormous' mean?", answer: "very big", options: ["very small", "very fast", "very big", "very slow"] },
        { question: "Which word is a synonym for 'happy'?", answer: "joyful", options: ["sad", "angry", "joyful", "tired"] },
        { question: "What is the past tense of 'go'?", answer: "went", options: ["goed", "going", "gone", "went"] },
        { question: "How many vowels in 'beautiful'?", answer: "5", options: ["3", "4", "5", "6"] }
      ]
    },
    games: {
      easy: [
        { question: "Which shape has 3 sides?", answer: "triangle", options: ["circle", "square", "rectangle", "triangle"] },
        { question: "What color do you get mixing red and blue?", answer: "purple", options: ["green", "orange", "purple", "brown"] },
        { question: "How many legs does a cat have?", answer: "4", options: ["2", "4", "6", "8"] },
        { question: "What comes after 'Wednesday'?", answer: "Thursday", options: ["Tuesday", "Thursday", "Friday", "Monday"] },
        { question: "Which fruit is red?", answer: "apple", options: ["banana", "apple", "kiwi", "grape"] },
        { question: "How many fingers on one hand?", answer: "5", options: ["3", "4", "5", "6"] },
        { question: "Which animal swims in water?", answer: "fish", options: ["cat", "dog", "fish", "bird"] },
        { question: "What color is the sky?", answer: "blue", options: ["green", "blue", "red", "yellow"] },
        { question: "Which shape is round?", answer: "circle", options: ["square", "triangle", "rectangle", "circle"] },
        { question: "What comes after 'Wednesday'?", answer: "Thursday", options: ["Tuesday", "Thursday", "Friday", "Monday"] }
      ],
      medium: [
        { question: "What is the capital of France?", answer: "Paris", options: ["London", "Paris", "Rome", "Berlin"] },
        { question: "How many planets in our solar system?", answer: "8", options: ["7", "8", "9", "10"] },
        { question: "Which animal lives in the Arctic?", answer: "polar bear", options: ["tiger", "giraffe", "polar bear", "kangaroo"] },
        { question: "Which season comes after summer?", answer: "fall", options: ["winter", "spring", "fall", "summer"] },
        { question: "Which fruit is yellow on the outside?", answer: "banana", options: ["apple", "orange", "banana", "kiwi"] }
      ],
      hard: [
        { question: "How many continents are there?", answer: "7", options: ["5", "6", "7", "8"] },
        { question: "Which planet is known for its rings?", answer: "Saturn", options: ["Jupiter", "Mars", "Saturn", "Venus"] },
        { question: "Which dinosaur had three horns?", answer: "Triceratops", options: ["T-Rex", "Triceratops", "Stegosaurus", "Brachiosaurus"] },
        { question: "What is the largest ocean?", answer: "Pacific", options: ["Atlantic", "Indian", "Arctic", "Pacific"] },
        { question: "How many sides does a hexagon have?", answer: "6", options: ["5", "6", "7", "8"] }
      ]
    }
  };

  // Get a new question based on current subject and difficulty
  const getNewQuestion = () => {
    setIsLoading(true);
    setShowAnswer(false);
    setUserAnswer('');
    setIsCorrect(null);
    setLevelComplete(false);
    
    setTimeout(() => {
      const subjectQuestions = questionBanks[currentSubject] || questionBanks.math;
      const difficultyQuestions = subjectQuestions[difficulty] || subjectQuestions.easy;
      
      if (difficultyQuestions && difficultyQuestions.length > 0) {
        // Filter out questions that have already been asked in this level
        const availableQuestions = difficultyQuestions.filter(
          (q) => !askedQuestions.includes(q.question)
        );
        
        if (availableQuestions.length > 0) {
          // Get a random question from available questions
          const randomIndex = Math.floor(Math.random() * availableQuestions.length);
          const nextQuestion = availableQuestions[randomIndex];
          setCurrentQuestion(nextQuestion);
          
          // Add this question to asked questions
          setAskedQuestions(prev => [...prev, nextQuestion.question]);
          
          // Decrease questions remaining in level
          setQuestionsInLevel(prev => prev - 1);
        } else {
          // If we've run out of unique questions, show level complete
          setLevelComplete(true);
          setCurrentQuestion(null);
        }
      } else {
        setCurrentQuestion(null);
      }
      
      setIsLoading(false);
    }, 800);
  };

  // Complete the current level and move to the next
  const completeLevel = () => {
    // Increase level
    setCurrentLevel(prev => prev + 1);
    
    // Reset questions for new level
    setQuestionsInLevel(10);
    setAskedQuestions([]);
    setLevelComplete(false);
    
    // Give rewards for completing level
    const levelPoints = currentLevel * 5;
    setScore(prev => prev + levelPoints);
    
    // Show toast for level completion
    toast.success(`🎉 Level ${currentLevel} completed! +${levelPoints} points!`);
    
    // Add level badge for milestone levels
    if (currentLevel === 3 && !badges.find(b => b.name === "Level 3 Master")) {
      setBadges(prev => [...prev, { 
        id: prev.length + 1, 
        name: "Level 3 Master", 
        earned: true, 
        icon: "Crown" 
      }]);
      
      toast.info("🏆 New badge earned: Level 3 Master!", {
        autoClose: 5000,
        icon: "👑"
      });
    }
  };

  // Handle difficulty change
  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
  // Reset level when changing difficulty or subject
  useEffect(() => {
    setCurrentLevel(1);
    setQuestionsInLevel(10);
    setAskedQuestions([]);
    setLevelComplete(false);
  }, [currentSubject, difficulty]);

    toast.info(`Difficulty changed to ${newDifficulty}!`);
  };

  // Check the user's answer
  const checkAnswer = () => {
    if (!userAnswer) {
      toast.warning("Please select an answer!");
      return;
    }
    
    const correct = userAnswer === currentQuestion.answer;
    setIsCorrect(correct);
    setShowAnswer(true);
    
    if (correct) {
      // Update score based on difficulty
      const difficultyPoints = { easy: 1, medium: 2, hard: 3 };
      const points = difficultyPoints[difficulty] || 1;
      setScore(prevScore => prevScore + points);
      
      // Update streak
      setStreak(prevStreak => prevStreak + 1);
      
      // Check for streak achievements
      if (streak + 1 === 3) {
        toast.success("🔥 3 correct answers in a row! Keep it up!");
      } else if (streak + 1 === 5) {
        toast.success("🏆 5 streak achieved! You're on fire!");
        // Add streak badge
        if (!badges.find(b => b.name === "Streak Master")) {
          setBadges(prev => [...prev, { 
            id: prev.length + 1, 
            name: "Streak Master", 
            earned: true, 
            icon: "Flame" 
          }]);
          
          toast.info("🎖️ New badge earned: Streak Master!", {
            autoClose: 5000,
            icon: "🏅"
          });
        }
      }
      
      toast.success("Correct answer! 🎉");
    } else {
      // Reset streak on wrong answer
      setStreak(0);
      toast.error("Not quite right. Try again!");
    }
  };

  // Get subject title for display
  const getSubjectTitle = () => {
    const titles = {
      math: "Math Challenge",
      reading: "Reading Adventure",
      games: "Fun Brain Games",
      stats: "Your Progress",
      settings: "Game Settings"
    };
    return titles[currentSubject] || "BrainSprout Challenge";
  };
  
  // Custom styling for different subjects
  const subjectStyles = {
    math: "from-blue-500 to-indigo-500",
    reading: "from-purple-500 to-pink-500",
    games: "from-orange-500 to-red-500",
    stats: "from-green-500 to-teal-500",
    settings: "from-gray-500 to-slate-700"
  };
  
  // Handle next question
  const handleNextQuestion = () => {
    // If we've completed all questions in the level, mark level as complete
    if (questionsInLevel <= 0) {
      setLevelComplete(true);
    } else {
      getNewQuestion();
    }
  };
  
  // Start next level
  const handleNextLevel = () => {
    completeLevel();
    // Get first question of new level
    getNewQuestion();
  };
  
  // Initialize the first question
  useEffect(() => {
    getNewQuestion();
  }, []);
  
  useEffect(() => {
    getNewQuestion();
  };

  return (
    <div className="py-4">
      {/* Subject Header */}
      <div className={`mb-6 p-4 rounded-xl bg-gradient-to-r ${subjectStyles[currentSubject] || 'from-primary to-secondary'} text-white`}>
        <h3 className="text-xl md:text-2xl font-bold flex items-center">
          {getSubjectTitle()}
          <BadgeIcon className="ml-2" size={24} />
        </h3>
        <div className="flex items-center mt-2 text-white/80">
          <div className="flex items-center mr-4">
            <StarIcon size={16} className="mr-1" />
            <span className="text-sm font-medium">Level: {currentLevel}</span>
          </div>
          <div className="flex items-center mr-4">
            <StarIcon size={16} className="mr-1" />
            <span className="text-sm font-medium">Score: {score}</span>
          </div>
          <div className="flex items-center">
            <FireIcon size={16} className="mr-1" />
            <span className="text-sm font-medium">Streak: {streak}</span>
          </div>
        </div>
      </div>
      
      {/* Difficulty Selector */}
      <div className="mb-6 flex justify-center">
        <div className="bg-surface-100 dark:bg-surface-800 rounded-full p-1 flex">
          {['easy', 'medium', 'hard'].map((level) => (
            <button
              key={level}
              onClick={() => handleDifficultyChange(level)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                difficulty === level 
                  ? 'bg-white dark:bg-surface-700 text-primary shadow-sm' 
                  : 'text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
      
      {/* Question Card */}
      <div className="mb-4 px-4">
        <div className="w-full bg-surface-200 dark:bg-surface-700 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-primary h-full transition-all duration-300 ease-out"
            style={{ width: `${(10 - questionsInLevel) * 10}%` }}
          ></div>
        </div>
        <p className="text-xs text-right mt-1 text-surface-500">Question {10 - questionsInLevel + 1} of 10</p>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion?.question || 'loading'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card mb-6"
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
              <p className="text-surface-600 dark:text-surface-400">Loading question...</p>
            </div>
          ) : levelComplete ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrophyIcon size={40} className="text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Level {currentLevel} Complete!</h3>
              <p className="text-surface-600 dark:text-surface-400 mb-6">
                Congratulations! You've completed all 10 questions in this level.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={handleNextLevel}
                  className="btn btn-primary flex items-center"
                >
                  <span>Continue to Level {currentLevel + 1}</span>
                  <ChevronRightIcon size={20} className="ml-1" />
                </button>
              </div>
            </div>

          ) : currentQuestion ? (
            <>
              <div className="mb-6">
                <h4 className="text-lg md:text-xl font-bold mb-2">Question:</h4>
                <p className="text-lg">{currentQuestion.question}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-md font-semibold mb-3">Choose your answer:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setUserAnswer(option)}
                      disabled={showAnswer}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        userAnswer === option 
                          ? 'border-primary bg-primary/10 dark:bg-primary/20' 
                          : 'border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600'
                      } ${
                        showAnswer 
                          ? option === currentQuestion.answer
                            ? 'border-green-500 bg-green-100 dark:bg-green-900/30'
                            : userAnswer === option
                              ? 'border-red-500 bg-red-100 dark:bg-red-900/30'
                              : ''
                          : ''
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-between">
                {!showAnswer ? (
                  <button
                    onClick={checkAnswer}
                    disabled={!userAnswer}
                    className={`btn ${
                      userAnswer 
                        ? 'btn-primary' 
                        : 'bg-surface-300 dark:bg-surface-700 cursor-not-allowed'
                    }`}
                  >
                    Check Answer
                  </button>
                ) : (
                  <div className="flex-1 flex items-center">
                    {isCorrect ? (
                      <div className="flex items-center text-green-600 dark:text-green-400">
                        <CheckCircleIcon size={20} className="mr-2" />
                        <span className="font-medium">Correct! Great job!</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600 dark:text-red-400">
                        <AlertCircleIcon size={20} className="mr-2" />
                        <span className="font-medium">
                          Oops! The correct answer is: {currentQuestion.answer}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                
                {showAnswer && (
                  <button
                    onClick={handleNextQuestion}
                    className="btn btn-accent flex items-center justify-center sm:justify-start"
                  >
                    <span>Next Question</span>
                    <ChevronRightIcon size={20} className="ml-1" />
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-surface-600 dark:text-surface-400 mb-4">
                No questions available for this category.
              </p>
              <button
                onClick={getNewQuestion}
                className="btn btn-primary flex items-center mx-auto"
              >
                <RefreshCcwIcon size={16} className="mr-2" />
                <span>Refresh</span>
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Achievements & Badges */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <TrophyIcon size={20} className="mr-2 text-yellow-500" />
          Your Achievements
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {badges.map((badge) => {
            const BadgeIconComponent = getIcon(badge.icon);
            
            return (
              <div
                key={badge.id}
                className={`relative p-4 rounded-xl flex flex-col items-center text-center ${
                  badge.earned 
                    ? 'bg-surface-100 dark:bg-surface-800' 
                    : 'bg-surface-100/50 dark:bg-surface-800/50 opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  badge.earned 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-surface-300 dark:bg-surface-700 text-surface-500'
                }`}>
                  <BadgeIconComponent size={24} />
                </div>
                <h4 className="text-sm font-semibold">{badge.name}</h4>
                {!badge.earned && (
                  <span className="text-xs text-surface-500 mt-1">Locked</span>
                )}
                {badge.earned && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircleIcon size={12} className="text-white" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Difficulty Explanation */}
      <div className="mt-8 bg-surface-50 dark:bg-surface-800/50 rounded-xl p-4 text-sm">
        <h4 className="font-semibold mb-2">Difficulty Levels:</h4>
        <ul className="space-y-2">
          <li className="flex items-start">
            <div className="mr-2 mt-1 text-green-500">
              <ArrowDownIcon size={14} />
            </div>
            <span><strong>Easy:</strong> Simple questions for beginners (Ages 5-6)</span>
          </li>
          <li className="flex items-start">
            <div className="mr-2 mt-1 text-yellow-500">
              <span className="inline-block w-3 h-0.5 bg-yellow-500"></span>
            </div>
            <span><strong>Medium:</strong> Intermediate questions to challenge growing minds (Ages 7-8)</span>
          </li>
          <li className="flex items-start">
            <div className="mr-2 mt-1 text-red-500">
              <ArrowUpIcon size={14} />
            </div>
            <span><strong>Hard:</strong> Advanced questions for skilled learners (Ages 9-10)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MainFeature;