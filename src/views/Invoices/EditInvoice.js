import React, { useState, useEffect } from 'react';
import { Button, Form, Segment, Divider, Dropdown } from 'semantic-ui-react';
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getInvoiceByID, UpdateInvoiceByID } from 'src/Apicalls';

function EditInvoice(props) {
    const param = props.match.params.id;
    // console.log("Props Check=", props);
    const notify = () => {
        toast.success(<h3>Invoice Updated Successfully</h3>, {
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
        formData: new FormData()
    });

    const { invoiceId, supplier, userid, invoiceDate, paymentStatus, image_url, receiptNo, invoiceTotal, gstAmount, note, formData } = invoices;

    const [radio, setRadio] = useState(0);

    

    // const { ticks } = radio;
    // const [data, setData] = useState({
    //     loading: false,
    //     error: "",
    //     getaRedirect: false,
    // });


    const handleChange1 = (name) => (event) => {

        const value = name === 'image_url' ? event.target.files[0] : event.target.value;
        console.log("In handelChange function = ", event.target.value);
        formData.set(name, value);
        
        // console.log("In Formdata function = ", formData.entries());
        setInvoices({ ...invoices, [name]: value });
        console.log("Invoices Check= = ", invoices);
    };
    const updatedpvalue = (e, data) => {
         
        formData.set('supplier', data.value)
        //  setInvoices('supplier',data.value);
        console.log("supplier array check ",formData.get('supplier'));
    };

    const updatedpaymentvalue = (e, data) => {
      
        formData.set('paymentStatus', data.value);
          console.log("Payment Value check=", data.value);
    }
    const updatedpaymentvalue1 = (e, data) => {
        console.log("Payment Value check=", data.value);
        formData.set('paymentStatus', data.value)
    }


    const history = useHistory();
    function invoiceclose() {
        history.push("/dashboard")
    }
    const preload = (param) => {
        getInvoiceByID(param).then((data) => {
            console.log("data Check=",data)
            setInvoices({
                invoiceId: data.data[0].invoiceId,
                invoiceDate: data.data[0].invoiceDate,
                supplier: data.data[0].supplier,
                receiptNo: data.data[0].receiptNo,
                paymentStatus: data.data[0].paymentStatus,
                invoiceTotal: data.data[0].invoiceTotal, 
                image_url: data.data[0].image_url,
                gstAmount: data.data[0].gstAmount,
                note: data.data[0].note,
                formData: new FormData(),
            });
             setRadio(data.data[0].paymentStatus)
             console.log("Value of default radio=",radio,"paymentstatus=",)
        });

    };
    useEffect(() => {
        preload(param);
    }, [param]);

// function convertedJSON(formData){
//     let obj = {};
//     for (let key of formData.keys()) {
//         obj[key] = formData.get(key);
//     }
//     return obj;
// }

    // console.log("OBJ Check ==", obj);
    const invoicecreate = (event) => {
        console.log("Submit button clicked...");
        event.preventDefault();
        for (var data of formData) {
            console.log("Form Data=", data);
        }
        // for (let key of formData.keys()){
        //     console.log(key,formData.get(key))
        // }
        // let json = convertedJSON(formData);
        // console.log("JSON Check====",json)
        UpdateInvoiceByID(param, formData).then((data) => {
            console.log("datavalue ==", data);
            if (data&&data.error) {
                setInvoices({ ...invoices, error: data.error });
            } else {
                console.log("Setting Values in else part=");
                setInvoices({
                    ...invoices,
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
            }
            history.push("/dashboard");
        });
    };
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
    const setHidefunction = (paidOrUnpaid) => {
        setRadio(paidOrUnpaid)
    }

    return (
        <div>
            <Segment style={ddd}>
                <Form enctype="multipart/form-data">
                    <header style={headerstyle}>
                        <b>Edit Invoice</b>
                    </header>
                    <Divider />
                    <Form.Group style={{ paddingTop: "10px" }} widths={2}>
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
                        <label defaultValue={paymentStatus}>PaymentStatus : <span style={{ color: "red" }} >*</span></label>
                        Paid<input style={{ margin: '5px' }} type='radio' name="paymentStatus" label="Paid"  checked={radio==="paid"?true:false} value="paid" onChange={(e) => updatedpaymentvalue(e, e.target)} onClick={(e) => setHidefunction("paid")} />
                        UnPaid<input style={{ margin: '5px' }} type='radio' name="paymentStatus" label="Un Paid" checked={radio==="unpaid"?true:false} value="unpaid" onChange={(e) => updatedpaymentvalue1(e, e.target)} onClick={(e) => setHidefunction("unpaid")} />
                    </Form.Group>
                    <Form.Group widths={2}>
                        <div style={{ overflow: 'hidden', paddingTop: '0.678571em', paddingRight: '1em', paddingBottom: '0.678571em', paddingLeft: '1em' }}>
                            <Form.Field>
                                <label>Upload Image <span style={{ color: "red" }} >*</span></label>
                                <input
                                    type="file"
                                    name="image_url"
                                    // value = {image_url}
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
export default EditInvoice;

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