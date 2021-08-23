import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button, Form, Segment, Divider } from "semantic-ui-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createuser } from "src/Apicalls";
import { isAuthenticated } from "src/Auth";
toast.configure();

function Bankdetails() {
    const notify = () => {
        toast.success(<h3>New User Created Successfully</h3>, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        });
    };
    const [errors, setErrors] = useState({
        usernameErr: "Username Required",
        categoryErr: "Designation is Required",
        passwordErr: "Password is Required",
        password2Err: "Confirm Password is Required",
        mismatchErr: "Passwords Mismatch"
    });
    const {
        usernameErr,
        // emailErr,
        categoryErr,
        passwordErr,
        password2Err,
        mismatchErr
    } = errors;
    const { user, token } = isAuthenticated();
    const history = useHistory();
    const [values, setValues] = useState({
        username: "",
        password: "",
        password2: "",
        designation: "",
    });

    const { username, password, password2, designation } = values;
    const [data, setData] = useState({
        loading: false,
        error: "",
        getaRedirect: false,
    });
    const handleChange = (name) => (event) => {
        const value = event.target.value;
        console.log("valuevaluevalue->", value);
        setValues({ ...values, [name]: value });
        console.log("In handelChange function = ", values);
    };

    const Adduserbtn = (event) => {
        console.log("Submit button clicked...");
        event.preventDefault();
        if (isValid()) {
            setValues({ ...values, error: "", loading: true });
            setErrors({ ...errors, nameErr: data.error });
            console.log("At set Values of Creation part", values);
            createuser(values).then((data) => {
                console.log("Inside createuser POsting method = ", values);
                // console.log("User ID check=", user.id);
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    console.log("Setting Values in else part=");
                    setValues({
                        ...values,
                        username: data.username,
                        password: data.password,
                        password2: data.password2,
                        designation: data.designation,
                    });
                    setData({ ...data, loading: false, getaRedirect: true });
                    notify();
                    console.log("After Toast method");
                }
                history.push("/dashboard");
            }
            );
        }
    };

    const isValid = () => {
        if (
            !username.length > 0 &&
            !designation > 0 &&
            !password > 0 &&
            !password2 > 0
        ) {
            toast.error("All Fields Are Mandatory", {
                position: toast.POSITION.TOP_CENTER,
            });
            return false;
        } else if (!username.length > 0) {
            toast.error(usernameErr, { position: toast.POSITION.TOP_RIGHT });
            return false;
        }
        // else if (!email.length > 0) {
        //   toast.error(emailErr, { position: toast.POSITION.TOP_RIGHT });
        //   return false;
        // }
        else if (!designation.length > 0) {
            toast.error(categoryErr, { position: toast.POSITION.TOP_RIGHT });
            return false;
        } else if (!password.length > 0) {
            toast.error(passwordErr, { position: toast.POSITION.TOP_RIGHT });
            return false;
        } else if (!password2.length > 0) {
            toast.error(password2Err, { position: toast.POSITION.TOP_RIGHT });
            return false;
        } else if (password != password2) {
            toast.error(mismatchErr, { position: toast.POSITION.TOP_RIGHT });
            return false;
        }
        return true;
    };

    function Cancel() {
        history.push("/dashboard");
    }
    return (
        <Segment style={pagestyle1}>
            <Form style={pagestyle}>
                <header style={headerstyle}>
                    <b>Bank Details</b>
                </header>
                <Divider />
                <Form.Group style={{ paddingTop: "5px" }} widths={2}>
                    <Form.Input
                        label="Bank Name"
                        // value={username}
                        placeholder="First Name"
                    // onChange={handleChange("username")}
                    />
                    <Form.Input
                        label="Account Name"
                        // value={username}
                        placeholder="Account Name"
                    // onChange={handleChange("username")}
                    />

                </Form.Group>
                <Form.Group widths={2}>
                    <Form.Input
                        label="BSB"
                        type="text"
                        placeholder="xxx - xxx"
                    // value={Date}
                    // onChange={handleChange("Date")}
                    />
                    <Form.Input
                        label="Account Number"
                        type="number"
                    // value={Date}
                    // onChange={handleChange("Date")}
                    />
                </Form.Group>
                <Form.Group widths={2}>
                    <Form.Input
                        label="Super"
                        // value={password}
                        type="text"
                    // placeholder="xyz@example.com"
                    // onChange={handleChange("password")}
                    />
                    <Form.Input
                        label="Fund Name"
                        // value={password}
                        type="text"
                    // placeholder="xyz@example.com"
                    // onChange={handleChange("password")}
                    />
                </Form.Group>
                <Form.Group widths={2}>
                    <Form.Input
                        label="Fund ID"
                        // value={password}
                        type="text"
                    // placeholder="Password"
                    // onChange={handleChange("password")}
                    />
                    <Form.Input
                        label="Fund USI"
                        // value={password2}
                        type="text"
                    // placeholder="Confirm Password"
                    // onChange={handleChange("password2")}
                    />
                </Form.Group>
                <div style={{ textAlign: "center", paddingTop: "10px" }}>
                    <Button color="green" onClick={Adduserbtn}>
                        Create
                    </Button>
                    <Button color="black" onClick={Cancel}>
                        Cancel
                    </Button>
                </div>
            </Form>
        </Segment>
    );
}

export default Bankdetails;
const headerstyle = {
    textAlign: "center",
    color: "grey",
    fontSize: "24px",
    paddingTop: "10px",
};
const pagestyle1 = {
    // height: '560px',
    marginTop:'60px',
    width: '500px',
    marginLeft: "350px",
    overflow: 'auto',
    maxHeight: '560px'
}
const pagestyle = {
    // marginLeft: '350px',
    // overflowY: window.innerWidth <= 800 ? "scroll" : "null",
    // overflowX: window.innerWidth <= 800 ? "scroll" : "null",
    // width: window.innerWidth <= 800 ? "380px" : "500px",
}