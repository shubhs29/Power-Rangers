import React, { useState } from "react";
import { Home, Users, Zap, Settings, Edit, Save, X, Plus, Award, User, LogOut, Upload, Trash2, Check } from "lucide-react";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    location: "Mumbai",
    householdSize: 4,
    rooms: {
      "Kitchen": ["Fridge", "Microwave", "Electric Kettle"],
      "Living Room": ["TV", "Lights", "AC"],
      "Bedroom": ["AC", "Lights", "Ceiling Fan"],
      "Bathroom": ["Geyser", "Exhaust Fan"]
    },
    energyGoal: "Save 20% this month"
  });

  const [tempProfile, setTempProfile] = useState({ ...profile });
  const [newAppliance, setNewAppliance] = useState("");
  const [newRoom, setNewRoom] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(Object.keys(profile.rooms)[0]);
  const [addingRoom, setAddingRoom] = useState(false);

  // Function to handle navigation
  const navigateTo = (path) => {
    window.location.href = path;
  };

  const handleLogout = () => {
    // You could add any logout logic here (clear tokens, etc.)
    navigateTo('/');
  };

  const handleEdit = () => {
    setTempProfile({ ...profile });
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile({ ...tempProfile });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleApplianceAdd = () => {
    if (newAppliance.trim() && selectedRoom) {
      const updatedRooms = { ...tempProfile.rooms };
      if (!updatedRooms[selectedRoom]) {
        updatedRooms[selectedRoom] = [];
      }
      updatedRooms[selectedRoom] = [...updatedRooms[selectedRoom], newAppliance.trim()];

      setTempProfile({
        ...tempProfile,
        rooms: updatedRooms
      });
      setNewAppliance("");
    }
  };

  const handleApplianceRemove = (room, index) => {
    const updatedRooms = { ...tempProfile.rooms };
    updatedRooms[room].splice(index, 1);

    // Remove room if it has no appliances
    if (updatedRooms[room].length === 0) {
      delete updatedRooms[room];
    }

    setTempProfile({
      ...tempProfile,
      rooms: updatedRooms
    });
  };

  const handleAddRoom = () => {
    if (newRoom.trim() && !tempProfile.rooms[newRoom.trim()]) {
      const updatedRooms = { ...tempProfile.rooms };
      updatedRooms[newRoom.trim()] = [];

      setTempProfile({
        ...tempProfile,
        rooms: updatedRooms
      });

      setSelectedRoom(newRoom.trim());
      setNewRoom("");
      setAddingRoom(false);
    }
  };

  const handleDeleteRoom = (roomName) => {
    const updatedRooms = { ...tempProfile.rooms };
    delete updatedRooms[roomName];

    setTempProfile({
      ...tempProfile,
      rooms: updatedRooms
    });

    // Select another room if available
    if (Object.keys(updatedRooms).length > 0) {
      setSelectedRoom(Object.keys(updatedRooms)[0]);
    } else {
      setSelectedRoom("");
    }
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
              className="flex items-center px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
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

        {/* Header with energy stats */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
            <p className="text-gray-600">Manage your household energy information</p>
          </div>

          {/* Energy savings badge */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-full flex items-center mt-4 md:mt-0">
            <Zap size={18} className="mr-2" />
            <span className="font-medium">15% Energy Saved This Month</span>
          </div>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* User info section */}
          <div className="relative p-6 md:p-8 border-b border-gray-100">
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="absolute top-6 right-6 p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
              >
                <Edit size={20} />
              </button>
            )}

            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </div>
                {!isEditing && (
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full">
                    <Zap size={14} />
                  </div>
                )}
              </div>

              {/* User details */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={tempProfile.name}
                        onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={tempProfile.location}
                        onChange={(e) => setTempProfile({ ...tempProfile, location: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Household Size</label>
                      <input
                        type="number"
                        value={tempProfile.householdSize}
                        onChange={(e) => setTempProfile({ ...tempProfile, householdSize: parseInt(e.target.value) })}
                        min="1"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Energy Goal</label>
                      <input
                        type="text"
                        value={tempProfile.energyGoal}
                        onChange={(e) => setTempProfile({ ...tempProfile, energyGoal: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div> 
                ) : ( 
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">{profile.name}</h2>
                    <div className="flex items-center mb-4">
                      <Home size={16} className="text-gray-500 mr-1" />
                      <span className="text-gray-600">{profile.location}</span>
                      <Users size={16} className="text-gray-500 ml-4 mr-1" />
                      <span className="text-gray-600">{profile.householdSize} people</span>
                    </div>
                    <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                      <Zap size={14} className="mr-1" />
                      <span className="text-sm font-medium">Goal: {profile.energyGoal}</span>
                    </div>
                  </div> 
                )} 
              <div className="flex mt-3">
            <button
              onClick={() => {
                // API call will go here
                // For example: fetchEnergyData() or addEnergyData()
              }}
              className="px-4 py-2 rounded-lg flex items-center bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              <Zap size={18} className="mr-2" />
              Add Energy Data
            </button>
          </div>
              </div>
            </div>
          </div>

          {/* Appliances section */}
          <div className="p-6 md:p-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Zap size={18} className="text-emerald-500 mr-2" />
              Appliances by Room
            </h3>

            {isEditing ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {Object.keys(tempProfile.rooms).map((room) => (
                    <button
                      key={room}
                      onClick={() => setSelectedRoom(room)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center
                        ${selectedRoom === room
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} 
                        transition-colors`}
                    >
                      <span>{room}</span>
                      {selectedRoom === room && isEditing && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteRoom(room);
                          }}
                          className="ml-2 text-white hover:text-red-200"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </button>
                  ))}

                  {!addingRoom ? (
                    <button
                      onClick={() => setAddingRoom(true)}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors flex items-center"
                    >
                      <Plus size={16} className="mr-1" />
                      Add Room
                    </button>
                  ) : (
                    <div className="flex">
                      <input
                        type="text"
                        value={newRoom}
                        onChange={(e) => setNewRoom(e.target.value)}
                        placeholder="Room name"
                        className="p-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleAddRoom}
                        className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setAddingRoom(false);
                          setNewRoom("");
                        }}
                        className="p-2 ml-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {selectedRoom && (
                  <>
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        value={newAppliance}
                        onChange={(e) => setNewAppliance(e.target.value)}
                        placeholder={`Add appliance to ${selectedRoom}`}
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleApplianceAdd}
                        className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                      >
                        <Plus size={20} />
                      </button>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">{selectedRoom} Appliances</h4>
                      <div className="flex flex-wrap gap-2">
                        {tempProfile.rooms[selectedRoom]?.map((appliance, index) => (
                          <div key={index} className="flex items-center bg-white border border-gray-200 rounded-full px-3 py-1">
                            <span className="text-gray-800">{appliance}</span>
                            <button
                              onClick={() => handleApplianceRemove(selectedRoom, index)}
                              className="ml-2 text-gray-500 hover:text-red-500"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                        {tempProfile.rooms[selectedRoom]?.length === 0 && (
                          <p className="text-gray-500 text-sm">No appliances in this room yet.</p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                <div className="flex gap-2 mt-6">
                  <button
                    onClick={handleSave}
                    className="flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                  >
                    <Save size={18} className="mr-2" />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(profile.rooms).map(([room, appliances]) => (
                  <div key={room} className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                      <Home size={16} className="text-emerald-600 mr-2" />
                      {room}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {appliances.map((appliance, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-center p-3 bg-white border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <span className="font-medium text-gray-700">{appliance}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Energy tips */}
          <div className="p-6 md:p-8 bg-gradient-to-r from-emerald-50 to-blue-50">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Energy Tip</h3>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100">
              <p className="text-gray-700">
                <span className="font-medium text-emerald-600">Pro tip:</span> Based on your profile, you could save up to 15% by optimizing your AC's temperature settings. Try setting it to 24°C for optimal comfort and efficiency.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom navigation links */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigateTo("/leaderboard")}
            className="flex items-center text-purple-600 hover:text-purple-800"
          >
            <Award size={18} className="mr-1" />
            <span>View Community Leaderboard</span>
          </button>

          <div className="flex items-center gap-4">
            <a href="/advance-energy-settings" className="flex items-center text-gray-600 hover:text-emerald-600">
              <Settings size={18} className="mr-1" />
              <span>Advanced Energy Settings</span>
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

export default Profile;