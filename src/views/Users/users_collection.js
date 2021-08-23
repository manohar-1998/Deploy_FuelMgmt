import React, { useEffect, useState } from "react";
import Default from "../../assets/icons/Cyspace_logo.jpg";
import { Link } from "react-router-dom";
import { getusers } from "src/Apicalls";
var assigntoname;
const UserCollection = props => {
  const [users, setUsers] = useState([]);
  const user = props.user;
  console.log("User details Check=", user)
  const i = props.i;


  const preload = () => {
    getusers().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(
          "Inside else console for getting users details =",
          data.data
        );
        setUsers(data.data);
        // setLoading(false);
      }
    });
  };
  assigntoname = users.filter((ur) => ur._id === user.assignto);
  console.log("Users list=", assigntoname)
  useEffect(() => {
    preload();
  }, []);


  return (
    <>
      <div key={i} className="col-md-4">
        <div className="card">
          <div className="avatar mx-auto">
            {/* Above line for making image center of the card */}
            <img
              alt="avatar"
              style={{ height: "128px" }}
              src={Default}  // Default cyspace image allotted for all..
              onError={i => {
                i.target.src = `${Default}`;
              }}
              className="rounded-circle"
            />
          </div>
          <div className="card-body">
            <h4>
              {user.first_name}
            </h4>
            <hr />
            <div >
              <p>Role: {user.designation}</p>
              {assigntoname.map((aa) => {
                return (
                  <p>Assign To: {aa.first_name}</p>
                )
              })}

              <p>Site: {user.site}</p>
            </div>
            <p style={{marginTop:'8px'}}><Link to={`View_profile/${user._id}`}>View Profile</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCollection;
const aaa = {
  width: '200px',
  margin: '0 auto',
  display: 'inline'
}
const bb = {
  width: '200px',
  margin: '0 auto',
  display: 'inline',
  marginLeft: '25px'
}