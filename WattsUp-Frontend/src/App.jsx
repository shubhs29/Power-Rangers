import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Leaderboard from "./components/Leaderboard";
import Tips from "./components/Tips";
import ForgotPassword from "./components/ForgotPassword";
import React, { useEffect, useState } from "react";
import SignUp from "./components/Signup";
import DetailedReports from "./components/DetailedReport";
import AdvanceEnergySettings from "./components/AdvanceEnergySettings";
import axios from "axios";
import { ToastContainer } from "react-toastify";

function App() {
  const [chartData, setChartData] = useState(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    axios
      .get("http://localhost:8000/charts")
      .then((res) => {
        setChartData(res.data);
        console.log(res.data, "This is the data!!");
      })
      .catch((err) => console.error("Error loading charts", err));
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          console.log("Current Location:", latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  console.log(chartData, "This is the chart data!!");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={<Dashboard chartData={chartData} />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/signup" element={<SignUp location={location} />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/tips" element={<Tips />} />
        <Route path="/detailed-report" element={<DetailedReports />} />
        <Route
          path="/advance-energy-settings"
          element={<AdvanceEnergySettings />}
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
