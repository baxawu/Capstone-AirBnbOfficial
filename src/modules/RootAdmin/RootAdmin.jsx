import React from 'react'
import { Outlet } from 'react-router-dom';

import SideBar from '../../components/SideBar';
import "./rootAdmin.scss";

const RootAdmin = () => {
  return (
    <div className="admin">
      <div className="admin__content">
        <SideBar />
        <Outlet />
      </div>
    </div>
  )
}

export default RootAdmin