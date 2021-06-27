import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

const ISidebar = () => {
  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader
          prefix={<i className="fa fa-bars fa-large"></i>}
        ></CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink
              exact
              to="/instructor/idashboard"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              exact
              to="/instructor/schedual"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="clock">Sessions</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/instructor/isessionreports"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="book">
                Session Reports
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/instructor/iprofile"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="user-edit">Profile</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          >
            Instructor Panel
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default ISidebar;
