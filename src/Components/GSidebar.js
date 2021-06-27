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

const GSidebar = () => {
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
              to="/guardian/gdashboard"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              exact
              to="/guardian/gprogressreport"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="chart-line">
                Profile Progress Report
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/guardian/grequestservice"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="concierge-bell">
                Request Service
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/guardian/gsessionreport"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="book">
                View Session Report
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/guardian/gpayments"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="money-bill-wave">
                Payment History
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/guardian/gprofile"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="user">View Profile</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/guardian/gupdateprofile"
              activeClassName="activeClicked"
            >
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
            Guardian Panel
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default GSidebar;
