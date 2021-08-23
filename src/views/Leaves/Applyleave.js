import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
// import { Form, Input, Button, Select, Switch, Tooltip, DatePicker } from 'antd';
import { Button, Form, Segment } from "semantic-ui-react";
import { isAuthenticated } from "../../Auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { getusers, leaveform } from "src/Apicalls";
toast.configure();

function Applyleave() {
  const notify = () => {
    toast.success(<h3>Leave Submitted Successfully</h3>, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };

  const [errors, setErrors] = useState({
    nameErr: "Title is Required",
    requestedByErr: "Requested by is Needed",
    deadlineErr: "Deadline is Required",
    phaseErr: "Category is Required",
    descriptionErr: "Description is Required",
    leaveTypeErr: "Please Enter Leave Type",
  });
  const [values, setValues] = useState({
    name: "",
    requestedBy: "",
    date: "",
    enddate:"",
    phase: "",
    categories: [],
    description: "",
    createdTask: "",
    leaveType: "",
    formData: new FormData(),
  });
  const [data, setData] = useState({
    loading: false,
    error: "",
    getaRedirect: false,
  });
  const {
    nameErr,
    requestedByErr,
    descriptionErr,
    leaveTypeErr,
  } = errors;

  const {
    name,
    requestedBy,
    date,
    enddate,
    leaveType,
    categories,
    description,
    formData,
  } = values;
  
  const { user, token } = isAuthenticated();
  const history = useHistory();

  const Addtaskbtn = (event) => {
    console.log("Submit button clicked...");
    event.preventDefault();
    // if (isValid()) {
    //   console.log("Inside isvalid function check");
    //   setValues({ ...values, error: "", loading: true });
    //   setErrors({ ...errors, nameErr: data.error });
    //   console.log("At set Values of Creation part", values);
    //   leaveform(values).then((data) => {
    //     console.log("User ID check=", user.id);
    //     if (data.error) {
    //       setValues({ ...values, error: data.error });
    //     } else {
    //       console.log("Setting Values in else part=");
    //       setValues({
    //         ...values,
    //         name: "",
    //         userId: "",
    //         date: "",
    //         enddate: "",
    //         description: "",
    //         leaveType: "",
    //         createdTask: data.name,
    //       });
    //       setData({ ...data, loading: false, getaRedirect: true });
    //       notify();
    //       console.log("After Toast method");
    //     }
    //     history.push("/Getleave_demo");
    //   });
    // }
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    formData.set(name, value);
    console.log("FormData values=", formData);
    console.log("valuevaluevalue->", value);
    setValues({ ...values, [name]: value });
    console.log("In handelChange function = ", value);
  }; 

  const preload = () => {
    console.log("Inside preload function");
    // getusers().then((data) => {

    //   var newArrayDataOfOjbect = Object.values(data.data);
    //   console.log("Getting Users", newArrayDataOfOjbect);
    //   if (data.error) {
    //     console.log(" if Condition Error Data", data.error);
    //     setValues({ ...values, error: data.error });
    //   } else {
    //     setValues(
    //       {
    //         ...values,
    //         categories: newArrayDataOfOjbect,
    //         formData: new FormData(),
    //       },
    //       () => {
    //         console.log("Else condition In SetValues=", categories);
    //         console.log("Checking Formdata Values=", formData);
    //         console.log("Values Check =>", values);
    //       }
    //     );
    //   }
    // });
  };
  useEffect(() => {
    preload();
  }, []);

  const { getaRedirect } = data;
  const isValid = () => {
    if (
      !name.length > 0 &&
      !requestedBy > 0 &&
      !description > 0 &&
      !leaveType > 0
    ) {
      toast.error("All Fields Are Mandatory", {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    } else if (!name.length > 0) {
      toast.error(nameErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    } else if (!requestedBy.length > 0) {
      toast.error(requestedByErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    } 
    else if (!description.length > 0) {
      toast.error(descriptionErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    } else if (!leaveType.length > 0) {
      toast.error(leaveTypeErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    return true;
  };

  function Taskcancel() {
    history.push("/Getleave_demo");
  }
  return (
    <Segment style={look}>
      <Form>
        <header style={headerstyle}>
          <b>Leave Form</b>
        </header>
        {/* <Form.Group style={{ paddingTop: "30px" }} widths={2}>
          <Form.Input
            label="Title"
            value={name}
            placeholder="Title"
            onChange={handleChange("name")}
          />
        </Form.Group> */}
        <Form.Group widths={2}>
          <Form.Input
            label="Start Date"
            type="date"
            onChange={handleChange("date")}
          />
          <Form.Input
            label="End Date"
            type="date"
            onChange={handleChange("enddate")}
          />
        </Form.Group>
        <div style={{paddingBottom:'10px'}}><b>Contact Details when Away</b></div>
        <Form.Group style={{ paddingTop: "5px" }} widths={2}>
          <Form.Input
            label="First Name"
            // value={username}
            placeholder="First Name"
            // onChange={handleChange("username")}
          />
          <Form.Input
            label="Last Name"
            // value={username}
            placeholder="Last Name"
            // onChange={handleChange("username")}
          />

        </Form.Group>
        <Form.Input
            label="Phone Number"
            // value={username}
            placeholder="Phone Number"
            // onChange={handleChange("username")}
          />
        <Form.TextArea
          label="Leave Description"
          placeholder="Description"
          value={description}
          onChange={handleChange("description")}
        />
        <div style={{ textAlign: "center", paddingTop: "30px" }}>
          <Button color="green" onClick={Addtaskbtn}>
            Submit Leave
          </Button>
          <Button color="black" onClick={Taskcancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </Segment>
  );
}

export default Applyleave;
const headerstyle = {
  textAlign: "center",
  color: "grey",
  fontSize: "24px",
  paddingBottom: "20px",
};
const look={
    marginTop:'40px',
    width: '500px',
    marginLeft: "350px",
    overflow: 'auto',
    maxHeight: '560px'
}