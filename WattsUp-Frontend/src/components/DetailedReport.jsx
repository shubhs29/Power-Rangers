import React, { useState } from "react";
import {
    Zap,
    Home,
    BarChart3,
    Calendar,
    Download,
    Filter,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    PieChart,
    Clock,
    User,
    Award,
    LogOut,
    Info,
    Calendar as CalendarIcon,
    Activity,
    Droplet,
    Thermometer,
    ArrowUpDown,
    HelpCircle
} from "lucide-react";

// Mock data for detailed reports
const mockReportsData = {
    monthlyData: [
        { month: 'Jan', usage: 345 },
        { month: 'Feb', usage: 321 },
        { month: 'Mar', usage: 358 },
        { month: 'Apr', usage: 290 },
        { month: 'May', usage: 312 },
        { month: 'Jun', usage: 376 },
        { month: 'Jul', usage: 402 },
        { month: 'Aug', usage: 389 },
        { month: 'Sep', usage: 356 },
        { month: 'Oct', usage: 316 },
        { month: 'Nov', usage: 322 },
        { month: 'Dec', usage: 348 },
    ],
    usageByTime: [
        { time: '12 AM - 6 AM', usage: 12 },
        { time: '6 AM - 12 PM', usage: 28 },
        { time: '12 PM - 6 PM', usage: 35 },
        { time: '6 PM - 12 AM', usage: 25 },
    ],
    historicalUsage: [
        { year: 2023, quarter: 'Q1', usage: 1180 },
        { year: 2023, quarter: 'Q2', usage: 1250 },
        { year: 2023, quarter: 'Q3', usage: 1420 },
        { year: 2023, quarter: 'Q4', usage: 1320 },
        { year: 2024, quarter: 'Q1', usage: 1080 },
        { year: 2024, quarter: 'Q2', usage: 1078 },
    ],
    deviceTrends: [
        { device: 'AC', lastMonth: 180, thisMonth: 165, change: -8.3 },
        { device: 'Geyser', lastMonth: 85, thisMonth: 72, change: -15.3 },
        { device: 'Refrigerator', lastMonth: 62, thisMonth: 60, change: -3.2 },
        { device: 'Lights', lastMonth: 34, thisMonth: 32, change: -5.9 },
        { device: 'TV', lastMonth: 28, thisMonth: 26, change: -7.1 },
        { device: 'Washing Machine', lastMonth: 42, thisMonth: 38, change: -9.5 },
        { device: 'Microwave', lastMonth: 12, thisMonth: 11, change: -8.3 },
        { device: 'Computer', lastMonth: 25, thisMonth: 28, change: 12.0 },
    ],
    energyComparison: {
        you: 290,
        similarHomes: 340,
        efficientHomes: 245,
        savings: {
            vsAverage: 50,
            potential: 45
        }
    },
    billBreakdown: [
        { category: 'Base Energy Charges', amount: 1240 },
        { category: 'Time of Use Charges', amount: 320 },
        { category: 'Fixed Charges', amount: 180 },
        { category: 'Taxes', amount: 105 },
        { category: 'Discounts', amount: -80 }
    ],
    savingsOpportunities: [
        {
            device: 'Air Conditioner',
            potential: 210,
            recommendation: 'Increase temperature by 2°C and clean filters monthly',
            difficulty: 'Easy'
        },
        {
            device: 'Geyser',
            potential: 180,
            recommendation: 'Use timer to heat water only when needed',
            difficulty: 'Medium'
        },
        {
            device: 'Standby Power',
            potential: 120,
            recommendation: 'Use smart power strips to eliminate vampire power draw',
            difficulty: 'Easy'
        },
        {
            device: 'Lighting',
            potential: 85,
            recommendation: 'Replace remaining bulbs with LED options',
            difficulty: 'Easy'
        },
        {
            device: 'Refrigerator',
            potential: 65,
            recommendation: 'Keep coils clean and set temperature to optimal level',
            difficulty: 'Medium'
        }
    ]
};

