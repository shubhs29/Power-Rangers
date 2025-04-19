import React, { useState } from "react";
import {
  Zap,
  AlertTriangle,
  Home,
  BarChart3,
  Calendar,
  Info,
  Lightbulb,
  Trophy,
  ArrowUp,
  ArrowDown,
  Droplet,
  Thermometer,
  Clock,
  User,
  Award,
  LogOut,
} from "lucide-react";

// Mock data for charts
const mockEnergyData = {
  daily: [
    { time: "6AM", usage: 2.1 },
    { time: "9AM", usage: 3.5 },
    { time: "12PM", usage: 4.2 },
    { time: "3PM", usage: 3.8 },
    { time: "6PM", usage: 5.6 },
    { time: "9PM", usage: 4.9 },
    { time: "12AM", usage: 2.3 },
  ],
  roomData: [
    { name: "Living Room", usage: 35 },
    { name: "Kitchen", usage: 25 },
    { name: "Bedroom", usage: 20 },
    { name: "Bathroom", usage: 15 },
    { name: "Others", usage: 5 },
  ],
  deviceData: [
    { name: "AC", usage: 45, status: "high" },
    { name: "Geyser", usage: 20, status: "normal" },
    { name: "Fridge", usage: 15, status: "normal" },
    { name: "Lights", usage: 10, status: "low" },
    { name: "TV", usage: 7, status: "low" },
    { name: "Others", usage: 3, status: "low" },
  ],
  weekly: [
    { day: "Mon", usage: 15.2 },
    { day: "Tue", usage: 16.8 },
    { day: "Wed", usage: 14.5 },
    { day: "Thu", usage: 13.9 },
    { day: "Fri", usage: 17.2 },
    { day: "Sat", usage: 19.8 },
    { day: "Sun", usage: 18.3 },
  ],
  wastageAlerts: [
    {
      device: "AC",
      issue: "Running for extended periods",
      wastage: "2.4 kWh",
      recommendation: "Try setting a timer to turn off after 3 hours",
      time: "3:30 PM",
    },
    {
      device: "Geyser",
      issue: "High temperature setting",
      wastage: "1.2 kWh",
      recommendation: "Reduce temperature by 5°C to save energy",
      time: "7:15 AM",
    },
    {
      device: "Living Room Lights",
      issue: "Left on when room is empty",
      wastage: "0.5 kWh",
      recommendation: "Consider motion sensors for automatic control",
      time: "9:45 PM",
    },
  ],
  gamification: {
    points: 324,
    level: "Energy Saver",
    nextLevel: "Power Guardian",
    pointsToNextLevel: 76,
    dailyChallenge:
      "Use natural light for 2 hours instead of artificial lighting",
    streakDays: 5,
    badges: ["Early Adopter", "Weekly Goal Crusher", "Energy Detective"],
  },
};

