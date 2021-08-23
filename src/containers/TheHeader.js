import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CImg
} from "@coreui/react";
import logo from "../assets/icons/logo1.png"

import {
  TheHeaderDropdown,
} from "./index";
import { isAuthenticated } from "src/Auth"; 

const TheHeader = ({ history }) => {

  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  return (
    <CHeader style={aaa} withSubheader>
      <CToggler
        // style={togglercolor}
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        style={togglercolor}
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/dashboard">
        {/* <CIcon color='grey' name="logo" height="48" alt="Logo" /> */}
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <div>
          <div className="nav-item">
            <CImg
              style={ggg}
              src={logo}
              className="c-avatar-img"
              alt="admin@bootstrapmaster.com"
            />
            <span style={innersty} className="link-text"><b>GAS STATION</b></span>
          </div>
        </div>

        <div className="nav-item">
          <Link style={{ color: "white" }} to="/dashboard" className="nav-link">
            <span className="link-text" ><p><b>Home</b></p></span>
          </Link>
        </div>

        {isAuthenticated() && isAuthenticated().data.user.designation === 'worker' || 'SuperAdmin' && (
          <div class="ui simple dropdown item">
            <Link style={{ color: "white" }}><span class="text"><b>Invoices</b></span></Link>
            <div class="menu">
              <div class="item">
                <Link to="/Create_invoice" >
                  <span><p style={{ color: 'black' }}><b>New Invoice</b></p></span>
                </Link>
              </div>
              <div class="item">
                <Link to="/Delivery_Docket_Entry">
                  <span><p style={{ color: 'black' }}><b>Delivery Docket</b></p></span>
                </Link>

              </div>
            </div>
          </div>
        )}
        {isAuthenticated() && isAuthenticated().data.user.designation === 'manager' && (
          <div className="nav-item">
            <Link style={{ color: "white" }} to="/daysheetpage" className="nav-link">
              <span className="link-text"><b>Day Sheet</b></span>
            </Link>
          </div>
         )}
                 {/* {isAuthenticated() && isAuthenticated().data.user.designation === 'SuperAdmin' && (
          <div className="nav-item">
            <Link style={{ color: "white" }} to="/daysheetpage" className="nav-link">
              <span className="link-text"><b>Day Sheet</b></span>
            </Link>
          </div>
         )} */}
        {isAuthenticated() && isAuthenticated().data.user.designation === "worker" && (
          <div className="nav-item">
            <Link style={{ color: "white" }} to="/Workersheet" className="nav-link">
              <span className="link-text"><b>Worker Sheet</b></span>
            </Link>
          </div>
        )}
        <div className="nav-item">
          <Link to="/Maintenance" style={{ color: "white" }} className="nav-link"><span className="link-text"><b>Repair Maintenance</b></span></Link>
        </div>
        <div className="nav-item">
          <Link style={{ color: "white" }} to="/Incidents_page" className="nav-link">
            <span className="link-text"><b>Incidents</b></span>
          </Link>
        </div>
        <div class="nav-item">
          <Link to="/Driveoff_page" style={{ color: "white" }}>
            <span class="text"><b>Drive Offs</b></span>
          </Link>
        </div>
        <div>
        </div>
        <div style={{ marginLeft: '10px' }} >
          <Link to="/Inability" style={{ color: "white" }}>
            <span class="text"><b>Inability</b></span>
          </Link>
        </div>
        <div>
        </div>
        <div>
        </div>
      </CHeaderNav>
      <CHeaderNav className="px-3">
        <TheHeaderDropdown />
      </CHeaderNav>
    </CHeader>
  );
};

export default TheHeader;
const icon = {
  height: "2rem",
  width: "2rem",
};
const aaa = {
  backgroundColor: 'black'
}
const togglercolor = {
  marginTop: '13px',
  height: '30px',
  // width: '0px',
  backgroundColor: 'white'
}
const ggg = {
  height: '40px',
  width: '40px',
  marginLeft: '30px'
}
const innersty = {
  paddingTop: '10px',
  paddingBottom: '10px',
  margin: '5px',
  color: 'white',
  marginLeft: '10px'
}
const addformstyle = {
  display: "flex",
  marginTop: window.innerWidth <= 800 ? "150px" : "70px",
  marginLeft: window.innerWidth <= 800 ? "10px" : "600px",
  height: "635px",
  width: window.innerWidth <= 800 ? "400px" : "543px",
  paddingBottom: "20px"
};
const addform_docketstyle = {
  display: "flex",
  marginTop: window.innerWidth <= 800 ? "150px" : "160px",
  marginLeft: window.innerWidth <= 800 ? "10px" : "600px",
  height: "430px",
  width: window.innerWidth <= 800 ? "400px" : "543px",
}
const rightbar = {
  margin: '10px'
}
const userbtn = {
  marginLeft: "300px"
}