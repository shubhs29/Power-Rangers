import React, { useState } from "react";
import { Home, Users, Zap, Settings, Save, X, User, Award, LogOut, BatteryCharging, Clock, Sliders, ToggleLeft, Sun, Moon, AlertTriangle } from "lucide-react";

function AdvancedEnergySettings() {
  const [settings, setSettings] = useState({
    peakHoursStart: "14:00",
    peakHoursEnd: "18:00",
    tempThreshold: 24,
    standbyDetection: true,
    autoShutdown: true,
    nightMode: true,
    notifications: true,
    highUsageAlerts: true,
    budgetLimit: 2000
  });

  const [tempSettings, setTempSettings] = useState({ ...settings });
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedNotification, setShowSavedNotification] = useState(false);

  // Function to handle navigation
  const navigateTo = (path) => {
    window.location.href = path;
  };

  const handleLogout = () => {
    // You could add any logout logic here (clear tokens, etc.)
    navigateTo('/');
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSettings({ ...tempSettings });
      setIsSaving(false);
      setShowSavedNotification(true);
      setTimeout(() => setShowSavedNotification(false), 3000);
    }, 800);
  };

  const handleReset = () => {
    setTempSettings({ ...settings });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Bar */}
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
              className="flex items-center px-3 py-2 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
            >
              <Award size={18} className="mr-1" />
              <span>Leaderboard</span>
            </button>
            <button
              onClick={() => navigateTo("/profile")}
              className="flex items-center px-3 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Advanced Energy Settings</h1>
            <p className="text-gray-600">Optimize your energy usage with customized settings</p>
          </div>

          {/* Energy efficiency badge */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-full flex items-center mt-4 md:mt-0">
            <BatteryCharging size={18} className="mr-2" />
            <span className="font-medium">Efficiency Score: 85/100</span>
          </div>
        </div>

        {/* Saved notification */}
        {showSavedNotification && (
          <div className="fixed top-6 right-6 bg-emerald-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center animate-fade-in-out">
            <Zap size={18} className="mr-2" />
            <span>Settings saved successfully!</span>
          </div>
        )}

        {/* Main content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {/* Peak Hours Settings */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Clock size={18} className="text-emerald-500 mr-2" />
              Peak Hours Management
            </h3>
            <p className="text-gray-600 mb-4">
              Optimize energy usage during peak tariff hours when electricity costs are higher.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Peak Hours Start</label>
                <input
                  type="time"
                  value={tempSettings.peakHoursStart}
                  onChange={(e) => setTempSettings({ ...tempSettings, peakHoursStart: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Peak Hours End</label>
                <input
                  type="time"
                  value={tempSettings.peakHoursEnd}
                  onChange={(e) => setTempSettings({ ...tempSettings, peakHoursEnd: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Temperature Settings */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Sun size={18} className="text-emerald-500 mr-2" />
              Temperature Management
            </h3>
            <p className="text-gray-600 mb-4">
              Set optimal temperature thresholds for your AC and heating systems.
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Optimal AC Temperature (°C)</label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="18"
                  max="30"
                  value={tempSettings.tempThreshold}
                  onChange={(e) => setTempSettings({ ...tempSettings, tempThreshold: parseInt(e.target.value) })}
                  className="w-full mr-4 accent-emerald-500"
                />
                <div className="bg-emerald-100 text-emerald-800 font-medium px-3 py-1 rounded-lg w-12 text-center">
                  {tempSettings.tempThreshold}
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Recommended: 24°C for optimal comfort and efficiency
              </p>
            </div>
          </div>

          {/* Automation Settings */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Sliders size={18} className="text-emerald-500 mr-2" />
              Automation Features
            </h3>
            <p className="text-gray-600 mb-4">
              Enable smart features to automatically optimize your energy usage.
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">Standby Detection</h4>
                  <p className="text-sm text-gray-600">Identify and minimize standby power consumption</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={tempSettings.standbyDetection} 
                    onChange={(e) => setTempSettings({ ...tempSettings, standbyDetection: e.target.checked })}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">Auto Shutdown</h4>
                  <p className="text-sm text-gray-600">Turn off inactive appliances automatically</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={tempSettings.autoShutdown} 
                    onChange={(e) => setTempSettings({ ...tempSettings, autoShutdown: e.target.checked })}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">Night Mode</h4>
                  <p className="text-sm text-gray-600">Reduce energy consumption during nighttime</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={tempSettings.nightMode} 
                    onChange={(e) => setTempSettings({ ...tempSettings, nightMode: e.target.checked })}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <AlertTriangle size={18} className="text-emerald-500 mr-2" />
              Alerts & Notifications
            </h3>
            <p className="text-gray-600 mb-4">
              Configure when and how you receive energy usage alerts.
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">Usage Notifications</h4>
                  <p className="text-sm text-gray-600">Receive weekly reports on your energy usage</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={tempSettings.notifications} 
                    onChange={(e) => setTempSettings({ ...tempSettings, notifications: e.target.checked })}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">High Usage Alerts</h4>
                  <p className="text-sm text-gray-600">Get notified when energy usage spikes unexpectedly</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={tempSettings.highUsageAlerts} 
                    onChange={(e) => setTempSettings({ ...tempSettings, highUsageAlerts: e.target.checked })}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Budget Settings */}
          <div className="p-6 md:p-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Zap size={18} className="text-emerald-500 mr-2" />
              Energy Budget
            </h3>
            <p className="text-gray-600 mb-4">
              Set monthly energy budget limits to help manage costs.
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Budget Limit (₹)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">₹</span>
                <input
                  type="number"
                  min="500"
                  step="100"
                  value={tempSettings.budgetLimit}
                  onChange={(e) => setTempSettings({ ...tempSettings, budgetLimit: parseInt(e.target.value) })}
                  className="w-full pl-8 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                You'll receive alerts when approaching 80% of your budget
              </p>
            </div>
          </div>

          {/* Energy tips */}
          <div className="p-6 md:p-8 bg-gradient-to-r from-emerald-50 to-blue-50">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Energy Saving Tip</h3>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100">
              <p className="text-gray-700">
                <span className="font-medium text-emerald-600">Pro tip:</span> Setting your peak hours correctly can save up to 30% on your electricity bill. Most utility providers charge higher rates between 2pm and 6pm.
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-end mb-6">
          <button
            onClick={handleReset}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Reset Changes
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center justify-center px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:bg-emerald-300"
          >
            {isSaving ? (
              <span>Saving...</span>
            ) : (
              <>
                <Save size={18} className="mr-2" />
                Save Settings
              </>
            )}
          </button>
        </div>

        {/* Bottom navigation links */}
        <div className="flex justify-between">
          <button
            onClick={() => navigateTo("/profile")}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <User size={18} className="mr-1" />
            <span>Back to Profile</span>
          </button>

          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center text-purple-600 hover:text-purple-800">
              <Award size={18} className="mr-1" />
              <span>View Community Leaderboard</span>
            </a>

            <button
              onClick={handleLogout}
              className="flex items-center text-red-600 hover:text-red-800"
            >
              <LogOut size={18} className="mr-1" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvancedEnergySettings;