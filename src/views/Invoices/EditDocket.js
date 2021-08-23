import React, { useState, useEffect } from 'react';
import { Button, Form, Segment, Dropdown } from 'semantic-ui-react';
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getdeliveryDocketByID, UpdatedeliveryDocket } from 'src/Apicalls';
import { isAuthenticated } from 'src/Auth';
function EditDocket(props) {
    const currentuser = isAuthenticated();
    const uid = currentuser.data.user.userid;
    const [docket, setDocket] = useState({
        userid: uid,
        Date: "",
        DocketNo: "",
        TempDocketNo: "",
        note: "",
        supplier: "",
    });
    const { Date, DocketNo, TempDocketNo, note, supplier } = docket;
    const supplierslist = [
        { key: 'Australia Post', value: 'Australia Post', text: 'Australia Post' },
        { key: 'BigW', value: 'BigW', text: 'BigW' },
        { key: 'Bunnings', value: 'Bunnings', text: 'Bunnings' },
        { key: 'Coca-Cola Amatil (Aust) Pty Ltd', value: 'Coca-Cola Amatil (Aust) Pty Ltd', text: 'Coca-Cola Amatil (Aust) Pty Ltd' },
        { key: 'Coles', value: 'Coles', text: 'Coles' },
        { key: 'Frank Stationary Pty Ltd', value: 'Frank Stationary Pty Ltd', text: 'Frank Stationary Pty Ltd' },
        { key: 'Freechoice', value: 'Freechoice', text: 'Freechoice' },
        { key: 'Goodman Fielder (Quality Bakers Australia P/L)', value: 'Goodman Fielder (Quality Bakers Australia P/L)', text: 'Goodman Fielder (Quality Bakers Australia P/L)' },
        { key: 'Imperial Tobacco Australia', value: 'Imperial Tobacco Australia', text: 'Imperial Tobacco Australia' },
        { key: 'JB HIFI', value: 'JB HIFI', text: 'JB HIFI' },
        { key: 'Bega Dairy and Drinks', value: 'Bega Dairy and Drinks', text: 'Bega Dairy and Drinks' },
        { key: 'Countrywide', value: 'Countrywide', text: 'Countrywide' },
        { key: 'Kitchen Food Company', value: 'Kitchen Food Company', text: 'Kitchen Food Company' },
        { key: 'Office Works', value: 'Office Works', text: 'Office Works' },
        { key: 'Pacific Optics P/L', value: 'Pacific Optics P/L', text: 'Pacific Optics P/L' },
        { key: 'Parmalat Australia Pty Ltd.', value: 'Parmalat Australia Pty Ltd.', text: 'Parmalat Australia Pty Ltd.' },
        { key: 'PETER HART STOCKTAKERS', value: 'PETER HART STOCKTAKERS', text: 'PETER HART STOCKTAKERS' },
        { key: 'Peters Icecream(Australian Food Group Pty Ltd)', value: 'Peters Icecream(Australian Food Group Pty Ltd)', text: 'Peters Icecream(Australian Food Group Pty Ltd)' },
        { key: 'PFD Food Services Pty Ltd', value: 'PFD Food Services Pty Ltd', text: 'PFD Food Services Pty Ltd' },
        { key: 'Phillip Morris Limited', value: 'Phillip Morris Limited', text: 'Phillip Morris Limited' },
        { key: 'Repco', value: 'Repco', text: 'Repco' },
        { key: 'Royale Global (Trio Brothers)', value: 'Royale Global (Trio Brothers)', text: 'Royale Global (Trio Brothers)' },
        { key: 'Schweppes', value: 'Schweppes', text: 'Schweppes' },
        { key: 'Adt Security', value: 'Adt Security', text: 'Adt Security' },
        { key: 'Streets', value: 'Streets', text: 'Streets' },
        { key: 'Valvoline Australia P/L', value: 'Valvoline Australia P/L', text: 'Valvoline Australia P/L' },
        { key: 'Wright Express', value: 'Wright Express', text: 'Wright Express' },
        { key: 'ICT', value: 'ICT', text: 'ICT' },
        { key: 'Aura Conslutancy', value: 'Aura Conslutancy', text: 'Aura Conslutancy' },
        { key: 'Bean Alliance', value: 'Bean Alliance', text: 'Bean Alliance' },
        { key: 'Bizware', value: 'Bizware', text: 'Bizware' },
        { key: 'Djays', value: 'Djays', text: 'Djays' },
        { key: 'Elgas', value: 'Elgas', text: 'Elgas' },
        { key: 'Exetel', value: 'Exetel', text: 'Exetel' },
        { key: 'Franks (P&0 Distributors)', value: 'Franks (P&0 Distributors)', text: 'Franks (P&0 Distributors)' },
        { key: 'IGA ', value: 'IGA ', text: 'IGA ' },
        { key: 'G&L Leeton', value: 'G&L Leeton', text: 'G&L Leeton' },
        { key: 'GnS tonars', value: 'GnS tonars', text: 'GnS tonars' },
        { key: 'Ikea', value: 'Ikea', text: 'Ikea' },
        { key: 'Intuit Quick Books', value: 'Intuit Quick Books', text: 'Intuit Quick Books' },
        { key: 'Leeton NewsPower', value: 'Leeton NewsPower', text: 'Leeton NewsPower' },
        { key: 'Myotts Services', value: 'Myotts Services', text: 'Myotts Services' },
        { key: 'McMohans Bins Services', value: 'McMohans Bins Services', text: 'McMohans Bins Services' },
        { key: 'NRMA', value: 'NRMA', text: 'NRMA' },
        { key: 'Nuex', value: 'Nuex', text: 'Nuex' },
        { key: 'Office Choice Leeton', value: 'Office Choice Leeton', text: 'Office Choice Leeton' },
        { key: 'Pix Ice', value: 'Pix Ice', text: 'Pix Ice' },
        { key: 'Riverina Milk', value: 'Riverina Milk', text: 'Riverina Milk' },
        { key: 'T&G Sprado', value: 'T&G Sprado', text: 'T&G Sprado' },
        { key: 'Sodaking', value: 'Sodaking', text: 'Sodaking' },
        { key: 'United Ho', value: 'United Ho', text: 'United Ho' },
        { key: 'Westco', value: 'Westco', text: 'Westco' },
    ]
    const notify = () => {
        toast.success(<h3>Docket Updated Successfully</h3>, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        });
    };
    const updatedpvalue = (e, data) => {
        console.log("Value check=", data.value);
        setDocket({ ...docket, supplier: data.value });
        // formData.append('supplier', data.value)
    };
    const handleChange = (name) => (event) => {
        const value = event.target.value;
        console.log("valuevaluevalue->", value);
        setDocket({ ...docket, [name]: value });
        console.log("In handelChange function = ", docket);
    };

    const docketcreate = (event) => {
        console.log("Submit button clicked...");
        event.preventDefault();
        console.log("Docket check for Update=",docket)
        UpdatedeliveryDocket(param,docket).then((data) => {
            console.log("Docket check for Update=",docket)
            if (data.error) {
                setDocket({ ...docket, error: data.error });
            } else {
                console.log("Setting Values in else part=");
                setDocket({
                    ...docket,
                    // userid:uid,
                    Date: data.Date,
                    DocketNo: data.DocketNo,
                    TempDocketNo: data.TempDocketNo,
                    note: data.note
                });
                notify();
                console.log("After Toast method");
            }
            {isAuthenticated() && isAuthenticated().data.user.designation === 'SuperAdmin' && (
                history.push("/Docketsearch")
                )}
                {isAuthenticated() && isAuthenticated().data.user.designation === 'manager' && (
                    history.push("/Docketlist")
                    )}
        });
    };
    const preload = (param) => {
        getdeliveryDocketByID(param).then((data) => {
          console.log("Hiiiii=", data.data);
          console.log("Checking Preload hook values= ",data.data);
          setDocket({
            // userid:uid,
            Date: data.data[0].Date,
            DocketNo: data.data[0].DocketNo,
            TempDocketNo: data.data[0].TempDocketNo,
            supplier: data.data[0].supplier,
            note: data.data[0].note,
            formData: new FormData(),
          });
        });
    
      };
    
      const param = props.match.params.id;
      useEffect(() => {
        preload(param);
      }, [param]);
      console.log("Params check=",param)
      
    const history = useHistory();
    function invoiceclose() {
        history.push("/dashboard")
    }
    return (
        <div>
            <Segment style={ddd}>
                <Form>
                    <header style={headerstyle}>
                        <b>Delivery Docket Entry</b>
                    </header>
                    <Form.Group style={{ paddingTop: "10px" }} widths={2}>
                        <Form.Input
                            label="Date"
                            type="date"
                            value={Date}
                            onChange={handleChange("Date")}
                        />
                        <Form.Input
                            label="Docket No"
                            type="text"
                            value={DocketNo}
                            onChange={handleChange("DocketNo")}
                        />
                    </Form.Group>
                    <Form.Group widths={2}>
                    <Form.Field widths="half"><b>Supplier's <span style={{ color: "red" }} >*</span></b>
                            <Dropdown style={{ margin: '5px' }}
                                placeholder='Select Supplier'
                                fluid
                                search
                                selection
                                value={supplier}
                                onChange={(e, data) => updatedpvalue(e, data)}
                                options={supplierslist}
                            />
                            </Form.Field>
                        <Form.Input
                            label="Temporary Docket No"
                            type="text"
                            value={TempDocketNo}
                            onChange={handleChange("TempDocketNo")}
                        />
                    </Form.Group>
                    <Form.TextArea
                        label="Notes"
                        placeholder="Your Notes..."
                        value={note}
                        onChange={handleChange("note")}
                    />
                    <div style={btnstyle}>
                        <Button color="green" onClick={docketcreate} >
                            Update Docket
                        </Button>
                        <Button color="black" onClick={() => invoiceclose()}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Segment>
        </div>
    );
}
export default EditDocket;
const headerstyle = {
    textAlign: "center",
    color: "grey",
    fontSize: "24px",
};

const btnstyle = {
    textAlign: "center",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingBottom: window.innerWidth <= 800 ? "10px" : "0px",
}
const ddd = {
    // overflowY: "scroll",
    marginLeft: '340px',
    marginTop: '70px',
    overflowY: window.innerWidth <= 800 ? "scroll" : "null",
    overflowX: window.innerWidth <= 800 ? "scroll" : "null",
    width: window.innerWidth <= 800 ? "380px" : "500px",
}