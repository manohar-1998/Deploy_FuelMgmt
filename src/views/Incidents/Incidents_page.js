import React, { useState } from 'react';
import { Button, Form, Segment, Divider } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router";
import { addincidents } from 'src/Apicalls';
import { isAuthenticated } from 'src/Auth';
function Incidents_page() {
    const currentuser = isAuthenticated();
    const uid = currentuser.data.user.userid;
    const notify = () => {
        toast.success(<h3>Incident Noted Successfully</h3>, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        });
    };
    const [incident, setIncident] = useState({
              userid:uid,
              RegNo: "",
              Date: "",
              EventNo: "",
              ConstableId: "",
              Status: "",
              Description: "",
    });

    const { RegNo, Date, EventNo, Status, ConstableId, Description } = incident;
    const { register } = useForm;

    const handleChange = (name) => (event) => {
        const value = event.target.value;
        console.log("valuevaluevalue->", value);
        setIncident({ ...incident, [name]: value });
        console.log("In handelChange function = ", incident);
    };

    const createfunction = (event) => {
        console.log("Submit button clicked...");
        event.preventDefault();
        addincidents(incident).then((data) => {
            console.log("Maintain Data check=",incident);
            if (data.error) {
                setIncident({ ...incident, error: data.error });
            } else {
                console.log("Setting Values in else part=");
                setIncident({
                    ...incident,
                    userid:uid,
                    RegNo: data.RegNo,
                    Date: data.Date,
                    EventNo: data.EventNo,
                    Status: data.Status,
                    Description: data.Description,
                });
                notify();
                console.log("After Toast method");
            }
            {isAuthenticated() && isAuthenticated().data.user.designation === 'SuperAdmin' && (
                history.push("/IncidentsearchForSA")
                )}
                {isAuthenticated() && isAuthenticated().data.user.designation === 'manager' && (
                    history.push("/Incidentsearchmanager")
                    )}
        });
    };

    const confirmbtn = () => {
        let answer = window.confirm("Confirm ok to Create Sheet");
    }
    const history=useHistory();
    function invoiceclose() {
        history.push("/dashboard")
    }

    return (
        <div>
        <Segment style={ddd}>
            <Form style={formstyle}>
                <header style={headerstyle}>
                    <b>Incidents Page</b>
                </header>
                <Divider/>
                <Form.Group style={{ paddingTop: "10px" }} widths={2}>
                <Form.Input
                        label="Date"
                        type="date"
                        value={Date}
                        onChange={handleChange("Date")}
                    />
                    <Form.Input
                        label='Reg No'
                        type="text"
                        value={RegNo}
                        onChange={handleChange("RegNo")}
                    />
                </Form.Group>
                <Form.Group widths={2}>
                <Form.Input
                        label='Event No'
                        type="text"
                        value={EventNo}
                        onChange={handleChange("EventNo")}
                    />
                    <Form.Input
                        label='Constable ID'
                        type="text"
                        value={ConstableId}
                        onChange={handleChange("ConstableId")}
                    />
                </Form.Group>
                <Form.Group widths={2}>
                     <label><b>Status : </b></label>
                     Resolved<input style={{margin:'5px'}} type='checkbox' name="Status" label="Resolved" checked={Status === "Resolved"} value="Resolved" onChange={(e) => { setIncident({ ...incident, Status: e.target.value }) }} onClick={(e) => console.log("Event Paid== ", incident)} />
                     UnResolved<input style={{margin:'5px'}} type='checkbox' name="Status" label="Un Resolved" checked={Status === "UnResolved"} value="UnResolved" onChange={(e) => { setIncident({ ...incident, Status: e.target.value }) }} onClick={(e) => console.log("Event Unpaid== ", incident)} />
                </Form.Group>
                <Form.TextArea
                    label="Description"
                    placeholder="Description..."
                    value={Description}
                    onChange={handleChange("Description")}
                />
                <div style={btnstyle}>
                    <Button color="green" onClick={createfunction}>
                        Submit
                    </Button>
                    {/* <Button color="black" onClick={()=>invoiceclose()}>
                        Cancel
                    </Button> */}
                </div>
            </Form>
        </Segment>
        </div>
    );
}
export default Incidents_page;
const aaaa={
    // display: 'flex',
    //  marginTop: "10px",
    // //   marginLeft: "10px",
    //    height: "430px",
    //     // width: "54px"
}
const headerstyle = {
    textAlign: "center",
    color: "grey",
    fontSize: "24px",
};
const formstyle = {
    // overflow: 'auto'
    // height:'350px',
    // width:'500px'
}
const btnstyle = {
    textAlign: "center",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingBottom: window.innerWidth <= 800 ? "10px" : "0px",
}
const ddd = {
    // overflowY: "scroll",
    overflowY: window.innerWidth <= 800 ? "scroll" : "null",
    overflowX: window.innerWidth <= 800 ? "scroll" : "null",
    width: window.innerWidth <= 800 ? "380px" : "500px",
    marginLeft:"380px",
    marginTop:"70px"
}