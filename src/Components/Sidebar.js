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

const Sidebar = () => {
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
            <p
              style={{
                marginLeft: 10,
                marginRight: 10,
                borderStyle: "inset",
                borderColor: "gray",
              }}
            >
              Home
            </p>
            <NavLink exact to="/dashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <p
              style={{
                marginLeft: 10,
                marginRight: 10,
                borderStyle: "inset",
                borderColor: "gray",
              }}
            >
              Cases
            </p>
            <NavLink exact to="/managestudents" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="child">
                Case / Child's Detail
              </CDBSidebarMenuItem>
            </NavLink>
            <p
              style={{
                marginLeft: 10,
                marginRight: 10,
                borderStyle: "inset",
                borderColor: "gray",
              }}
            >
              Services
            </p>
            <NavLink exact to="/manageservices" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="briefcase">
                Manage Services
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/managerequests" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="book-open">
                Requested Services
              </CDBSidebarMenuItem>
            </NavLink>
            <p
              style={{
                marginLeft: 10,
                marginRight: 10,
                borderStyle: "inset",
                borderColor: "gray",
              }}
            >
              Reports
            </p>
            <NavLink
              exact
              to="/manage_progressreports"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="chart-line">
                Manage Progress Reports
              </CDBSidebarMenuItem>
            </NavLink>
            <p
              style={{
                marginLeft: 10,
                marginRight: 10,
                borderStyle: "inset",
                borderColor: "gray",
              }}
            >
              Instructor
            </p>
            <NavLink
              exact
              to="/manageinstructors"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="user">
                Instructor's Detail
              </CDBSidebarMenuItem>
            </NavLink>
            <p
              style={{
                marginLeft: 10,
                marginRight: 10,
                borderStyle: "inset",
                borderColor: "gray",
              }}
            >
              Admin
            </p>
            <NavLink exact to="/manage_admins" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="at">Add Admin</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/updateprofile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user-edit">
                Update Profile
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          >
            Admin Panel
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
