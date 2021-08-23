import React from 'react'
import { Link } from "react-router-dom";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import logo from '../assets/icons/logo1.png'
import { isAuthenticated, signout } from 'src/Auth'
import CIcon from '@coreui/icons-react'
const TheHeaderDropdown = () => {

  const currentuser = isAuthenticated();
  console.log("Username Check=", currentuser.data.user.first_name);

  return (
    <div>
      <CDropdown
        inNav
        className="c-header-nav-items mx-2"
        direction="down"
      >
        <CDropdownToggle className="c-header-nav-link" caret={false}>

          <div className="c-avatar">
            <CImg
              style={ggg}
              src={logo}
              className="c-avatar-img"
              alt="admin@bootstrapmaster.com"
            />

          </div>
          <div style={ccc}>
            <span className="name"><b style={{color:'black'}}>{currentuser.data.user.first_name}</b></span>
          </div>
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end" >
          <CDropdownItem
            header
            tag="div"
            color="light"
            className="text-center"
          >
            <strong>Profile</strong>
          </CDropdownItem>
          {isAuthenticated() && isAuthenticated().data.user.designation === "SuperAdmin" && (
          <CDropdownItem>
            <Link style={{color:"black"}} to="/createuser">
            <CIcon name="cil-user-plus" className="mfe-2" />
            Add Employee
            </Link>
          </CDropdownItem>
          )}
          {isAuthenticated() && isAuthenticated().data.user.designation === 'worker' || 'SuperAdmin'  && (
          <CDropdownItem>
            <CIcon name="cil-contact" className="mfe-2" />
            Contact Details
          </CDropdownItem>
          )}
          {isAuthenticated() && isAuthenticated().data.user.designation === 'worker' || 'SuperAdmin' && (
          <CDropdownItem>
          <Link style={{color:"black"}} to="/Bankdetails">
            <CIcon name="cil-bank" className="mfe-2" />
            Bank Details
            </Link>
          </CDropdownItem>
          )}
          {isAuthenticated() && isAuthenticated().data.user.designation === 'worker' || 'SuperAdmin' && (
          <CDropdownItem>
            <Link style={{color:"black"}} to="/Scheduler">
            <CIcon name="cil-task" className="mfe-2" />
            Roaster
            </Link>
          </CDropdownItem>
          )}
          <CDropdownItem >
          <Link style={{color:"black"}} to="/Applyleave">
            <CIcon name="cil-envelope-open" className="mfe-2" />
            Leaves
            </Link>
          </CDropdownItem>
          <CDropdownItem onClick={() => {
            signout(() => {
              // window.location.href = '/Signin';
            })
          }}>
            <CIcon name="cil-chart-pie" className="mfe-2" />
            Signout
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </div>
  )
}

export default TheHeaderDropdown
const buttonaduj = {
  transform: "translate(50px, 0px)"
}
const ggg = {
  marginRight: "15px",
}
const ccc = {
  padding:"5px",
  backgroundColor: 'white',
  borderRadius:"5px"
}
