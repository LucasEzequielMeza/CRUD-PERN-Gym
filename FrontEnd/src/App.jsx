import React from 'react';
import { Routes, Route, Outlet } from "react-router-dom";
import { useAuth } from './context/AuthContext';

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import ClassPage from "./pages/ClassPage";
import ExercisePage from "./pages/ExercisePage";
import RoutinePage from "./pages/RoutinePage";
import RoutineFormPage from "./pages/RoutineFormPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import NavBar from './components/NavBar/NavBar';
import Container from './components/UI/Container';
import { ProtectedRoute } from './components/ProtectedRoute';
import { RoutineProvider } from './context/RoutineContext';

function App() {

  const {isAuth} = useAuth()

  return (
    <>
      <NavBar />
        <Container className='py-5'>
          <Routes>
            <Route element={<ProtectedRoute isAllowed={!isAuth} redirectTo={"/rutinas"}/>}>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/register" element={<RegisterPage />} />
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/about" element={<AboutPage />} />
            </Route>

            <Route element={<ProtectedRoute isAllowed={isAuth} redirectTo={"/login"}/>}>
              <Route exact path="/clases" element={<ClassPage />} />
              <Route exact path="/ejercicios" element={<ExercisePage />} />

              <Route element={<RoutineProvider>
                <Outlet/>
              </RoutineProvider>}>
                <Route exact path="/rutinas" element={<RoutinePage />} />
                <Route exact path="/rutinas/nueva" element={<RoutineFormPage />} />
                <Route exact path="/rutinas/1/edit" element={<RoutineFormPage />} />
              </Route>

              <Route exact path="/profile" element={<ProfilePage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Container>
    </>
  );
}

export default App;
