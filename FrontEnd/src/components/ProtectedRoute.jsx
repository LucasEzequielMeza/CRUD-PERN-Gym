import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ redirectTo = "/", allowedRoles }) {
    const { user, isAuth, loading } = useAuth();

    if (loading) return <div>Cargando...</div>;

    if (allowedRoles?.length && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

