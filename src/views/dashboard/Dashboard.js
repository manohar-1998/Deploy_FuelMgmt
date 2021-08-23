import React from "react";
import {
  CImg
} from '@coreui/react'
import pht from "../../assets/icons/gasStation.png";
export const MyContext = React.createContext();
export const MyProvider = () => {
}
function exampleReducer(state, action) {
  switch (action.type) {
    case "close":
      return { open: false };
    case "open":
      return { open: true, size: action.size };
    default:
      throw new Error("Unsupported action...");
  }
}
const Dashboard = () => {
  const [attendance_state, setattendance_state] = React.useState(1);
  function attend(data){
setattendance_state(data)
  }
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;

  return (
    // <div>
          <CImg style={imgstyle}
            src={pht}
          />
          // {/* </div> */}
  );
};

export default Dashboard;
const imgstyle = {
width: "100%",
height:'610px',
// backgroundColor:'black'
};