function DetailedReports() {
    const [selectedReport, setSelectedReport] = useState('monthly');
    const [selectedTimeRange, setSelectedTimeRange] = useState('3m');
    const [showFilters, setShowFilters] = useState(false);

    // Function to handle navigation
    const navigateTo = (path) => {
        window.location.href = path;
    };

    const handleLogout = () => {
        // You could add any logout logic here (clear tokens, etc.)
        navigateTo('/');
    };

    const getTimeRangeLabel = () => {
        switch (selectedTimeRange) {
            case '1m': return 'Last Month';
            case '3m': return 'Last 3 Months';
            case '6m': return 'Last 6 Months';
            case '1y': return 'Last Year';
            case 'all': return 'All Time';
            default: return 'Last 3 Months';
        }
    };

    // Calculate the total amount
    const totalBillAmount = mockReportsData.billBreakdown.reduce((sum, item) => sum + item.amount, 0);

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
                            className="flex items-center px-3 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                        >
                            <Home size={18} className="mr-1" />
                            <span>Dashboard</span>
                        </button>
                        <button
                            onClick={() => navigateTo("/profile")}
                            className="flex items-center px-3 py-2 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
                        >
                            <User size={18} className="mr-1" />
                            <span>Profile</span>
                        </button>
                        <button
                            onClick={() => navigateTo("/leaderboard")}
                            className="flex items-center px-3 py-2 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                        >
                            <Award size={18} className="mr-1" />
                            <span>Leaderboard</span>
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

                {/* Page Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Detailed Energy Reports
                        </h1>
                        <p className="text-gray-600">In-depth analysis of your energy consumption patterns and trends</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center mt-4 md:mt-0 space-y-2 sm:space-y-0 sm:space-x-2">
                        <button
                            onClick={() => navigateTo("/dashboard")}
                            className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-white transition-colors"
                        >
                            <ChevronLeft size={16} className="mr-1" />
                            <span>Back to Dashboard</span>
                        </button>
                        <button className="flex items-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                            <Download size={16} className="mr-1" />
                            <span>Export Reports</span>
                        </button>
                    </div>
                </div>

                {/* Report Type Selection */}
                <div className="bg-white p-4 rounded-2xl shadow mb-6">
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="flex overflow-x-auto pb-2 space-x-2 mb-2 sm:mb-0">
                            <button
                                onClick={() => setSelectedReport('monthly')}
                                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${selectedReport === 'monthly'
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Monthly Usage
                            </button>
                            <button
                                onClick={() => setSelectedReport('time')}
                                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${selectedReport === 'time'
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Time of Day
                            </button>
                            <button
                                onClick={() => setSelectedReport('historical')}
                                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${selectedReport === 'historical'
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Historical Trends
                            </button>
                            <button
                                onClick={() => setSelectedReport('devices')}
                                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${selectedReport === 'devices'
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Device Analysis
                            </button>
                            <button
                                onClick={() => setSelectedReport('comparison')}
                                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${selectedReport === 'comparison'
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Community Comparison
                            </button>
                            <button
                                onClick={() => setSelectedReport('bill')}
                                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${selectedReport === 'bill'
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Bill Breakdown
                            </button>
                            <button
                                onClick={() => setSelectedReport('savings')}
                                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${selectedReport === 'savings'
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Savings Opportunities
                            </button>
                        </div>

                        <div className="flex items-center mt-2 sm:mt-0">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors mr-2"
                            >
                                <Filter size={16} className="mr-1" />
                                <span>Filters</span>
                                <ChevronDown size={16} className="ml-1" />
                            </button>

                            <div className="relative">
                                <button className="flex items-center px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                                    <Calendar size={16} className="mr-1" />
                                    <span>{getTimeRangeLabel()}</span>
                                    <ChevronDown size={16} className="ml-1" />
                                </button>

                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-2 z-10 hidden">
                                    <button
                                        onClick={() => setSelectedTimeRange('1m')}
                                        className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                                    >
                                        Last Month
                                    </button>
                                    <button
                                        onClick={() => setSelectedTimeRange('3m')}
                                        className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                                    >
                                        Last 3 Months
                                    </button>
                                    <button
                                        onClick={() => setSelectedTimeRange('6m')}
                                        className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                                    >
                                        Last 6 Months
                                    </button>
                                    <button
                                        onClick={() => setSelectedTimeRange('1y')}
                                        className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                                    >
                                        Last Year
                                    </button>
                                    <button
                                        onClick={() => setSelectedTimeRange('all')}
                                        className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                                    >
                                        All Time
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter options - conditionally rendered */}
                    {showFilters && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rooms</label>
                                <select className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2">
                                    <option value="all">All Rooms</option>
                                    <option value="living">Living Room</option>
                                    <option value="kitchen">Kitchen</option>
                                    <option value="bedroom">Bedroom</option>
                                    <option value="bathroom">Bathroom</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Devices</label>
                                <select className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2">
                                    <option value="all">All Devices</option>
                                    <option value="ac">Air Conditioner</option>
                                    <option value="geyser">Geyser</option>
                                    <option value="fridge">Refrigerator</option>
                                    <option value="lights">Lights</option>
                                    <option value="tv">TV</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="date"
                                        className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2"
                                        defaultValue="2024-01-01"
                                    />
                                    <span>to</span>
                                    <input
                                        type="date"
                                        className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2"
                                        defaultValue="2024-04-01"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Report Content */}
                {selectedReport === 'monthly' && (
                    <div className="bg-white p-5 rounded-2xl shadow mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                <BarChart3 size={20} className="text-emerald-500 mr-2" />
                                Monthly Energy Consumption
                            </h2>
                            <div className="text-sm text-gray-500">
                                Year 2024
                            </div>
                        </div>
                        <div className="h-80 w-full">
                            {/* Monthly energy chart visualization */}
                            <div className="bg-gray-50 h-full rounded-lg flex items-end px-4 py-2 space-x-4">
                                {mockReportsData.monthlyData.map((month, i) => (
                                    <div key={i} className="flex flex-col items-center flex-1">
                                        <div
                                            className={`w-full ${i >= 0 && i <= 3 ? 'bg-emerald-500' : 'bg-blue-500'} rounded-t-lg transition-all duration-500`}
                                            style={{ height: `${(month.usage / 420) * 100}%` }}
                                        ></div>
                                        <span className="text-xs mt-2 text-gray-600">{month.month}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-3 bg-emerald-50 rounded-lg">
                                <div className="text-sm text-gray-600">Average Monthly Usage</div>
                                <div className="text-2xl font-bold text-gray-800">345 kWh</div>
                                <div className="text-xs text-gray-500 mt-1">Based on last 12 months</div>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <div className="text-sm text-gray-600">Highest Month</div>
                                <div className="text-2xl font-bold text-gray-800">402 kWh</div>
                                <div className="text-xs text-gray-500 mt-1">July (Summer cooling)</div>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <div className="text-sm text-gray-600">Lowest Month</div>
                                <div className="text-2xl font-bold text-gray-800">290 kWh</div>
                                <div className="text-xs text-gray-500 mt-1">April (Spring mild weather)</div>
                            </div>
                        </div>
                    </div>
                )}

                {selectedReport === 'time' && (
                    <div className="bg-white p-5 rounded-2xl shadow mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                <Clock size={20} className="text-emerald-500 mr-2" />
                                Usage by Time of Day
                            </h2>
                            <div className="text-sm text-gray-500">
                                Average daily pattern
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <div className="h-72 w-full">
                                    {/* Time of day chart - using a pie chart representation */}
                                    <div className="bg-gray-50 h-full rounded-lg p-4 flex items-center justify-center">
                                        <div className="relative w-64 h-64">
                                            {/* Simple pie chart visualization */}
                                            <div
                                                className="absolute inset-0 rounded-full border-16 border-blue-500"
                                                style={{
                                                    clipPath: 'polygon(50% 50%, 100% 50%, 100% 0%, 0% 0%, 0% 50%)',
                                                    transform: 'rotate(0deg)'
                                                }}
                                            ></div>
                                            <div
                                                className="absolute inset-0 rounded-full border-16 border-emerald-500"
                                                style={{
                                                    clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)',
                                                    transform: 'rotate(0deg)'
                                                }}
                                            ></div>
                                            <div
                                                className="absolute inset-0 rounded-full border-16 border-purple-500"
                                                style={{
                                                    clipPath: 'polygon(50% 50%, 50% 100%, 0% 100%, 0% 50%)',
                                                    transform: 'rotate(0deg)'
                                                }}
                                            ></div>
                                            <div
                                                className="absolute inset-0 rounded-full border-16 border-teal-500"
                                                style={{
                                                    clipPath: 'polygon(50% 50%, 0% 50%, 0% 0%, 25% 0%)',
                                                    transform: 'rotate(0deg)'
                                                }}
                                            ></div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center">
                                                    <div className="text-center">
                                                        <div className="text-lg font-semibold text-gray-800">100%</div>
                                                        <div className="text-xs text-gray-500">Daily Usage</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="space-y-4">
                                    {mockReportsData.usageByTime.map((timeSlot, i) => (
                                        <div key={i} className="space-y-1">
                                            <div className="flex justify-between text-sm">
                                                <div className="flex items-center">
                                                    <div
                                                        className={`w-3 h-3 rounded-full mr-2 ${i === 0 ? 'bg-teal-500' :
                                                                i === 1 ? 'bg-blue-500' :
                                                                    i === 2 ? 'bg-emerald-500' : 'bg-purple-500'
                                                            }`}
                                                    ></div>
                                                    <span className="text-gray-700">{timeSlot.time}</span>
                                                </div>
                                                <span className="font-medium">{timeSlot.usage}%</span>
                                            </div>
                                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${i === 0 ? 'bg-teal-500' :
                                                            i === 1 ? 'bg-blue-500' :
                                                                i === 2 ? 'bg-emerald-500' : 'bg-purple-500'
                                                        }`}
                                                    style={{ width: `${timeSlot.usage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                    <h3 className="font-medium text-gray-800 mb-2">Insight</h3>
                                    <p className="text-sm text-gray-600">
                                        Your peak energy consumption is between 12 PM - 6 PM,
                                        likely due to AC usage during hottest hours. Consider using
                                        scheduled timers or smart controls to optimize.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {selectedReport === 'historical' && (
                    <div className="bg-white p-5 rounded-2xl shadow mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                <Activity size={20} className="text-emerald-500 mr-2" />
                                Historical Energy Trends
                            </h2>
                            <div className="text-sm text-gray-500">
                                Quarterly Analysis
                            </div>
                        </div>
                        <div className="h-80 w-full">
                            {/* Historical trends chart visualization */}
                            <div className="bg-gray-50 h-full rounded-lg flex items-end px-4 py-2 space-x-4">
                                {mockReportsData.historicalUsage.map((quarter, i) => (
                                    <div key={i} className="flex flex-col items-center flex-1">
                                        <div
                                            className={`w-full ${quarter.year === 2024 ? 'bg-emerald-500' : 'bg-blue-500'} rounded-t-lg transition-all duration-500`}
                                            style={{ height: `${(quarter.usage / 1500) * 100}%` }}
                                        ></div>
                                        <span className="text-xs mt-2 text-gray-600">{quarter.quarter}</span>
                                        <span className="text-xs text-gray-500">{quarter.year}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-medium text-gray-800 mb-2">Year-over-Year Comparison</h3>
                                <div className="flex items-center mb-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                                    <span className="text-gray-700 text-sm mr-2">2023 Avg:</span>
                                    <span className="font-medium text-gray-800">1,292 kWh/quarter</span>
                                </div>
                                <div className="flex items-center mb-2">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                                    <span className="text-gray-700 text-sm mr-2">2024 Avg:</span>
                                    <span className="font-medium text-gray-800">1,079 kWh/quarter</span>
                                </div>
                                <div className="flex items-center text-emerald-600">
                                    <ArrowUpDown size={16} className="mr-1" />
                                    <span>16.5% reduction in energy usage</span>
                                </div>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <h3 className="font-medium text-gray-800 mb-2">Seasonal Patterns</h3>
                                <p className="text-sm text-gray-600 mb-3">
                                    Your usage typically peaks in Q3 (summer months) due to increased cooling needs,
                                    and is lowest in Q1 (winter months).
                                </p>
                                <div className="flex items-center">
                                    <div className="bg-emerald-100 p-1 rounded-full mr-2">
                                        <Thermometer size={16} className="text-emerald-600" />
                                    </div>
                                    <span className="text-sm text-gray-700">
                                        Potential for 8-12% additional savings with seasonal adjustments
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {selectedReport === 'devices' && (
                    <div className="bg-white p-5 rounded-2xl shadow mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                <Zap size={20} className="text-emerald-500 mr-2" />
                                Device-wise Energy Analysis
                            </h2>
                            <div className="text-sm text-gray-500">
                                Monthly comparison
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Device
                                        </th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Last Month (kWh)
                                        </th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            This Month (kWh)
                                        </th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Change
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {mockReportsData.deviceTrends.map((device, i) => (
                                        <tr key={i}>
                                            <td className="py-3 px-4 text-sm text-gray-800">
                                                {device.device}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-600">
                                                {device.lastMonth}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-600">
                                                {device.thisMonth}
                                            </td>
                                            <td className="py-3 px-4 text-sm">
                                                <span className={`px-2 py-1 rounded-full text-xs ${device.change < 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                                                    {device.change < 0 ? '↓' : '↑'} {Math.abs(device.change)}%
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-medium text-gray-800 mb-2">Top Energy Consumers</h3>
                                <div className="space-y-3">
                                    {mockReportsData.deviceTrends.slice(0, 3).map((device, i) => (
                                        <div key={i} className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>
                                            <span className="text-gray-700 text-sm mr-2">{device.device}:</span>
                                            <span className="font-medium text-gray-800">{device.thisMonth} kWh ({Math.round(device.thisMonth / mockReportsData.deviceTrends.reduce((sum, d) => sum + d.thisMonth, 0) * 100)}%)</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <h3 className="font-medium text-gray-800 mb-2">Device Efficiency Tips</h3>
                                <ul className="text-sm text-gray-600 space-y-2">
                                    <li className="flex items-start">
                                        <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
                                            <Thermometer size={12} className="text-blue-600" />
                                        </div>
                                        <span>Set AC temperature 1-2°C higher to save up to 10% energy</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
                                            <Droplet size={12} className="text-blue-600" />
                                        </div>
                                        <span>Install a timer on your geyser to avoid unnecessary heating</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
                                            <Zap size={12} className="text-blue-600" />
                                        </div>
                                        <span>Use smart power strips to eliminate standby power consumption</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {selectedReport === 'comparison' && (
                    <div className="bg-white p-5 rounded-2xl shadow mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                <User size={20} className="text-emerald-500 mr-2" />
                                Community Comparison
                            </h2>
                            <div className="text-sm text-gray-500">
                                Last billing cycle
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <div className="h-72 w-full">
                                    <div className="bg-gray-50 h-full rounded-lg p-4 flex items-end justify-around">
                                        <div className="flex flex-col items-center">
                                            <div className="text-sm text-gray-500 mb-2">You</div>
                                            <div className="relative w-16">
                                                <div className="absolute bottom-0 w-16 bg-emerald-500 rounded-t-lg" style={{ height: `${(mockReportsData.energyComparison.you / 400) * 100}%` }}></div>
                                                <div className="absolute bottom-0 w-16 h-full flex flex-col justify-end">
                                                    <div className="bg-transparent h-2/3"></div>
                                                    <div className="bg-transparent border-t-2 border-dashed border-gray-400 h-0"></div>
                                                    <div className="bg-transparent h-1/3"></div>
                                                </div>
                                            </div>
                                            <div className="mt-2 font-medium text-emerald-600">{mockReportsData.energyComparison.you} kWh</div>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <div className="text-sm text-gray-500 mb-2">Similar Homes</div>
                                            <div className="relative w-16">
                                                <div className="absolute bottom-0 w-16 bg-blue-400 rounded-t-lg" style={{ height: `${(mockReportsData.energyComparison.similarHomes / 400) * 100}%` }}></div>
                                            </div>
                                            <div className="mt-2 font-medium text-blue-600">{mockReportsData.energyComparison.similarHomes} kWh</div>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <div className="text-sm text-gray-500 mb-2">Efficient Homes</div>
                                            <div className="relative w-16">
                                                <div className="absolute bottom-0 w-16 bg-purple-400 rounded-t-lg" style={{ height: `${(mockReportsData.energyComparison.efficientHomes / 400) * 100}%` }}></div>
                                            </div>
                                            <div className="mt-2 font-medium text-purple-600">{mockReportsData.energyComparison.efficientHomes} kWh</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="p-4 bg-emerald-50 rounded-lg mb-4">
                                    <h3 className="font-medium text-gray-800 mb-2">Your Savings</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">vs. Similar Homes:</span>
                                            <span className="font-medium text-emerald-600">
                                                {mockReportsData.energyComparison.savings.vsAverage} kWh ({Math.round((mockReportsData.energyComparison.savings.vsAverage / mockReportsData.energyComparison.similarHomes) * 100)}%)
                                            </span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500" style={{ width: `${(mockReportsData.energyComparison.savings.vsAverage / mockReportsData.energyComparison.similarHomes) * 100}%` }}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <h3 className="font-medium text-gray-800 mb-2">Additional Potential</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">vs. Efficient Homes:</span>
                                            <span className="font-medium text-blue-600">
                                                {mockReportsData.energyComparison.savings.potential} kWh ({Math.round((mockReportsData.energyComparison.savings.potential / mockReportsData.energyComparison.you) * 100)}%)
                                            </span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500" style={{ width: `${(mockReportsData.energyComparison.savings.potential / mockReportsData.energyComparison.you) * 100}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="mt-3 text-sm text-gray-600">
                                        You're doing better than 65% of similar homes in your area!
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {selectedReport === 'bill' && (
                    <div className="bg-white p-5 rounded-2xl shadow mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                <PieChart size={20} className="text-emerald-500 mr-2" />
                                Bill Breakdown Analysis
                            </h2>
                            <div className="text-sm text-gray-500">
                                Current billing cycle
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <div className="h-72 w-full">
                                    <div className="bg-gray-50 h-full rounded-lg p-4 flex items-center justify-center">
                                        <div className="relative w-64 h-64">
                                            {/* Pie chart visualization for bill breakdown */}
                                            <div
                                                className="absolute inset-0 rounded-full border-16 border-blue-500"
                                                style={{
                                                    clipPath: `polygon(50% 50%, 100% 50%, 100% 0%, 50% 0%)`,
                                                    transform: 'rotate(0deg)'
                                                }}
                                            ></div>
                                            <div
                                                className="absolute inset-0 rounded-full border-16 border-emerald-500"
                                                style={{
                                                    clipPath: `polygon(50% 50%, 50% 0%, 0% 0%, 0% 50%)`,
                                                    transform: 'rotate(0deg)'
                                                }}
                                            ></div>
                                            <div
                                                className="absolute inset-0 rounded-full border-16 border-purple-500"
                                                style={{
                                                    clipPath: `polygon(50% 50%, 0% 50%, 0% 100%, 25% 100%)`,
                                                    transform: 'rotate(0deg)'
                                                }}
                                            ></div>
                                            <div
                                                className="absolute inset-0 rounded-full border-16 border-teal-500"
                                                style={{
                                                    clipPath: `polygon(50% 50%, 25% 100%, 75% 100%)`,
                                                    transform: 'rotate(0deg)'
                                                }}
                                            ></div>
                                            <div
                                                className="absolute inset-0 rounded-full border-16 border-red-500"
                                                style={{
                                                    clipPath: `polygon(50% 50%, 75% 100%, 100% 100%, 100% 50%)`,
                                                    transform: 'rotate(0deg)'
                                                }}
                                            ></div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center">
                                                    <div className="text-center">
                                                        <div className="text-lg font-semibold text-gray-800">₹{totalBillAmount}</div>
                                                        <div className="text-xs text-gray-500">Total Bill</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="space-y-4">
                                    {mockReportsData.billBreakdown.map((item, i) => (
                                        <div key={i} className="space-y-1">
                                            <div className="flex justify-between text-sm">
                                                <div className="flex items-center">
                                                    <div
                                                        className={`w-3 h-3 rounded-full mr-2 ${i === 0 ? 'bg-blue-500' :
                                                                i === 1 ? 'bg-emerald-500' :
                                                                    i === 2 ? 'bg-purple-500' :
                                                                        i === 3 ? 'bg-teal-500' : 'bg-red-500'
                                                            }`}
                                                    ></div>
                                                    <span className="text-gray-700">{item.category}</span>
                                                </div>
                                                <span className={`font-medium ${item.amount < 0 ? 'text-emerald-600' : 'text-gray-800'}`}>
                                                    {item.amount < 0 ? '-' : ''}₹{Math.abs(item.amount)}
                                                </span>
                                            </div>
                                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${i === 0 ? 'bg-blue-500' :
                                                            i === 1 ? 'bg-emerald-500' :
                                                                i === 2 ? 'bg-purple-500' :
                                                                    i === 3 ? 'bg-teal-500' : 'bg-red-500'
                                                        }`}
                                                    style={{ width: `${Math.abs(item.amount) / totalBillAmount * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                    <h3 className="font-medium text-gray-800 mb-2">Bill Insights</h3>
                                    <p className="text-sm text-gray-600">
                                        Your base energy charges constitute {Math.round(mockReportsData.billBreakdown[0].amount / totalBillAmount * 100)}% of your total bill.
                                        You received a discount of ₹{Math.abs(mockReportsData.billBreakdown[4].amount)} for being in the low-consumption tier.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {selectedReport === 'savings' && (
                    <div className="bg-white p-5 rounded-2xl shadow mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                <Zap size={20} className="text-emerald-500 mr-2" />
                                Savings Opportunities
                            </h2>
                            <div className="text-sm text-gray-500">
                                Estimated annual savings
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Device / Area
                                        </th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Annual Savings (₹)
                                        </th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Recommendation
                                        </th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Difficulty
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {mockReportsData.savingsOpportunities.map((opp, i) => (
                                        <tr key={i}>
                                            <td className="py-4 px-4 text-sm text-gray-800">
                                                {opp.device}
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="text-emerald-600 font-medium">₹{opp.potential}</span>
                                            </td>
                                            <td className="py-4 px-4 text-sm text-gray-600 max-w-xs">
                                                {opp.recommendation}
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className={`px-2 py-1 rounded-full text-xs ${opp.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800' :
                                                        opp.difficulty === 'Medium' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-amber-100 text-amber-800'
                                                    }`}>
                                                    {opp.difficulty}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-emerald-50 rounded-lg">
                                <h3 className="font-medium text-gray-800 mb-2">Total Potential Savings</h3>
                                <div className="text-2xl font-bold text-emerald-600">
                                    ₹{mockReportsData.savingsOpportunities.reduce((sum, item) => sum + item.potential, 0)} / year
                                </div>
                                <div className="text-sm text-gray-600 mt-2">
                                    That's approximately ₹{Math.round(mockReportsData.savingsOpportunities.reduce((sum, item) => sum + item.potential, 0) / 12)} per month!
                                </div>
                            </div>

                            <div className="p-4 bg-blue-50 rounded-lg">
                                <h3 className="font-medium text-gray-800 mb-2">Get Started</h3>
                                <p className="text-sm text-gray-600 mb-3">
                                    Implement these recommendations to start saving! Focus on the easy wins first for immediate results.
                                </p>
                                <div className="flex">
                                    <button className="flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors mr-2">
                                        <Info size={16} className="mr-1" />
                                        <span>More Details</span>
                                    </button>
                                    <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                        <CalendarIcon size={16} className="mr-1" />
                                        <span>Set Reminders</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Help & Support Section */}
                <div className="bg-white p-5 rounded-2xl shadow mb-6">
                    <div className="flex items-center mb-4">
                        <HelpCircle size={20} className="text-blue-500 mr-2" />
                        <h2 className="text-xl font-semibold text-gray-800">Need Help?</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-medium text-gray-800 mb-2">Understanding Your Reports</h3>
                            <p className="text-sm text-gray-600 mb-3">
                                Get detailed explanations about each report type and how to interpret the data.
                            </p>
                            <button className="text-blue-600 text-sm hover:underline">
                                View Guide
                            </button>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-medium text-gray-800 mb-2">Energy Saving Tips</h3>
                            <p className="text-sm text-gray-600 mb-3">
                                Browse our extensive library of tips and tricks to reduce your energy consumption.
                            </p>
                            <button className="text-blue-600 text-sm hover:underline">
                                Explore Tips
                            </button>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-medium text-gray-800 mb-2">Contact Support</h3>
                            <p className="text-sm text-gray-600 mb-3">
                                Having issues with your reports or need personalized advice? Our team is here to help.
                            </p>
                            <button className="text-blue-600 text-sm hover:underline">
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailedReports;