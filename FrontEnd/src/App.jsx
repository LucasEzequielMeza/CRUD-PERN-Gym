import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import AboutPage from "./pages/AboutPage"
import ClassPage from "./pages/ClassPage"
import ExercisePage from "./pages/ExercisePage"
import RoutinePage from "./pages/RoutinePage"
import RoutineFormPage from "./pages/RoutineFormPage"
import ProfilePage from "./pages/ProfilePage"
import NotFoundPage from "./pages/NotFoundPage"
import {AuthProvider }from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="/clases" element={<ClassPage />} />
          
          <Route exact path="/ejercicios" element={<ExercisePage />} />
          <Route exact path="/rutinas" element={<RoutinePage />} />
          <Route exact path="/rutinas/nueva" element={<RoutineFormPage />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App