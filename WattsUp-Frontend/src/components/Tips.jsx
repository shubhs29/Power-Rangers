import React, { useState, useEffect } from 'react';
import { Zap, Star, Award, ThumbsUp, Calendar, Lightbulb, ArrowRight, ChevronLeft, ChevronRight, ArrowLeftCircle } from 'lucide-react';

function Tips() {
  const [activeTab, setActiveTab] = useState('daily');
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [savedTips, setSavedTips] = useState([]);

  // Function to handle navigation
  const navigateTo = (path) => {
    window.location.href = path;
  };

  // Sample tips data
  const dailyTips = [
    {
      id: 1,
      title: "Geyser Optimization",
      content: "Your geyser's hotter than the weather — turn it off after use and save up to 15% on your water heating costs.",
      impact: "Potential savings: ₹120/month",
      category: "Water Heating",
      difficulty: "easy"
    },
    {
      id: 2,
      title: "AC Efficiency",
      content: "AC's chillin' 24/7 — your wallet's not. Try turning it off 30 mins early! This small change can reduce your cooling costs substantially.",
      impact: "Potential savings: ₹200/month",
      category: "Cooling",
      difficulty: "medium"
    },
    {
      id: 3,
      title: "Washing Machine Insight",
      content: "Washing clothes at 30°C instead of 40°C can reduce energy usage by up to 40% per cycle without affecting cleanliness.",
      impact: "Potential savings: ₹80/month",
      category: "Appliances",
      difficulty: "easy"
    },
    {
      id: 4,
      title: "Refrigerator Placement",
      content: "Your fridge is working overtime near that sunny window. Moving it away from direct sunlight could improve efficiency by 15%.",
      impact: "Potential savings: ₹90/month",
      category: "Appliances",
      difficulty: "medium"
    }
  ];

  const weeklyTips = [
    {
      id: 5,
      title: "Energy Vampire Hunt",
      content: "This week, try unplugging devices not in use. We detected 8 'energy vampires' in your home drawing power even when off.",
      impact: "Potential savings: ₹150/month",
      category: "Standby Power",
      difficulty: "easy"
    },
    {
      id: 6,
      title: "Lighting Upgrade",
      content: "Based on your usage patterns, replacing your 5 most-used light fixtures with LEDs would pay for itself in just 3 months.",
      impact: "Potential savings: ₹175/month",
      category: "Lighting",
      difficulty: "medium"
    }
  ];

  // Toggle for saving tips
  const toggleSaveTip = (tip) => {
    if (savedTips.some(savedTip => savedTip.id === tip.id)) {
      setSavedTips(savedTips.filter(savedTip => savedTip.id !== tip.id));
    } else {
      setSavedTips([...savedTips, tip]);
    }
    
    // Trigger animation
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 800);
  };

  // Handle tip navigation
  const handlePrevTip = () => {
    const tips = activeTab === 'daily' ? dailyTips : weeklyTips;
    setCurrentTipIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : tips.length - 1));
  };

  const handleNextTip = () => {
    const tips = activeTab === 'daily' ? dailyTips : weeklyTips;
    setCurrentTipIndex((prevIndex) => (prevIndex < tips.length - 1 ? prevIndex + 1 : 0));
  };

  // Reset current tip index when changing tabs
  useEffect(() => {
    setCurrentTipIndex(0);
  }, [activeTab]);

  // Get current tip based on active tab
  const getCurrentTips = () => activeTab === 'daily' ? dailyTips : weeklyTips;
  const currentTip = getCurrentTips()[currentTipIndex];

  // Define difficulty color
  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-50 to-blue-100 py-8 px-4 sm:px-6">
      {/* Energy animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-yellow-300 opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 rounded-full bg-green-400 opacity-20 animate-pulse"></div>
        <div className="absolute top-1/4 right-1/3 w-12 h-12 rounded-full bg-blue-300 opacity-20 animate-pulse"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Back Navigation Button */}
        <button 
          onClick={() => navigateTo("/leaderboard")}
          className="mb-5 flex items-center text-gray-700 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeftCircle size={20} className="mr-2" />
          <span>Back to Leaderboard</span>
        </button>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-emerald-500 p-2 rounded-full">
              <Lightbulb size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold ml-3 bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent">
              Smart Energy Tips
            </h1>
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            <Calendar size={16} className="mr-1" />
            <span>April 18, 2025</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-t-2xl shadow-sm mb-1 flex">
          <button 
            onClick={() => setActiveTab('daily')} 
            className={`flex-1 py-4 text-center font-medium transition-all ${activeTab === 'daily' ? 'text-emerald-600 border-b-2 border-emerald-500' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Zap size={18} className="inline mr-2" />
            Daily Tips
          </button>
          <button 
            onClick={() => setActiveTab('weekly')} 
            className={`flex-1 py-4 text-center font-medium transition-all ${activeTab === 'weekly' ? 'text-emerald-600 border-b-2 border-emerald-500' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Award size={18} className="inline mr-2" />
            Weekly Insights
          </button>
          <button 
            onClick={() => setActiveTab('saved')} 
            className={`flex-1 py-4 text-center font-medium transition-all ${activeTab === 'saved' ? 'text-emerald-600 border-b-2 border-emerald-500' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Star size={18} className="inline mr-2" />
            Saved Tips
            {savedTips.length > 0 && (
              <span className="ml-2 bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-1 rounded-full">
                {savedTips.length}
              </span>
            )}
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-b-2xl shadow-lg p-6 relative overflow-hidden">
          {/* Success animation */}
          {showAnimation && (
            <div className="absolute inset-0 flex items-center justify-center bg-emerald-500 bg-opacity-20 z-10">
              <div className="bg-white rounded-full p-4 shadow-lg">
                <ThumbsUp size={32} className="text-emerald-500 animate-bounce" />
              </div>
            </div>
          )}

          {activeTab !== 'saved' ? (
            <>
              {/* Tip Navigation */}
              <div className="flex justify-between items-center mb-4">
                <button 
                  onClick={handlePrevTip}
                  className="p-2 rounded-full hover:bg-gray-100 transition-all"
                >
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>
                <div className="text-sm text-gray-500">
                  Tip {currentTipIndex + 1} of {getCurrentTips().length}
                </div>
                <button 
                  onClick={handleNextTip}
                  className="p-2 rounded-full hover:bg-gray-100 transition-all"
                >
                  <ChevronRight size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Current Tip */}
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-xl border border-emerald-100 mb-4">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getDifficultyColor(currentTip.difficulty)}`}>
                    {currentTip.difficulty.charAt(0).toUpperCase() + currentTip.difficulty.slice(1)}
                  </span>
                  <button 
                    onClick={() => toggleSaveTip(currentTip)}
                    className="text-gray-400 hover:text-yellow-500 transition-colors"
                  >
                    <Star 
                      size={20} 
                      fill={savedTips.some(tip => tip.id === currentTip.id) ? "currentColor" : "none"} 
                      className={savedTips.some(tip => tip.id === currentTip.id) ? "text-yellow-500" : ""} 
                    />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">{currentTip.title}</h2>
                <p className="text-gray-700 mb-4">{currentTip.content}</p>
                <div className="flex justify-between items-end">
                  <span className="text-sm font-medium text-emerald-700">{currentTip.impact}</span>
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">{currentTip.category}</span>
                </div>
              </div>

              {/* Take Action Button */}
              <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center">
                Apply This Tip <ArrowRight size={16} className="ml-2" />
              </button>
            </>
          ) : (
            <>
              {/* Saved Tips List */}
              <h2 className="text-xl font-bold text-gray-800 mb-4">Your Saved Tips</h2>
              
              {savedTips.length === 0 ? (
                <div className="text-center py-8">
                  <div className="bg-gray-100 inline-flex rounded-full p-3 mb-4">
                    <Star size={24} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500">You haven't saved any tips yet.</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Star tips you find useful to save them for later reference.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedTips.map(tip => (
                    <div key={tip.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getDifficultyColor(tip.difficulty)}`}>
                          {tip.difficulty.charAt(0).toUpperCase() + tip.difficulty.slice(1)}
                        </span>
                        <button 
                          onClick={() => toggleSaveTip(tip)}
                          className="text-yellow-500 hover:text-gray-400 transition-colors"
                        >
                          <Star size={18} fill="currentColor" />
                        </button>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">{tip.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 mb-2">{tip.content}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-emerald-700">{tip.impact}</span>
                        <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">{tip.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Energy Saving Stats */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-5">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Your Impact</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-emerald-50 rounded-lg p-3 text-center">
              <p className="text-emerald-700 font-bold text-xl">₹635</p>
              <p className="text-xs text-gray-600">Monthly Savings</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-blue-700 font-bold text-xl">78 kWh</p>
              <p className="text-xs text-gray-600">Energy Saved</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <p className="text-purple-700 font-bold text-xl">15%</p>
              <p className="text-xs text-gray-600">Reduction</p>
            </div>
          </div>
        </div>
        
        {/* Bottom navigation - Back to leaderboard */}
        <div className="mt-6 text-center">
          <button 
            onClick={() => navigateTo("/leaderboard")}
            className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
          >
            <Award size={18} className="mr-2" />
            <span>Return to Leaderboard</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tips;