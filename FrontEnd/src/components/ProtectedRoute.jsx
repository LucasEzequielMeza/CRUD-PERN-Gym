import React from "react"
import { Outlet, Navigate } from "react-router-dom"

export const ProtectedRoute = ({redirectTo, isAllowed, children}) => {

    if (!isAllowed) {
        return <Navigate to={redirectTo} />
    }

    return children ? children : <Outlet/>
}
