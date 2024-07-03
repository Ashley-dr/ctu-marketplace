/* eslint-disable no-unused-vars */
import React from "react";
import {
  AppShell,
  Sidebar,
  SidebarSection,
  SidebarToggleButton,
  NavItem,
} from "@saas-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiHome, FiUsers, FiSettings } from "react-icons/fi";
function SideNavigation() {
  return (
    <div>
      {" "}
      <AppShell
        sidebar={
          <Sidebar
            className="mx-5 mt-5"
            variant="compact"
            width="120px"
            toggleBreakpoint="sm"
          >
            <SidebarSection>
              <NavItem icon={<FiUsers size="1.2em" />} size="md">
                <Link to="/AccountsToBeSeller">Accounts to be seller</Link>
              </NavItem>
              <NavItem icon={<FiSettings size="1.2em" />} size="md">
                Settings
              </NavItem>
            </SidebarSection>
          </Sidebar>
        }
      ></AppShell>
    </div>
  );
}

export default SideNavigation;
