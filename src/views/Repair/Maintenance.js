import React, { useState } from 'react';
import { Button, Form, Segment, Radio, Checkbox, Divider } from 'semantic-ui-react';
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createmaintenance } from 'src/Apicalls';
import { isAuthenticated } from 'src/Auth';

function Maintenance() {
    const currentuser = isAuthenticated();
    const uid = currentuser.data.user.userid;
    const notify = () => {
        toast.success(<h3>Repair Noted Successfully</h3>, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        });
    };
    const [maintain, setMaintain] = useState({
        Category: "",
        Date: "",
        MaintenanceImage:"",
        Status:"",
        FaultDescription: "",
        formData: new FormData(),
    });

    

    const { Category, Date, Status,MaintenanceImage, FaultDescription,formData } = maintain;

    const handleChange = (name) => (event) => {
        // console.log("bbbbbbbbbb======", event.target.files[0]);
        const value = name ===  'MaintenanceImage' ? event.target.files[0] : event.target.value;
        formData.set(name,value)
        console.log("valuevaluevalue->", value);
        setMaintain({ ...maintain, [name]: value });
        console.log("In handelChange function = ", maintain);
    };

    const createfunction = (event) => {
        console.log("Submit button clicked...");
        event.preventDefault();
        formData.append('userid', uid);
        createmaintenance(formData).then((data) => {
            console.log("Maintain Data check after hitting api=",data);
            if (data.error) {
                setMaintain({ ...maintain, error: data.error });
            } else {
                console.log("Setting Values in else part=");
                setMaintain({
                    ...maintain,
                    userid: uid,
                    Category: '',
                    Date: '',
                    MaintenanceImage: '',
                    Status: '',
                    FaultDescription: '',
                });
                notify();
                console.log("After Toast method");
            }
            {isAuthenticated() && isAuthenticated().data.user.designation === 'SuperAdmin' && (
                history.push("/MaintanencesearchSA")
                )}
                {isAuthenticated() && isAuthenticated().data.user.designation === 'manager' && (
                    history.push("/Maintanencesearch")
                    )}
        });
    };
    // const updatedpaymentvalue = (e, data) => {
    //     console.log("Payment Value check=", data.value);
    //     formData.set('Status', data.value);
    //     // setRadio(data.value);
    // }
    const history=useHistory();
    function invoiceclose() {
        history.push("/dashboard")
    }

    return (
        <div>
        <Segment style={ddd}>
            <Form style={formstyle}>
                <header style={headerstyle}>
                    <b>Maintenance Sheet</b>
                </header>
                <Divider/>
                <Form.Group style={{ paddingTop: "10px" }} widths={2}>
                <Form.Input
                        label="Date"
                        type="date"
                        value={Date}
                        onChange={handleChange("Date")}
                    />
                    <Form.Field widths="half">
                            <label>Category</label>
                            <select
                                name="Category"
                                id="Category"
                                value={Category}
                                onChange={handleChange("Category")}
                            >
                                <option value="">Select</option>
                                <option value="Pumps">Pumps</option>
                                <option value="Pie Face">Pie Face</option>
                                <option value="Quick Stock/United Jobs">Quick Stock/United Jobs</option>
                                <option value="CA Jobs">CA Jobs</option>
                            </select>
                        </Form.Field>
                </Form.Group>
                <Form.Group widths={2}>
                <div style={{ overflow: 'hidden', paddingTop: '0.678571em', paddingRight: '1em', paddingBottom: '0.678571em', paddingLeft: '1em' }}>
                            <Form.Field>
                                <label>Upload Image <span style={{ color: "red" }} >*</span></label>
                                <input
                                    type="file"
                                    name="MaintenanceImage"
                                    accept="image/png image/jpeg image/jpg"
                                    onChange={handleChange('MaintenanceImage')}
                                    className="form-control"
                                />
                            </Form.Field>
                        </div>
                </Form.Group>
                <Form.Group widths={2}>
                <label style={{marginLeft:'5px'}}><b>Status : </b></label>
                     Complete<input style={{margin:'5px'}} type='checkbox' name="Status" label="Complete" checked={Status==="Complete"?true:false} value="Complete" onChange={handleChange("Status")} onClick={(e) => console.log("Event Paid== ", maintain)} />
                     InComplete<input style={{margin:'5px'}} type='checkbox' name="Status" label="InComplete" checked={Status === "InComplete"?true:false} value="InComplete" onChange={handleChange("Status")} onClick={(e) => console.log("Event Unpaid== ", maintain)} />
                </Form.Group>
                <Form.TextArea
                    label="Description of Fault"
                    placeholder="Description..."
                    value={FaultDescription}
                    onChange={handleChange("FaultDescription")}
                />
                <div style={btnstyle}>
                    <Button color="green" onClick={createfunction} >
                        Submit
                    </Button>
                    <Button color="black" onClick={()=>invoiceclose()}>
                        Cancel
                    </Button>
                </div>
            </Form>
        </Segment>
        </div>
    );
}
export default Maintenance;
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