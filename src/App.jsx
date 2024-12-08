import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Dashboard from "./pages/Dashboard";
import RsvpConfrimationPage from "./pages/RsvpConfrimationPage";
import AdminPage from "./pages/AdminPage";
import CreateEventPage from "./pages/CreateEventPage";
import UserEventsPage from "./pages/UserEventsPage";
import CalendarPage from "./pages/CalendarPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
const App = () => {
  return (
    <>
    

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Authentication pages */}
          <Route path="" element={<AuthPage />} >
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
          </Route>

          <Route path="/home" element={<Dashboard />} />
          <Route path="/rsvpconfirm" element={<RsvpConfrimationPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/createevent" element={<CreateEventPage />} />
          <Route path="/myevents" element={<UserEventsPage />} />
          <Route path="/forgotpassword" element={<ForgetPasswordPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer position="top-right"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      


    </>
  );
};

export default App;
