import React from 'react';
import { Routes, Route, Outlet } from "react-router-dom";
import { useAuth } from './context/AuthContext';

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
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
import { ClassProvider } from './context/ClassContext';
import ClassFormPage from './pages/ClassFormPage';
import ExerciseFormPage from './pages/ExerciseFormPage';
import { ExerciseProvider } from './context/ExerciseContext';
import ClientsPage from './pages/ClientsPage';

function App() {

  const { isAuth, loading } = useAuth();

  return (
    <>
      <NavBar />
      <Container className='py-5'>
        <Routes>
          {/* Rutas públicas */}
          <Route element={<ProtectedRoute isAllowed={!isAuth} redirectTo={"/rutinas"} />}>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/register" element={<RegisterPage />} />
            <Route exact path="/login" element={<LoginPage />} />
          </Route>

          {/* Rutas para admin */}
          <Route element={<ProtectedRoute isAllowed={isAuth} allowedRoles={["admin"]} redirectTo={"/login"} />}>
            <Route exact path="/clients" element={<ClientsPage />} />

            <Route element={<ClassProvider><Outlet /></ClassProvider>}>
              <Route exact path="/clases/nueva" element={<ClassFormPage />} />
              <Route exact path="/clases/:id/edit" element={<ClassFormPage />} />
            </Route>

            <Route element={<ExerciseProvider><Outlet /></ExerciseProvider>}>
              <Route exact path="/ejercicios/nuevo" element={<ExerciseFormPage />} />
              <Route exact path="/ejercicios/:id/edit" element={<ExerciseFormPage />} />
            </Route>
          </Route>

          {/* Rutas para clientes */}
          <Route element={<ProtectedRoute isAllowed={isAuth} allowedRoles={["client"]} redirectTo={"/login"} />}>
            <Route element={<RoutineProvider><Outlet /></RoutineProvider>}>
              <Route exact path="/rutinas" element={<RoutinePage />} />
              <Route exact path="/rutinas/nueva" element={<RoutineFormPage />} />
              <Route exact path='/rutinas/:id/edit' element={<RoutineFormPage />} />
            </Route>
          </Route>

          {/* Rutas compartidas entre admin y cliente */}
          <Route element={<ProtectedRoute isAllowed={isAuth} allowedRoles={["admin", "client"]} redirectTo={"/login"} />}>
            <Route element={<ClassProvider><Outlet /></ClassProvider>}>
              <Route exact path="/clases" element={<ClassPage />} />
            </Route>

            <Route element={<ExerciseProvider><Outlet /></ExerciseProvider>}>
              <Route exact path="/ejercicios" element={<ExercisePage />} />
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
