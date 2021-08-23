import React, { useEffect, useState, useRef } from 'react';
import {
    Segment,
    Container,
    Header,
} from 'semantic-ui-react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import ReactToPrint from 'react-to-print';
import { getInvoiceByID } from 'src/Apicalls';
toast.configure();

const arr = [
    'Invoice Id',
    'Supplier',
    'Payment Status',
    'Invoice Date',
    'Receipt No',
    'Invoice Total',
    'Gst Amount',
];

const InvoiceDetail_page = (props) => {
    const [order, setOrder] = useState([]);
    const [Change, setChange] = useState(false);

    console.log(order);
    const { id } = props.match.params;
    console.log("ID check=", id);
    const preload = (id) => {
        getInvoiceByID(id).then((values) => {
            if (values.error) {
                console.log(values.error);
            } else {
                setOrder(values.data);
            }
        });
    };

    useEffect(() => {
        preload(id);
    }, [id, Change]);


    const linkToPrint = () => {
        return (
            <button style={{ borderRadius: '4px', marginLeft: '1000px' }}>Print</button>
        )
    }

    const componentRef = useRef();

    const input = document.getElementById("pdf-element");
    const pdfgenerator = () => {
        const pdf = new jsPDF({ unit: "px", format: "letter", userUnit: "px" });
        pdf.html(input, { html2canvas: { scale: 0.57 } }).then(() => {
            pdf.save("Invoice.pdf");
        });
    }
    console.log("Value check=", order);
    return (
        // <Stylecontainer>
        <Segment>
            {/* <Header style={{ marginTop: '10px' }} as="h2" color="orange" textAlign="center">
                Invoices Management
            </Header> */}
            {order.map((ord, i) => {
                return (
                    <div >
                        <div ref={componentRef}>
                            <header style={{ textAlign: 'center' }}><b>Invoice Form</b></header>
                            <div class="row mt-1">
                                <div class="col-lg-10 offset-lg-1">
                                    <hr />

                                    <div class="row">
                                        <div class="col-sm-6">
                                            <span><b>Supplier Name :</b> {ord.supplier}</span>
                                        </div>

                                        <div style={abcd}>
                                            <div >
                                                <div style={{ padding: '8px' }}>Invoice Details</div>
                                                <div style={{ padding: '8px' }}> <span >ID:</span>{ord._id}</div>
                                                <div style={{ padding: '8px' }}><span>Generated Date:</span>{ord.invoiceDate}</div>
                                                <div style={{ padding: '8px' }}> <span>Status:</span> <span class={ord.paymentStatus === 'paid' ? 'badge badge-success badge-pill px-25' : 'badge badge-warning badge-pill px-25'}>{ord.paymentStatus}</span></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row mt-4">
                                        <div style={{ color: 'black' }} class="col">S.No</div>
                                        <div style={{ color: 'black' }} class="col">Note</div>
                                        <div style={{ color: 'black' }} class="col">Receipt No</div>
                                        <div style={{ color: 'black' }} class="col">Total</div>
                                        <div style={{ color: 'black' }} class="col">GST Amount</div>
                                    </div>
                                    <hr />
                                    <div class="row mt-4">
                                        <div class="col">1</div>
                                        <div class="col">{ord.note}</div>
                                        <div class="col">{ord.receiptNo}</div>
                                        <div class="col">{ord.invoiceTotal}</div>
                                        <div class="col">{ord.gstAmount}</div>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        </div>
                        <div>
                            <ReactToPrint trigger={linkToPrint}
                                pageStyle='@page { size: auto; margin: 50px; } @media print { body { -webkit-print-color-adjust: exact; padding: 40px !important; } }'
                                content={() => componentRef.current} />
                            {/* <button onClick={pdfgenerator}>Download</button> */}
                        </div>
                    </div>
                );
            })}
        </Segment>
        // </Stylecontainer>

    );
};

export default InvoiceDetail_page;
const abcd = {
    marginLeft: window.innerwidth <= 800 ? "700px" : "730px"
}

