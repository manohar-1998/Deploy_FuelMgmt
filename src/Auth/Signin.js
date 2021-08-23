import React, { useState } from "react";
import logo from "../assets/icons/Cyspace_logo.jpg";
import { Redirect } from "react-router-dom";
import { Button, Icon, Grid, Form, Header, Segment } from "semantic-ui-react";
import { signin, authenticate, isAuthenticated } from "./index.js";
import { useHistory } from "react-router";
const Signin = () => {
  const [values, setValues] = useState({
    first_name: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });
  const { first_name, password, error, didRedirect } = values;
  const history=useHistory();
  const  userdetails  = isAuthenticated();
  console.log("userdetails check=",userdetails);
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const onSubmit = (event) => {
    console.log("Submit button clicked...");
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    // API connection part here for your Sign in page...
    signin({ first_name, password })  
      .then((data) => {
        console.log("Error check=")
        if (data.error) {
          setValues({ ...values, error: data.data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
            console.log("In else condition of Sign in page", data);
          });
        }
      })
      .catch((error) =>
        setValues({
          ...values,
          error: (
            <div
              style={{
                width: "400px",
                // marginLeft: "255px",
                color: "red",
                // display:"flex",
                width: window.innerWidth<=800 ? ({marginLeft: "175px"}) : ({marginLeft: "255px"})
              }}
            >
              <h2>"Invalid Credentials"</h2>
            </div>
          ),
          loading: false,
        })
      );
  };
  if (didRedirect) {
    console.log("Didredirect check=",values)
    if (userdetails && userdetails.data.user.designation === "SuperAdmin") {
      console.log("Super Admin Part")
      return <Redirect to="/dashboard" />;
    } 
    else if (userdetails && userdetails.data.user.designation === "manager") {
      console.log("Manager Part")
      return <Redirect to="/dashboard" />;
    } 
    else if (userdetails && userdetails.data.user.designation === "worker") {
      console.log("Worker Part")
      return <Redirect to="/dashboard" />;
    }
    else {
      console.log("Check in Worker ")
      setValues({ error: "UnAuthorized User Not Admin, Access Denied" });
    }
  }
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-center">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
  const signInForm = () => {
    return (
      <div className="row" style={{ marginTop: "30px" }}>
        <div className="col-md-4 offset-sm-4 text-center">
          <container
            style={{ marginTop: "4em", marginBottom: "2em" }}
            textAlign="center"
          >
            <img width="320" height="300" paddingTop="10px" src={logo} alt="logo" />
          </container>
          <Grid
            textAlign="center"
            marginbottom="150px"
            style={{ height: "40vh" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450, marginTop:"10px" }}>
              <Header as="h2" color="blue">
                Login to Account
              </Header>
              <Form size="large">
                <Segment stacked>
                  <Form.Field>
                    <label align="left">
                      <Icon name="envelope" />
                      First Name
                    </label>
                    <input
                      onChange={handleChange("first_name")}
                      value={first_name}
                      className="form-control"
                      placeholder="First Name"
                      type="text"
                    />
                  </Form.Field>
                  <Form.Field>
                    <label align="left">
                      <Icon name="lock" />
                      Password{" "}
                    </label>
                    <input
                      onChange={handleChange("password")}
                      value={password}
                      Icon="user"
                      placeholder="Password"
                      className="form-control"
                      type="password"
                    />
                  </Form.Field>
                  <Button color="teal" fluid size="large" onClick={onSubmit}>
                    Submit
                  </Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  };
  return (
    <>
      {errorMessage()}
      {signInForm()}
    </>
  );
};
export default Signin;
