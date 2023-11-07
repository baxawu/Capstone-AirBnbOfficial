import React from 'react'
import { useUserContext } from '../../contexts/UserContext/UserContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
export default function ProtectedRoute({children}) {
    const { currentUser } = useUserContext();
    const location = useLocation();
    if (!currentUser) {
        //user chưa đăng nhặp => redirect về trang login
        const url =`/sign-in?redirect=${location.pathname}`
        return <Navigate to={url} replace />;
      }
    
      if (currentUser.content !== "QuanTri") {
        return <Navigate to="/404"/>
      }
      return children || <Outlet />;
  
}
