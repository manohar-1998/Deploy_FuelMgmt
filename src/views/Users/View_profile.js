import React, { useEffect, useState } from "react";
import Default from "../../assets/icons/Cyspace_logo.jpg";
import { deleteUserByID, getUserByID, getusers } from "src/Apicalls";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { isAuthenticated } from "src/Auth";
var assigntoname;
const View_profile = (props) => {

  const photoUrl = Default;
  const [user, setUser] = useState([]);
  const [values, seValues] = useState([])
  const id = props.match.params.id;
  const preload = (id) => {
    getUserByID(id).then((data) => {
      setUser(data.data);
    });

    getusers().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        seValues(data.data);
        // setLoading(false);
      }
    });
  };
  console.log("User Data check=", values)
  useEffect(() => {
    preload(id);
  }, []);

  assigntoname = values.filter((ur) => id === ur.assignto);
  console.log("Userzzzzzzzzzz=", assigntoname)
  const history = useHistory();
  const deleteuserbtn = (id) => {
    console.log("Delete user id check=", id);
    let answer = window.confirm("Confirm ok to Delete User ");
    if (answer) {
      deleteUserByID(id).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          history.push("/Userslist");
          return preload();
        }
      }
      )
    };
  }


  return (
    <div className="profile-container">
      <div className="container-fluid">
        <table class="table table-hover table-bordered">
          <tr align="center">
            <h2>
              {" "}
              {user.first_name}'s Profile
            </h2>{" "}
          </tr>
          <hr />
          <div className="profile-second-container row">
            <div className=" col-sm-3">
              <img
                style={{ height: "200px", width: "200px" }}
                className="img-thumbnail"
                src={photoUrl}
                onError={(i) => {
                  i.target.src = `${Default}`;
                }}
                alt={user.first_name}
              />
            </div>
            <div className="col-md-4">
              <div style={{ backgroundColor: "Grey", textAlign: "center" }}>
                <h2>Personal Details</h2>
              </div>{" "}
              <hr />
              <div className="lead">
                <p>
                  <b>Name : </b>
                  <span style={{ fontWeight: "bold" }}>
                    {user.first_name}
                  </span>{" "}
                </p>
                <p>
                  <b>Designation : </b> {user.designation}
                </p>
                <p className="lead">Email : {user.email}</p>
                <p className="lead">Site : {user.site}</p>
                <p className="lead">DOB : {user.Date_of_birth}</p>
                <p className="lead">Address : {user.Address}</p>
              </div>
              <hr />
            </div>
            {user.designation === "manager" && (
            <div className="col-md-4">
              <div className="col-md-12">
                <div style={{ backgroundColor: "Grey", textAlign: "center" }}>
                  <h2>Workers List</h2>
                </div>{" "}
                <hr />
                {assigntoname.length >= 1 ? (
                  <>

                    {assigntoname.map((aa) => {
                      return (
                        <p> Name : {aa.first_name}</p>
                        
                      )
                    })}
                  </>
                )
                  : (
                    "No Workers Assigned Yet..."
                  )}
                <hr />
              </div>
            </div>
            )}
                        {user.designation === "worker" && (
            <div className="col-md-4">
              <div className="col-md-12">
                <div style={{ backgroundColor: "Grey", textAlign: "center" }}>
                  <h2>Emergency Details</h2>
                </div>{" "}
                <hr />
                <p className="lead">Name : {user.emergency_first_name}</p>
                <p className="lead">Phone Number : {user.phone_number}</p>
                <hr />
              </div>
            </div>
            )}
          </div>
          <hr />
          <div align='center'>
            <button>
              <Link color='black' to={`/Edituser/${user.id}`}>Edit
              </Link>
            </button>&nbsp;
            {isAuthenticated() && isAuthenticated().data.user.designation === "SuperAdmin" && (
              <button marginLeft='200px'
                onClick={() => { deleteuserbtn(user.id) }}
              >Delete</button>
            )}
          </div>
          <hr />
        </table>
      </div>
    </div>
  );
};

export default View_profile;