function Dashboard({ chartData = {} }) {
  const [timeRange, setTimeRange] = useState("daily");
  const [tipIndex, setTipIndex] = useState(0);

  const energyTips = [
    "Your AC is running at peak efficiency when set to 24°C instead of 18°C. This small change can save up to 15% on cooling costs.",
    "The geyser used 20% more energy this week. Try reducing bath time by 2 minutes to save water and electricity.",
    "We noticed your fridge consumes more at night. Avoid frequent opening during peak hours (6-10 PM) to optimize energy use.",
  ];

  // Function to handle navigation
  const navigateTo = (path) => {
    window.location.href = path;
  };

  const handleLogout = () => {
    // You could add any logout logic here (clear tokens, etc.)
    navigateTo("/");
  };

  // Cycle through tips automatically
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prevIndex) => (prevIndex + 1) % energyTips.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Calculate comparison with previous week
  const currentUsage = mockEnergyData.weekly.reduce(
    (sum, day) => sum + day.usage,
    0
  );
  const previousUsage = currentUsage * 1.15; // 15% higher last week
  const savingPercentage = (
    ((previousUsage - currentUsage) / previousUsage) *
    100
  ).toFixed(1);

  const totalRoomCosumption = chartData?.room_consumption?.usage.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const totalDeviceConsumption =
    chartData?.appliance_power_cost?.power_usage.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Bar */}
        <div className="bg-white shadow rounded-xl p-3 mb-6 flex justify-between items-center">
          <div className="flex items-center">
            <Zap size={24} className="text-emerald-500 mr-2" />
            <span className="font-bold text-gray-800">EnergySmartHome</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => navigateTo("/dashboard")}
              className="flex items-center px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              <Home size={18} className="mr-1" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => navigateTo("/leaderboard")}
              className="flex items-center px-3 py-2 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
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
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Smart Energy Dashboard
            </h1>
            <p className="text-gray-600">
              Monitor, analyze, and optimize your home energy usage
            </p>
          </div>

          <div className="flex items-center mt-4 md:mt-0 space-x-2">
            <button
              onClick={() => setTimeRange("daily")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeRange === "daily"
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setTimeRange("weekly")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeRange === "weekly"
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              This Week
            </button>
          </div>
        </div>

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Energy Used</p>
              <h3 className="text-2xl font-bold text-gray-800">116.2 kWh</h3>
              <div className="flex items-center text-emerald-600 mt-1">
                <ArrowDown size={16} className="mr-1" />
                <span>{savingPercentage}% vs last week</span>
              </div>
            </div>
            <div className="bg-emerald-100 p-3 rounded-xl">
              <Zap size={28} className="text-emerald-600" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Estimated Bill</p>
              <h3 className="text-2xl font-bold text-gray-800">₹1,845</h3>
              <div className="flex items-center text-emerald-600 mt-1">
                <ArrowDown size={16} className="mr-1" />
                <span>₹230 saved so far</span>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <BarChart3 size={28} className="text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Energy Efficiency Score</p>
              <h3 className="text-2xl font-bold text-gray-800">82/100</h3>
              <div className="flex items-center text-emerald-600 mt-1">
                <ArrowUp size={16} className="mr-1" />
                <span>+5 points this month</span>
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl">
              <Trophy size={28} className="text-purple-600" />
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Energy Consumption Chart */}
            <div className="bg-white p-5 rounded-2xl shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <BarChart3 size={20} className="text-emerald-500 mr-2" />
                  Energy Consumption
                </h2>
                <div className="text-sm text-gray-500">
                  {timeRange === "daily" ? "Today, April 18" : "April 12-18"}
                </div>
              </div>
              <div className="h-72 w-full">
                {/* Energy consumption chart visualization */}
                <div className="bg-gray-50 h-full rounded-lg flex items-end px-4 py-2 space-x-4">
                  {timeRange === "daily"
                    ? mockEnergyData.daily.map((hour, i) => (
                        <div
                          key={i}
                          className="flex flex-col items-center flex-1"
                        >
                          <div
                            className="w-full bg-emerald-500 rounded-t-lg transition-all duration-500"
                            style={{ height: `${hour.usage * 10}%` }}
                          ></div>
                          <span className="text-xs mt-2 text-gray-600">
                            {hour.time}
                          </span>
                        </div>
                      ))
                    : mockEnergyData.weekly.map((day, i) => (
                        <div
                          key={i}
                          className="flex flex-col items-center flex-1"
                        >
                          <div
                            className="w-full bg-blue-500 rounded-t-lg transition-all duration-500"
                            style={{ height: `${day.usage * 3}%` }}
                          ></div>
                          <span className="text-xs mt-2 text-gray-600">
                            {day.day}
                          </span>
                        </div>
                      ))}
                </div>
              </div>
            </div>

            {/* Room-wise & Device Usage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Room-wise Usage */}
              <div className="bg-white p-5 rounded-2xl shadow">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                  <Home size={20} className="text-emerald-500 mr-2" />
                  Room-wise Usage
                </h2>
                <div className="space-y-3">
                  {chartData &&
                    chartData?.room_consumption?.rooms.map((room, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">{room}</span>
                          <span className="font-medium">
                            {parseFloat(
                              (chartData &&
                                chartData?.room_consumption?.usage[i] /
                                  totalRoomCosumption) * 100
                            ).toFixed(2)}
                            %
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-teal-500"
                            style={{
                              width: `${parseFloat(
                                (chartData &&
                                  chartData?.room_consumption?.usage[i] /
                                    totalRoomCosumption) * 100
                              ).toFixed(2)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Device Usage */}
              <div className="bg-white p-5 rounded-2xl shadow">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                  <Zap size={20} className="text-emerald-500 mr-2" />
                  Device Consumption
                </h2>
                <div className="space-y-3">
                  {chartData?.appliance_power_cost?.appliances.map(
                    (device, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${
                              device.status === "high"
                                ? "bg-red-500"
                                : device.status === "normal"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                          ></div>
                          <span className="text-gray-700">{device}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-2">
                            {parseFloat(
                              (chartData?.appliance_power_cost?.power_usage[i] /
                                totalDeviceConsumption) *
                                100
                            ).toFixed(2)}
                            %
                          </span>
                          <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                device.status === "high"
                                  ? "bg-red-500"
                                  : device.status === "normal"
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }`}
                              style={{
                                width: `${parseFloat(
                                  (chartData?.appliance_power_cost?.power_usage[
                                    i
                                  ] /
                                    totalDeviceConsumption) *
                                    100
                                ).toFixed(2)}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Insights and Actions */}
          <div className="space-y-6">
            {/* AI Energy Tips */}
            <div className="bg-white p-5 rounded-2xl shadow">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                <Lightbulb size={20} className="text-emerald-500 mr-2" />
                AI-Generated Tips
              </h2>
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-4 rounded-xl">
                <div className="font-medium text-emerald-700 mb-2 flex items-center">
                  <Zap size={16} className="mr-1" />
                  Personalized Energy Insight
                </div>
                <p className="text-gray-700">{energyTips[tipIndex]}</p>
              </div>
              <div className="flex justify-center mt-3">
                <div className="flex space-x-1">
                  {energyTips.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === tipIndex ? "bg-emerald-500" : "bg-gray-300"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Wastage Alerts */}
            <div className="bg-white p-5 rounded-2xl shadow">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                <AlertTriangle size={20} className="text-emerald-500 mr-2" />
                Wastage Alerts
              </h2>
              <div className="space-y-3">
                {mockEnergyData.wastageAlerts.map((alert, i) => (
                  <div
                    key={i}
                    className="border-l-4 border-yellow-500 bg-yellow-50 p-3 rounded-r-lg"
                  >
                    <div className="flex justify-between">
                      <div className="font-medium text-gray-800">
                        {alert.device}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Clock size={12} className="mr-1" />
                        {alert.time}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">{alert.issue}</div>
                    <div className="mt-1 flex justify-between items-center">
                      <div className="text-xs text-red-600 flex items-center">
                        <Zap size={12} className="mr-1" />
                        Wastage: {alert.wastage}
                      </div>
                      <button className="text-xs text-blue-600 hover:underline">
                        Fix Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gamification */}
            <div className="bg-white p-5 rounded-2xl shadow">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                <Trophy size={20} className="text-emerald-500 mr-2" />
                Energy Rewards
              </h2>
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{mockEnergyData.gamification.level}</span>
                  <span>{mockEnergyData.gamification.nextLevel}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500"
                    style={{
                      width: `${
                        (mockEnergyData.gamification.points / 400) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {mockEnergyData.gamification.pointsToNextLevel} points to next
                  level
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg mb-3">
                <div className="font-medium text-blue-700 flex items-center mb-1">
                  <Calendar size={14} className="mr-1" />
                  Daily Challenge
                </div>
                <p className="text-sm text-gray-700">
                  {mockEnergyData.gamification.dailyChallenge}
                </p>
                <div className="mt-2 flex justify-between items-center">
                  <div className="text-xs text-gray-600">Earn: 15 points</div>
                  <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">
                    Complete
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  <div className="bg-green-100 p-1 rounded-full mr-1">
                    <Droplet size={14} className="text-green-600" />
                  </div>
                  <div className="text-sm text-gray-700">
                    <span className="font-medium">
                      {mockEnergyData.gamification.streakDays}-day
                    </span>{" "}
                    streak
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-purple-100 p-1 rounded-full mr-1">
                    <Thermometer size={14} className="text-purple-600" />
                  </div>
                  <div className="text-sm text-gray-700">
                    <span className="font-medium">
                      {mockEnergyData.gamification.badges.length}
                    </span>{" "}
                    badges
                  </div>
                </div>
              </div>

              {/* View Leaderboard Button */}
              <div className="mt-4">
                <button
                  onClick={() => navigateTo("/leaderboard")}
                  className="w-full bg-purple-100 text-purple-700 py-2 rounded-lg flex items-center justify-center hover:bg-purple-200 transition-colors"
                >
                  <Award size={16} className="mr-2" />
                  View Community Leaderboard
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center">
            <Info size={14} className="mr-1" />
            <span>Data refreshed: Today, 2:45 PM</span>
          </div>
          <div>
            <a
              href="/detailed-report"
              className="text-emerald-600 hover:underline"
            >
              View detailed reports
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
