import React, { useState, useEffect } from 'react';
import { Button, Form, Segment, Divider } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router";
import { addinabilities, getinabilitiesByID, UpdateinabilitiesByID, updateincidentsByID } from 'src/Apicalls';
import { isAuthenticated } from 'src/Auth';
function EditInability(props) {
    const currentuser = isAuthenticated();
    const uid = currentuser.data.user.userid;
    const notify = () => {
        toast.success(<h3>Inability Updated Successfully</h3>, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        });
    };
    const [incident, setIncident] = useState({
        userid:uid,
        ProductDescription: "",
              Date: "",
              Amount: "",
              TotalAmount: "",
              Status: "",
    });

    const { ProductDescription, Date, Status, Amount, TotalAmount } = incident;
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
        UpdateinabilitiesByID(param,incident).then((data) => {
            console.log("Maintain Data check=",incident);
            if (data.error) {
                setIncident({ ...incident, error: data.error });
            } else {
                console.log("Setting Values in else part=");
                setIncident({
                    ...incident,
                    // userid:uid,
                    ProductDescription: data.ProductDescription,
                    Date: data.Date,
                    Amount: data.Amount,
                    Status: data.Status,
                    TotalAmount: data.TotalAmount,
                });
                notify();
                console.log("After Toast method");
            }
            {isAuthenticated() && isAuthenticated().data.user.designation === 'SuperAdmin' && (
            history.push("/InabilitysearchSA")
            )}
            {isAuthenticated() && isAuthenticated().data.user.designation === 'manager' && (
                history.push("/Inabilitysearchmanager")
                )}
        });
    };

    const preload = (param) => {
        getinabilitiesByID(param).then((data) => {
          console.log("Hiiiii=", data.data);
          console.log("Checking Preload hook values= ",data.data);
          setIncident({
            // userid:uid,
            ProductDescription: data.data[0].ProductDescription,
            Date: data.data[0].Date,
            Amount: data.data[0].Amount,
            Status: data.data[0].Status,
            TotalAmount: data.data[0].TotalAmount,
            formData: new FormData(),
          });
        });
      };
    
      const param = props.match.params.id;
      useEffect(() => {
        preload(param);
      }, [param]);
      console.log("Params check=",param);

    const history=useHistory();
    function invoiceclose() {
        history.push("/dashboard")
    }

    return (
        <div>
        <Segment style={ddd}>
            <Form style={formstyle}>
                <header style={headerstyle}>
                    <b>Inability Page</b>
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
                        label='Product Description'
                        type="Description"
                        value={ProductDescription}
                        onChange={handleChange("ProductDescription")}
                    />
                </Form.Group>
                <Form.Group widths={2}>
                     <label><b>Status : </b></label>
                     Paid<input style={{margin:'5px'}} type='checkbox' name="Status" label="Paid" checked={Status === "paid"} value="paid" onChange={(e) => { setIncident({ ...incident, Status: e.target.value }) }} onClick={(e) => console.log("Event Paid== ", incident)} />
                     Un Paid<input style={{margin:'5px'}} type='checkbox' name="Status" label="Un Paid" checked={Status === "unpaid"} value="unpaid" onChange={(e) => { setIncident({ ...incident, Status: e.target.value }) }} onClick={(e) => console.log("Event Unpaid== ", incident)} />
                </Form.Group>
                <Form.Group widths={2}>
                <Form.Input
                        label='Amount'
                        type="text"
                        value={Amount}
                        onChange={handleChange("Amount")}
                    />
                    <Form.Input
                        label='Total Amount'
                        type="text"
                        value={TotalAmount}
                        onChange={handleChange("TotalAmount")}
                    />
                </Form.Group>
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
export default EditInability;
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