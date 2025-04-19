import React, { useState } from "react";
import { Trophy, Zap, Award, Medal, Users, ChevronUp, Calendar, Sparkles, Home, User, LogOut } from "lucide-react";

function Leaderboard() {
  const [timeFilter, setTimeFilter] = useState("week");
  const [expanded, setExpanded] = useState(false);

  // Function to handle navigation
  const navigateTo = (path) => {
    window.location.href = path;
  };

  const handleLogout = () => {
    // You could add any logout logic here (clear tokens, etc.)
    navigateTo('/');
  };

  // Mock leaderboard data
  const leaderboardData = [
    {
      id: 1,
      name: "Sarah Johnson",
      points: 1580,
      energySaved: "42.3 kWh",
      streak: 14,
      badges: 8,
      rank: 1,
      trend: "up",
      avatar: "SJ"
    },
    {
      id: 2,
      name: "Amir Patel",
      points: 1450,
      energySaved: "38.9 kWh",
      streak: 9,
      badges: 7,
      rank: 2,
      trend: "same",
      avatar: "AP"
    },
    {
      id: 3,
      name: "Olivia Chen",
      points: 1320,
      energySaved: "35.6 kWh",
      streak: 12,
      badges: 6,
      rank: 3,
      trend: "up",
      avatar: "OC"
    },
    {
      id: 4,
      name: "Marcus Rodriguez",
      points: 1190,
      energySaved: "31.2 kWh",
      streak: 7,
      badges: 5,
      rank: 4,
      trend: "down",
      avatar: "MR"
    },
    {
      id: 5,
      name: "Priya Sharma",
      points: 1080,
      energySaved: "28.7 kWh",
      streak: 5,
      badges: 4,
      rank: 5,
      trend: "up",
      avatar: "PS"
    },
    {
      id: 6,
      name: "David Wilson",
      points: 980,
      energySaved: "25.8 kWh",
      streak: 4,
      badges: 5,
      rank: 6,
      trend: "same",
      avatar: "DW"
    },
    {
      id: 7,
      name: "Mei Lin",
      points: 910,
      energySaved: "23.4 kWh",
      streak: 8,
      badges: 3,
      rank: 7,
      trend: "up",
      avatar: "ML"
    },
    {
      id: 8,
      name: "Thomas Brown",
      points: 870,
      energySaved: "21.9 kWh",
      streak: 3,
      badges: 2,
      rank: 8,
      trend: "down",
      avatar: "TB"
    },
    {
      id: 9,
      name: "Sophia Garcia",
      points: 830,
      energySaved: "20.5 kWh",
      streak: 6,
      badges: 4,
      rank: 9,
      trend: "same",
      avatar: "SG"
    },
    {
      id: 10,
      name: "Noah Kim",
      points: 790,
      energySaved: "19.8 kWh",
      streak: 2,
      badges: 3,
      rank: 10,
      trend: "up",
      avatar: "NK"
    }
  ];

  // Current user data (mock)
  const currentUser = {
    name: "You",
    points: 980,
    energySaved: "25.8 kWh",
    streak: 4,
    badges: 5,
    rank: 6,
    trend: "up",
    avatar: "YO"
  };

  // Top achievements
  const topAchievements = [
    { title: "Super Saver", holder: "Sarah Johnson", value: "42.3 kWh" },
    { title: "Streak Master", holder: "Sarah Johnson", value: "14 days" },
    { title: "Most Improved", holder: "Priya Sharma", value: "+18%" }
  ];

  // Display limited or full leaderboard based on expanded state
  const displayUsers = expanded ? leaderboardData : leaderboardData.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Bar - Added from Profile component */}
        <div className="bg-white shadow rounded-xl p-3 mb-6 flex justify-between items-center">
          <div className="flex items-center">
            <Zap size={24} className="text-emerald-500 mr-2" />
            <span className="font-bold text-gray-800">EnergySmartHome</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => navigateTo("/dashboard")}
              className="flex items-center px-3 py-2 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
            >
              <Home size={18} className="mr-1" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => navigateTo("/leaderboard")}
              className="flex items-center px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              <Award size={18} className="mr-1" />
              <span>Leaderboard</span>
            </button>
            <button
              onClick={() => navigateTo("/profile")}
              className="flex items-center px-3 py-2 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
            >
              <User size={18} className="mr-1" />
              <span>Profile</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
            >
              <LogOut size={18} className="mr-1" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <Trophy size={28} className="text-yellow-500 mr-3" />
              Energy Savings Leaderboard
            </h1>
            <p className="text-gray-600 mt-1">
              See who's making the biggest impact on energy conservation
            </p>
          </div>

          {/* Time filters */}
          <div className="flex space-x-2 mt-4 md:mt-0 bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setTimeFilter("week")}
              className={`px-4 py-2 rounded-md transition-colors ${timeFilter === "week"
                  ? "bg-emerald-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeFilter("month")}
              className={`px-4 py-2 rounded-md transition-colors ${timeFilter === "month"
                  ? "bg-emerald-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setTimeFilter("all")}
              className={`px-4 py-2 rounded-md transition-colors ${timeFilter === "all"
                  ? "bg-emerald-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              All Time
            </button>
          </div>
        </div>

        {/* Top achievements cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {topAchievements.map((achievement, index) => (
            <div key={index} className="bg-white rounded-xl p-4 flex items-center shadow-sm">
              <div className="p-3 rounded-full mr-3">
                {index === 0 && <Zap size={24} className="text-yellow-500" />}
                {index === 1 && <Calendar size={24} className="text-blue-500" />}
                {index === 2 && <ChevronUp size={24} className="text-emerald-500" />}
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{achievement.title}</h3>
                <p className="text-sm text-gray-500">{achievement.holder}</p>
                <p className="text-sm font-bold text-emerald-600">{achievement.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Leaderboard header */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 text-white">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center">
                <Trophy size={20} className="mr-2" />
                Top Energy Savers
              </h2>
              <div className="text-sm">
                {timeFilter === "week" && "April 11-18, 2025"}
                {timeFilter === "month" && "April 2025"}
                {timeFilter === "all" && "All Time Leaders"}
              </div>
            </div>
          </div>

          {/* Column headers */}
          <div className="hidden md:flex text-sm text-gray-500 bg-gray-50 px-6 py-3">
            <div className="w-12 text-center">#</div>
            <div className="flex-1">User</div>
            <div className="w-28 text-center">Energy Saved</div>
            <div className="w-28 text-center">Points</div>
            <div className="w-20 text-center">Streak</div>
          </div>

          {/* Leaderboard entries */}
          <div className="divide-y divide-gray-100">
            {displayUsers.map((user, index) => (
              <div key={user.id} className={`px-4 md:px-6 py-4 flex items-center ${user.rank <= 3 ? 'bg-yellow-50' : ''}`}>
                {/* Rank */}
                <div className="w-12 flex justify-center">
                  {user.rank === 1 && (
                    <div className="w-8 h-8 flex items-center justify-center bg-yellow-100 text-yellow-800 rounded-full">
                      <Trophy size={16} />
                    </div>
                  )}
                  {user.rank === 2 && (
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 rounded-full">
                      <Medal size={16} />
                    </div>
                  )}
                  {user.rank === 3 && (
                    <div className="w-8 h-8 flex items-center justify-center bg-amber-100 text-amber-800 rounded-full">
                      <Award size={16} />
                    </div>
                  )}
                  {user.rank > 3 && (
                    <div className="w-8 h-8 flex items-center justify-center text-gray-500 font-medium">
                      {user.rank}
                    </div>
                  )}
                </div>

                {/* User info */}
                <div className="flex-1 flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium mr-3 ${user.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                      user.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                        user.rank === 3 ? 'bg-gradient-to-br from-amber-400 to-amber-600' :
                          'bg-gradient-to-br from-blue-400 to-emerald-500'
                    }`}>
                    {user.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{user.name}</div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Sparkles size={12} className="mr-1 text-emerald-500" />
                      <span>{user.badges} badges</span>
                    </div>
                  </div>
                </div>

                {/* Energy saved */}
                <div className="w-28 text-center">
                  <div className="text-emerald-600 font-medium">{user.energySaved}</div>
                  <div className="text-xs text-gray-500">saved</div>
                </div>

                {/* Points */}
                <div className="w-28 text-center font-bold text-lg">
                  {user.points}
                  <div className="text-xs font-normal text-gray-500">points</div>
                </div>

                {/* Streak */}
                <div className="w-20 text-center">
                  <div className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                    <Calendar size={12} className="mr-1" />
                    {user.streak} days
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* See more button */}
          <div className="p-4 bg-gray-50 text-center">
            <button
              onClick={() => setExpanded(!expanded)}
              className="px-4 py-2 text-sm text-emerald-600 hover:text-emerald-700 focus:outline-none"
            >
              {expanded ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>

        {/* Your position */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
            <Users size={20} className="text-blue-500 mr-2" />
            Your Position
          </h3>
          <div className="bg-white rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-emerald-500 flex items-center justify-center text-white font-medium mr-3">
                {currentUser.avatar}
              </div>
              <div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-800">{currentUser.name}</span>
                  <span className="text-emerald-600 flex items-center ml-2 text-sm">
                    <ChevronUp size={16} />
                    2 positions
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Rank #{currentUser.rank} • {currentUser.energySaved} saved
                </div>
              </div>
            </div>
            <div className="text-2xl font-bold text-emerald-600">
              {currentUser.points}
              <span className="text-xs font-normal text-gray-500 block text-center">points</span>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-600 flex justify-between items-center">
            <div>
              You need 470 more points to reach top 3!
            </div>
            <a href="/tips" className="text-emerald-600 hover:underline">View energy saving tips</a>
          </div>
        </div>

        {/* Info footer */}
        <div className="mt-6 text-sm text-gray-500 text-center">
          <p>Leaderboard updates daily based on real-time energy savings</p>
          <p className="mt-1">
            {/* <a href="#" className="text-emerald-600 hover:underline">How points are calculated</a> */}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;