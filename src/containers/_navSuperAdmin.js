import React from "react";
import CIcon from "@coreui/icons-react";

const _navSuperAdmin = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Employees",
    to: "/Userslist",
    icon: <CIcon name="cil-user" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Search",
    icon: <CIcon name="cil-search" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Invoice List",
    to: "/InvoicelistforSAdmin",
    icon: <CIcon name="cil-hand-point-right" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Docket List",
    to: "/Docketsearch",
    icon: <CIcon name="cil-hand-point-right" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "DaySheet List",
    to: "/DaySheetList",
    icon: <CIcon name="cil-hand-point-right" customClasses="c-sidebar-nav-icon" />,
  },

  {
    _tag: "CSidebarNavItem",
    name: "Maintenance List",
    to: "/MaintanencesearchSA",
    icon: <CIcon name="cil-hand-point-right" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Incident List",
    to: "/IncidentsearchForSA",
    icon: <CIcon name="cil-hand-point-right" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Driveoff List",
    to: "/DriveofflistSA",
    icon: <CIcon name="cil-hand-point-right" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Inability List",
    to: "/InabilitysearchSA",
    icon: <CIcon name="cil-hand-point-right" customClasses="c-sidebar-nav-icon" />,
  },
];




export default _navSuperAdmin;
