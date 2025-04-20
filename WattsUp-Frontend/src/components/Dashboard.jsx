import React, { useState, useEffect } from "react";
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
  CloudRain,
  TrendingUp,
  AlertCircle,
  PieChart,
  Clock4,
  DollarSign
} from "lucide-react";
import ElectricityBarChart from "./BarChart";
import HourlyUsageLineChart from "./LineChart";
import AreaChartComponent from "./AreaChart";
import { LineChart, Line, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
  // New data for enhanced features
  weatherForecast: {
    currentTemp: 38,
    nextWeek: [
      { day: "Mon", temp: 39, humidity: 65 },
      { day: "Tue", temp: 40, humidity: 70 },
      { day: "Wed", temp: 38, humidity: 60 },
      { day: "Thu", temp: 37, humidity: 55 },
      { day: "Fri", temp: 39, humidity: 65 },
    ],
    impact: {
      cost: 600,
      recommendation: "Pre-cool home before 2 PM",
    }
  },
  billForecast: {
    nextMonth: 2850,
    currentMonth: 2650,
    averageMonth: 2300,
    percentageChange: 7,
    reason: "high AC use"
  },
  wastagePredictor: {
    total: 320,
    breakdown: [
      { device: "AC", amount: 180, reason: "idle operation" },
      { device: "Lights", amount: 90, reason: "left on in empty rooms" },
      { device: "TV", amount: 50, reason: "standby power" },
    ],
    potentialSavings: 280
  },
  historicalComparison: {
    data: [
      { month: "Jan", thisYear: 2400, lastYear: 2100 },
      { month: "Feb", thisYear: 2200, lastYear: 1900 },
      { month: "Mar", thisYear: 2500, lastYear: 2300 },
      { month: "Apr", thisYear: 2650, lastYear: 2240 },
    ],
    percentageChange: 18
  },
  peakHourUsage: {
    percentage: 45,
    potentialSavings: 150,
    recommendation: "Run your washing machine post-10 PM"
  },
  savingsFromTips: {
    total: 670,
    tips: [
      { tip: "Adjusted AC temperature", saved: 320 },
      { tip: "Shifted laundry to off-peak", saved: 180 },
      { tip: "Replaced LED bulbs", saved: 170 }
    ]
  },
  applianceVsOptimal: [
    { name: "AC", actual: 8, optimal: 5.5, percentAbove: 45 },
    { name: "Fridge", actual: 3.2, optimal: 3.8, percentAbove: -16 },
    { name: "Geyser", actual: 4.5, optimal: 3.2, percentAbove: 41 },
    { name: "TV", actual: 1.2, optimal: 1.1, percentAbove: 9 },
    { name: "Lights", actual: 0.9, optimal: 1.2, percentAbove: -25 },
  ],
  topConsumingAppliances: [
    { name: "AC", percentage: 42, consumption: 350 },
    { name: "Geyser", percentage: 22, consumption: 180 },
    { name: "Fridge", percentage: 15, consumption: 125 },
    { name: "Washing Machine", percentage: 10, consumption: 85 },
    { name: "Lights", percentage: 8, consumption: 65 },
    { name: "Others", percentage: 3, consumption: 25 },
  ],
  roomsAndAppliances: {
    livingRoom: [
      { name: "AC", wattage: 1500 },
      { name: "TV", wattage: 120 },
      { name: "Lights", wattage: 60 },
    ],
    kitchen: [
      { name: "Fridge", wattage: 150 },
      { name: "Microwave", wattage: 1000 },
      { name: "Mixer", wattage: 500 },
    ],
    bedroom: [
      { name: "AC", wattage: 1200 },
      { name: "Lights", wattage: 40 },
      { name: "Chargers", wattage: 15 },
    ],
    bathroom: [
      { name: "Geyser", wattage: 2000 },
      { name: "Lights", wattage: 25 },
    ],
  }
};

