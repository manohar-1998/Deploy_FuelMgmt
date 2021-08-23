
import React, { useState } from 'react';
import { Button, Form, Segment, Divider, Dropdown } from 'semantic-ui-react';
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { create_invoicesheet } from 'src/Apicalls';
import { isAuthenticated } from 'src/Auth';

function Create_invoice() {
    const currentuser = isAuthenticated();
    const uid = currentuser.data.user.userid;
    console.log("Username Check=", uid);
    const notify = () => {
        toast.success(<h3>Invoice Created Successfully</h3>, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        });
    };
    const [invoices, setInvoices] = useState({
        // userid: uid,
        invoiceId: "",
        supplier: "",
        receiptNo: "",
        invoiceDate: "",
        paymentStatus: "",
        invoiceTotal: "",
        gstAmount: "",
        image_url: "",
        note: "",
        formData: new FormData(),
    });

    const { invoiceId, supplier, userid, invoiceDate, paymentStatus, image_url, receiptNo, invoiceTotal, gstAmount, note, formData } = invoices;

    const [radio, setRadio]=useState();
    // const { ticks} = radio;
    const [data, setData] = useState({
        loading: false,
        error: "",
        getaRedirect: false,
      });
    const [errors, setErrors] = useState({
        supplierErr: "Select Supllier",
        invoicedateErr: "Select Date",
        invoicenumberErr: "Provide Invoice Number",
        invoicetotalErr: "Provide Invoice Total",
        desingationErr: "Designation is Required",
        gstamountErr: "Enter GST Amount",
        receiptnumberErr: "Enter Receipt Number",
        paymentstatusErr: "Select Payment Status",
        imageErr: "Select Image",
        noteErr: "Enter your Notes"
    });
    const {
        supplierErr,
        invoicedateErr,
        invoicenumberErr,
        invoicetotalErr,
        desingationErr,
        gstamountErr,
        receiptnumberErr,
        paymentstatusErr,
        imageErr,
        noteErr
    } = errors;


    const handleChange1 = (name) => (event) => {

        const value = name === 'image_url' ? event.target.files[0] : event.target.value;
        console.log("In handelChange function = ", value);
        formData.set(name, value);
        console.log("In Formdata function = ", formData);
        setInvoices({ ...invoices, [name]: value });
        console.log("Invoices Check= = ", invoices);
    };
    const updatedpvalue = (e, data) => {
        
        formData.set('supplier', data.value)
        console.log("array value check",formData.get('supplier'));
    };

    const updatedpaymentvalue = (e, data) => {
        console.log("Payment Value check=", data.value);
        formData.set('paymentStatus', data.value);
        // setRadio(data.value);
    }
    const updatedpaymentvalue1 = (e, data) => {
        console.log("Payment Value check=", data.value);
        formData.set('paymentStatus', data.value)
    }

    const invoicecreate = (event) => {
        console.log("Submit button clicked...");
        // event.preventDefault();
        if (isValid()) {
            setInvoices({ ...invoices, error: "", loading: true });
            setErrors({ ...errors, nameErr: data.error });
        console.log("Valuess Checkkkkkkk=", invoices);
        formData.append('userid', uid);
        create_invoicesheet(formData).then((data) => {
            console.log("datavalue ==", data)
            if (data.error) {
                setInvoices({ ...invoices, error: data.error });
            } else {
                console.log("Setting Values in else part=");
                setInvoices({
                    ...invoices,
                    // userid: uid,
                    invoiceId: '',
                    invoiceDate: '',
                    supplier: '',
                    receiptNo: '',
                    paymentStatus: '',
                    invoiceTotal: '',
                    image_url: '',
                    gstAmount: '',
                    note: '',
                });
                notify();
                console.log("After Toast method");
            }
            {isAuthenticated() && isAuthenticated().data.user.designation === 'SuperAdmin' && (
                history.push("/InvoicelistforSAdmin")
                )}
                {isAuthenticated() && isAuthenticated().data.user.designation === 'manager' && (
                    history.push("/Invoiceslist")
                    )}
            
        });
    }
    };
    console.log("Radio Check=",radio)

    const isValid = () => {
        if (
            !supplier.length > 0 &&
            !invoiceId > 0 &&
            !invoiceDate > 0 &&
            !receiptNo > 0 &&
            // !paymentStatus > 0 &&
            // !invoiceTotal > 0 &&
            // !image_url > 0 &&
            // !gstAmount > 0 &&
            !note > 0
        ) {
            toast.error("All Fields Are Mandatory", {
                position: toast.POSITION.TOP_CENTER,
            });
            return false;
        } 
        // else if (!supplier.length > 0) {
        //     toast.error(supplierErr, { position: toast.POSITION.TOP_RIGHT });
        //     return false;
        // }
        else if (!invoiceDate.length > 0) {
            toast.error(invoicedateErr, { position: toast.POSITION.TOP_RIGHT });
            return false;
        }
         else if (!invoiceId.length > 0) {
            toast.error(invoicenumberErr, { position: toast.POSITION.TOP_RIGHT });
            return false;
        }
        // else if (!invoiceTotal.length > 0) {
        //     toast.error(invoicetotalErr, { position: toast.POSITION.TOP_RIGHT });
        //     return false;
        // }
        // else if (!gstAmount.length > 0) {
        //     toast.error(gstamountErr, { position: toast.POSITION.TOP_RIGHT });
        //     return false;
        // }
        else if (!receiptNo.length > 0) {
            toast.error(receiptnumberErr, { position: toast.POSITION.TOP_RIGHT });
            return false;
        }
        else if (!note.length > 0) {
            toast.error(noteErr, { position: toast.POSITION.TOP_RIGHT });
            return false;
        }

        return true;
    };

    const history = useHistory();
    function invoiceclose() {
        history.push("/dashboard")
    }

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
    const setHidefunction=(e,data)=>{
        setRadio(data.value)
      }

    return (
        <div>
            <Segment style={ddd}>
                <Form enctype="multipart/form-data">
                    <header style={headerstyle}>
                        <b>Create Invoice</b>
                    </header>
                    <Divider />
                    <Form.Group style={{ paddingTop: "10px" }} widths={2}>
                        <Form.Field widths="half"><b>Supplier's <span style={{ color: "red" }} >*</span></b>
                            <Dropdown style={{ margin: '5px' }}
                                placeholder='Select Supplier'
                                fluid
                                search
                                selection
                                onChange={(e, data) => updatedpvalue(e, data)}
                                options={supplierslist}
                            />
                        </Form.Field>
                        <Form.Input
                            label="Invoice Date"
                            type="date"
                            value={invoiceDate}
                            onChange={handleChange1("invoiceDate")}
                        />
                    </Form.Group>
                    <Form.Group widths={2}>
                        <Form.Input
                            label="Invoice No"
                            type="text"
                            value={invoiceId}
                            onChange={handleChange1("invoiceId")}
                        />
                        <Form.Input
                            label="Invoice Total"
                            type="text"
                            value={invoiceTotal}
                            onChange={handleChange1("invoiceTotal")}
                        />
                    </Form.Group>
                    <Form.Group widths={2}>
                        <Form.Input
                            label="GST Amount"
                            type="text"
                            value={gstAmount}
                            onChange={handleChange1("gstAmount")}
                        />
                        <Form.Input
                            label="Receipt No"
                            type="text"
                            value={receiptNo}
                            onChange={handleChange1("receiptNo")}
                        />
                    </Form.Group>
                    <Form.Group inline>
                        <label>PaymentStatus : <span style={{ color: "red" }} >*</span></label>
                        Paid<input style={{ margin: '5px' }} type='radio' name="paymentStatus" label="Paid" checked={radio==="paid"?true:false} value="paid" onChange={(e) => updatedpaymentvalue(e, e.target) } onClick={(e)=>setHidefunction(e,e.target)} />
                        UnPaid<input style={{ margin: '5px' }} type='radio' name="paymentStatus" label="Un Paid" checked={radio==="unpaid"?true:false} value="unpaid" onChange={(e) => updatedpaymentvalue1(e, e.target)} onClick={(e)=>setHidefunction(e,e.target)} />
                    </Form.Group>
                    <Form.Group widths={2}>
                        <div style={{ overflow: 'hidden', paddingTop: '0.678571em', paddingRight: '1em', paddingBottom: '0.678571em', paddingLeft: '1em' }}>
                            <Form.Field>
                                <label>Upload Image <span style={{ color: "red" }} >*</span></label>
                                <input
                                    type="file"
                                    name="image_url"
                                    accept="image/png image/jpeg image/jpg"
                                    onChange={handleChange1('image_url')}
                                    className="form-control"
                                />
                            </Form.Field>
                        </div>
                    </Form.Group>
                    <Form.TextArea
                        label="Notes"
                        placeholder="Your Notes..."
                        value={note}
                        onChange={handleChange1("note")}
                    />
                    <div style={btnstyle}>
                        <Button color="green" onClick={invoicecreate}>Create Invoice</Button>
                        <Button color="black" onClick={() => invoiceclose()}>Cancel</Button>
                    </div>
                </Form>
            </Segment>
        </div>
    );
}
export default Create_invoice;

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
    marginLeft: '350px',
    overflowY: window.innerWidth <= 800 ? "scroll" : "null",
    overflowX: window.innerWidth <= 800 ? "scroll" : "null",
    width: window.innerWidth <= 800 ? "380px" : "500px",
}