const gradientClasses = [
  "bg-gradient-to-r from-green-100 to-green-200 text-green-800",
  "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800",
  "bg-gradient-to-r from-pink-100 to-pink-200 text-pink-800",
  "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800",
  "bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800",
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// New components for enhanced features
const ApplianceOptimalChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          formatter={(value, name, props) => {
            if (name === 'actual') return [`${value} kWh (Actual)`, name];
            return [`${value} kWh (Optimal)`, name];
          }}
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const actual = payload[0].value;
              const optimal = payload[1].value;
              const percentDiff = ((actual - optimal) / optimal * 100).toFixed(0);
              const status = percentDiff > 0 ? 'above' : 'below';

              return (
                <div className="bg-white p-2 border rounded shadow-sm">
                  <p className="font-medium">{label}</p>
                  <p className="text-sm">Actual: {actual} kWh</p>
                  <p className="text-sm">Optimal: {optimal} kWh</p>
                  <p className={`text-sm font-medium ${percentDiff > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {Math.abs(percentDiff)}% {status} optimal
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
        <Bar dataKey="actual" fill="#FF8042" name="Actual Usage" />
        <Bar dataKey="optimal" fill="#00C49F" name="Optimal Threshold" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const TopConsumingAppliancesPieChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="percentage"
          nameKey="name"
          label={({ name, percentage }) => `${name}: ${percentage}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

const HistoricalComparisonChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip
          formatter={(value) => `₹${value}`}
        />
        <Legend />
        <Line type="monotone" dataKey="thisYear" stroke="#8884d8" name="This Year" />
        <Line type="monotone" dataKey="lastYear" stroke="#82ca9d" name="Last Year" />
      </LineChart>
    </ResponsiveContainer>
  );
};

function Dashboard({ chartData = {} }) {
  const [timeRange, setTimeRange] = useState("daily");
  const [tipIndex, setTipIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  const energyTips = [
    "AC at 18°C? Bro, it's not Antarctica. Try 24°C and save some 💸 (and your hoodie).",
    "Your geyser's been doing overtime. Shorter showers = more power to your power bill. 🚿⚡",
    "Your fridge called. It said 'stop opening me every 5 mins at night!' – Try chilling, not chilling your snacks. 😅",
    "Using the microwave to reheat tea 3 times a day? Might be time for a thermal flask, chef. ☕️💡",
    "Your lights are on more than your phone screen. Mood lighting ≠ all lighting. Try switching off when not needed! 🔦😎",
    "Laundry party every day? Let's go for a full load next time and give the machine a break. 🧺🎉",
    "Fan on full speed, but you're not even in the room? That fan's not your fan anymore. 🪭👻",
  ];

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

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

  const totalEnergyUsed = chartData?.room_consumption?.usage?.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  ) || 0;

  const estimatedBillUsageAverageOverHundredDays =
    chartData?.daily_summary?.daily_cost?.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    ) || 0;

  const totalRoomCosumption = chartData?.room_consumption?.usage?.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  ) || 0;

  const totalDeviceConsumption =
    chartData?.appliance_power_cost?.power_usage?.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    ) || 0;

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
              className={`px-4 py-2 rounded-lg transition-colors ${timeRange === "daily"
                ? "bg-emerald-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
              Today
            </button>
            <button
              onClick={() => setTimeRange("weekly")}
              className={`px-4 py-2 rounded-lg transition-colors ${timeRange === "weekly"
                ? "bg-emerald-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
              This Week
            </button>
          </div>
        </div>

        {/* Enhanced Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* 1. Total Energy Used - keep from original */}
          <div className="bg-white p-5 rounded-2xl shadow flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Energy Impact Summary</p>
              <h3 className="text-2xl font-bold text-gray-800">
                This Week's Balance
              </h3>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center text-emerald-600">
                  <ArrowUp size={20} className="mr-1" />
                  <div>
                    <span className="font-medium">₹{320} saved</span>
                    <p className="text-xs text-emerald-700">by following tips</p>
                  </div>
                </div>
                <div className="h-10 border-r border-gray-200 mx-2"></div>
                <div className="flex items-center text-red-600">
                  <ArrowDown size={20} className="mr-1" />
                  <div>
                    <span className="font-medium">₹{150} wasted</span>
                    <p className="text-xs text-red-700">from missed opportunities</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-emerald-100 p-3 rounded-xl">
              <Zap size={28} className="text-emerald-600" />
            </div>
          </div>

          {/* 2. Estimated Real-Time Energy Bill - enhanced */}
          <div className="bg-white p-5 rounded-2xl shadow flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Running Bill Estimate</p>
              <h3 className="text-2xl font-bold text-gray-800">
                ₹{mockEnergyData.billForecast.currentMonth}
              </h3>
              <div className="flex items-center text-red-600 mt-1">
                <ArrowUp size={16} className="mr-1" />
                <span>₹{mockEnergyData.billForecast.currentMonth - mockEnergyData.billForecast.averageMonth} above average</span>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <BarChart3 size={28} className="text-blue-600" />
            </div>
          </div>

          {/* 3. Next Month Bill Forecast - NEW */}
          <div className="bg-white p-5 rounded-2xl shadow flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Next Month Forecast</p>
              <h3 className="text-2xl font-bold text-gray-800">₹{mockEnergyData.billForecast.nextMonth}</h3>
              <div className="flex items-center text-red-600 mt-1">
                <TrendingUp size={16} className="mr-1" />
                <span>{mockEnergyData.billForecast.percentageChange}% higher due to {mockEnergyData.billForecast.reason}</span>
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl">
              <Calendar size={28} className="text-purple-600" />
            </div>
          </div>
        </div>

        {/* Second Stats Row - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* 4. Weather Impact Alert - NEW */}
          <div className="bg-white p-5 rounded-2xl shadow flex flex-col justify-between">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-gray-500 text-sm flex items-center">
                  <CloudRain size={16} className="mr-1" />
                  Weather Impact Alert
                </p>
                <h3 className="text-xl font-bold text-gray-800">
                  {mockEnergyData.weatherForecast.currentTemp}°C Today
                </h3>
              </div>
              <div className="bg-yellow-100 p-2 rounded-lg">
                <AlertCircle size={20} className="text-yellow-600" />
              </div>
            </div>
            <p className="text-sm text-gray-700">
              Upcoming {mockEnergyData.weatherForecast.nextWeek[1].temp}°C weather may increase cooling costs by ₹{mockEnergyData.weatherForecast.impact.cost}.
            </p>
            <div className="bg-blue-50 p-2 rounded-lg mt-2 text-sm text-blue-800">
              <span className="font-medium">Tip:</span> {mockEnergyData.weatherForecast.impact.recommendation}
            </div>
          </div>

          {/* 5. Wastage Prediction - NEW */}
          <div className="bg-white p-5 rounded-2xl shadow flex flex-col justify-between">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-gray-500 text-sm flex items-center">
                  <AlertTriangle size={16} className="mr-1" />
                  Wastage Prediction
                </p>
                <h3 className="text-xl font-bold text-gray-800">
                  ₹{mockEnergyData.wastagePredictor.total} this week
                </h3>
              </div>
              <div className="bg-red-100 p-2 rounded-lg">
                <Zap size={20} className="text-red-600" />
              </div>
            </div>
            <div className="space-y-2">
              {mockEnergyData.wastagePredictor.breakdown.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>{item.device} ({item.reason})</span>
                  <span className="font-medium">₹{item.amount}</span>
                </div>
              ))}
            </div>
            <div className="bg-green-50 p-2 rounded-lg mt-2 text-sm text-green-800">
              <span className="font-medium">Potential Savings:</span> ₹{mockEnergyData.wastagePredictor.potentialSavings}
            </div>
          </div>

          {/* 6. Savings from Tips - NEW */}
          <div className="bg-white p-5 rounded-2xl shadow flex flex-col justify-between">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-gray-500 text-sm flex items-center">
                  <DollarSign size={16} className="mr-1" />
                  Savings from Tips
                </p>
                <h3 className="text-xl font-bold text-green-600">
                  ₹{mockEnergyData.savingsFromTips.total} Saved
                </h3>
              </div>
              <div className="bg-green-100 p-2 rounded-lg">
                <Trophy size={20} className="text-green-600" />
              </div>
            </div>
            <div className="space-y-2">
              {mockEnergyData.savingsFromTips.tips.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>{item.tip}</span>
                  <span className="font-medium text-green-600">₹{item.saved}</span>
                </div>
              ))}
            </div>
            <div className="bg-purple-50 p-2 rounded-lg mt-2 text-sm text-purple-800">
              <span className="font-medium">Last 2 months</span> - Keep it up!
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">

            {/* Peak Hours Usage - NEW */}
            <div className="bg-white p-5 rounded-2xl shadow">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                <Clock4 size={20} className="text-emerald-500 mr-2" />
                Peak Hours Usage
              </h2>
              <div className="flex items-center mb-2">
                <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden mr-4">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${mockEnergyData.peakHourUsage.percentage}%` }}
                  ></div>
                </div>
                <span className="font-medium">{mockEnergyData.peakHourUsage.percentage}%</span>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                {mockEnergyData.peakHourUsage.percentage}% of your electricity usage happens during peak hours (6 PM - 10 PM) when rates are higher.
              </p>
              <div className="bg-emerald-50 p-3 rounded-lg">
                <div className="font-medium text-emerald-700 flex items-center mb-1">
                  <Lightbulb size={14} className="mr-1" />
                  Savings Opportunity
                </div>
                <p className="text-sm text-gray-700">
                  {mockEnergyData.peakHourUsage.recommendation} can save ₹{mockEnergyData.peakHourUsage.potentialSavings}/month.
                </p>
              </div>
            </div>

            {/* Top Consuming Appliances - NEW */}
            <div className="bg-white p-5 rounded-2xl shadow">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                <PieChart size={20} className="text-emerald-500 mr-2" />
                Top Consuming Appliances
              </h2>
              <p className="text-sm text-gray-700 mb-3">
                See which appliances are using the most energy in your home.
              </p>
              <TopConsumingAppliancesPieChart data={mockEnergyData.topConsumingAppliances} />
            </div>

            {/* Appliance vs Optimal Threshold - NEW */}
            <div className="bg-white p-5 rounded-2xl shadow">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                <BarChart3 size={20} className="text-emerald-500 mr-2" />
                Appliance Usage vs Optimal Threshold
              </h2>
              <p className="text-sm text-gray-700 mb-3">
                Compare your appliance energy usage against optimal thresholds for similar homes in your region.
              </p>
              <ApplianceOptimalChart data={mockEnergyData.applianceVsOptimal} />
            </div>

            {/* Historical Comparison - NEW */}
            <div className="bg-white p-5 rounded-2xl shadow">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                <TrendingUp size={20} className="text-emerald-500 mr-2" />
                Historical Comparison
              </h2>
              <div className="mb-3 text-sm text-gray-700">
                Your energy use is <span className="font-medium text-red-600">{mockEnergyData.historicalComparison.percentageChange}% higher</span> than last April.
              </div>
              <HistoricalComparisonChart data={mockEnergyData.historicalComparison.data} />
            </div>

            {/* Hour Wise Energy Spike */}
            <div className="bg-white p-5 rounded-2xl shadow">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  Hour Wise Energy Spike
                </h2>
                {chartData?.time_of_day && (
                  <HourlyUsageLineChart rawData={chartData?.time_of_day} />
                )}
              </div>
            </div>

            {/* Energy Consumption Chart */}
            <div className="bg-white p-5 rounded-2xl shadow">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  Usage Summary
                </h2>
                {chartData?.daily_summary && (
                  <ElectricityBarChart rawData={chartData?.daily_summary} />
                )}
              </div>
            </div>




          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Room Heat Map Card */}
            <div className="bg-white p-5 rounded-2xl shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Real-Time Energy Heat Map
              </h2>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Clock size={18} className="text-blue-500 mr-2" />
                  <span className="text-gray-700">
                    {currentTime.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="h-3 w-3 bg-green-200 rounded-full mr-1"></span>
                  <span className="mr-2">Low</span>
                  <span className="h-3 w-3 bg-yellow-300 rounded-full mr-1"></span>
                  <span className="mr-2">Medium</span>
                  <span className="h-3 w-3 bg-red-500 rounded-full mr-1"></span>
                  <span>High</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-green-200 p-3 rounded-lg text-center aspect-square flex flex-col justify-center">
                  <p className="text-sm text-gray-800">Bedroom 2</p>
                  <p className="text-xs text-gray-600">0.2 kW</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg text-center aspect-square flex flex-col justify-center">
                  <p className="text-sm text-gray-800">Bathroom</p>
                  <p className="text-xs text-gray-600">0.1 kW</p>
                </div>
                <div className="bg-red-400 p-3 rounded-lg text-center aspect-square flex flex-col justify-center">
                  <p className="text-sm text-gray-800 font-medium">Kitchen</p>
                  <p className="text-xs text-gray-700">1.8 kW</p>
                </div>
                <div className="bg-yellow-300 p-3 rounded-lg text-center aspect-square flex flex-col justify-center">
                  <p className="text-sm text-gray-800">Master Bed</p>
                  <p className="text-xs text-gray-600">0.6 kW</p>
                </div>
                <div className="bg-red-500 p-3 rounded-lg text-center aspect-square flex flex-col justify-center">
                  <p className="text-sm text-gray-800 font-medium">Living Room</p>
                  <p className="text-xs text-gray-700">2.1 kW</p>
                </div>
                <div className="bg-green-300 p-3 rounded-lg text-center aspect-square flex flex-col justify-center">
                  <p className="text-sm text-gray-800">Study</p>
                  <p className="text-xs text-gray-600">0.3 kW</p>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">High usage alert:</span> Living room AC and kitchen appliances are consuming the most energy right now.
                </p>
              </div>
            </div>

            {/* Room Wise Energy Distribution */}
            <div className="bg-white p-5 rounded-2xl shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Room Energy Distribution
              </h2>
              <div className="space-y-3">
                {mockEnergyData.roomData.map((room, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">{room.name}</p>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${room.usage}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="font-medium text-gray-700">{room.usage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rooms & Appliances Overview - NEW */}
            <div className="bg-white p-5 rounded-2xl shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Rooms & Appliances
              </h2>
              <div className="space-y-4">
                {Object.entries(mockEnergyData.roomsAndAppliances).map(([room, appliances], idx) => (
                  <div key={idx} className={`p-3 rounded-lg ${gradientClasses[idx % gradientClasses.length]}`}>
                    <p className="font-medium mb-2">{room.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
                    <div className="space-y-2">
                      {appliances.map((appliance, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span>{appliance.name}</span>
                          <span className="font-medium">{appliance.wattage}W</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Energy Saving Tips */}
            <div className="bg-white p-5 rounded-2xl shadow">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                <Lightbulb size={20} className="text-yellow-500 mr-2" />
                Smart Energy Tip
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-emerald-50 p-4 rounded-xl">
                <p className="text-gray-700">{energyTips[tipIndex]}</p>
              </div>
            </div>

            {/* Wastage Alerts Section */}
            <div className="bg-white p-5 rounded-2xl shadow">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                <AlertTriangle size={20} className="text-red-500 mr-2" />
                Wastage Alerts
              </h2>
              <div className="space-y-3">
                {mockEnergyData.wastageAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className="bg-red-50 border border-red-100 rounded-lg p-3"
                  >
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-gray-800">{alert.device}</p>
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                        {alert.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{alert.issue}</p>
                    <div className="flex justify-between items-center mt-2 text-sm">
                      <span className="text-red-600 font-medium">
                        Wasting {alert.wastage}
                      </span>
                    </div>
                    <div className="mt-2 text-sm bg-green-50 text-green-700 p-2 rounded">
                      <span className="font-medium">Recommendation:</span>{" "}
                      {alert.recommendation}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gamification Card */}
            <div className="bg-white p-5 rounded-2xl shadow">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                <Trophy size={20} className="text-amber-500 mr-2" />
                My Energy Game
              </h2>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Your Level</p>
                  <p className="font-semibold text-lg text-emerald-700">
                    {mockEnergyData.gamification.level}
                  </p>
                </div>
                <div className="bg-amber-100 h-14 w-14 rounded-full flex items-center justify-center">
                  <span className="text-amber-800 font-bold text-lg">
                    {mockEnergyData.gamification.points}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress to {mockEnergyData.gamification.nextLevel}</span>
                  <span>
                    {mockEnergyData.gamification.pointsToNextLevel} points left
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500"
                    style={{
                      width: `${(mockEnergyData.gamification.points /
                        (mockEnergyData.gamification.points +
                          mockEnergyData.gamification.pointsToNextLevel)) *
                        100
                        }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Daily Challenge
                </p>
                <div className="bg-blue-50 p-3 rounded-lg text-blue-800 text-sm">
                  {mockEnergyData.gamification.dailyChallenge}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Your Badges
                </p>
                <div className="flex flex-wrap gap-2">
                  {mockEnergyData.gamification.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>© 2025 EnergySmartHome. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;