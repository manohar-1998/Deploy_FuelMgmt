import React, { useEffect, useState, useRef } from 'react';
import {
    Container,
    Divider,
    Header,
    Segment,
    Table,
    Menu,
    Button,
    Dropdown,
    Select,
    Pagination,
} from 'semantic-ui-react';
// import '../../App.css'
import styled from 'styled-components';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import ReactToPrint from 'react-to-print';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthenticated } from 'src/Auth';
import { deletedeliveryDocket, getdeliveryDocketforSA } from 'src/Apicalls';

toast.configure();
function Docketsearch() {
    const currentuser = isAuthenticated();
    const uid = currentuser.data.user.userid;
    const [apiUrl, setApiUrl] = useState('1');
    const [filter, setFilter] = useState({
        site:'',
        Supplier: '',
        FromDate: '',
        ToDate: '',
    });
    useEffect(() => {
        preload(apiUrl, filter);
    }, [apiUrl, filter]);
    const [activePage, setActivePage] = useState(1);
    const [order, setOrder] = useState([]);
    const [length1, setLength] = useState('1');
    const [disabled, setdisabled] = useState(false);
    const updateSearchsite = (e, data) => {
        setFilter({ ...filter, site: `&site=${data.value}` });
        setActivePage(1);
        setApiUrl(1);
    };
    const updateSearch = (e, data) => {
        setFilter({ ...filter, Supplier: `&Supplier=${data.value}` });
        setActivePage(1);
        setApiUrl(1);
    };
    const updateStartDate = (e, data) => {
        setFilter({ ...filter, FromDate: `&FromDate=${data.value}` });
        setActivePage(1);
        setApiUrl(1);
    };
    const updateEndDate = (e, data) => {
        setFilter({
            ...filter,
            ToDate: `&ToDate=${data.value}`,
        });
        setActivePage(1);
        setApiUrl(1);
    };

    const deleteConfirmed = (id) => {
        let answer = window.confirm('Are you sure?');
        if (answer) {
          deletedeliveryDocket(id).then((data) => {
            if (data.error) {
              console.log(data.error);
            } else {
              toast.success('Deleted Successfully', {
                position: toast.POSITION.TOP_RIGHT,
              });
              return preload(apiUrl, filter);
            }
          });
        }
      };


    const preload = (apiUrl, filter) => {
        console.log("In preload")
        getdeliveryDocketforSA(apiUrl, filter).then((values) => {
            console.log("ApiUrl check, Filter check=", values)
            if (values.error) {
                console.log(values.error);
            } else {
                console.log("ApiUrl check, Filter check=", values.data)
                setOrder(values.data.deliveryDockets);
                setLength(values.data);
            }
        });

    };
    console.log("Orders check=", order)
    console.log("Length value check=", length1.result)
    const onChange = (e, pageInfo) => {
        setActivePage(pageInfo.activePage);
        setApiUrl(pageInfo.activePage.toString());
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
    const selectsite = [
        { key: 'United Wagga', value: 'United Wagga', text: 'United Wagga' },
        { key: 'United Leeton', value: 'United Leeton', text: 'United Leeton' },
        { key: 'United Budgewoi', value: 'United Budgewoi', text: 'United Budgewoi' },
        { key: 'United Junee', value: 'United Junee', text: 'United Junee' },
        { key: 'United Amaroo', value: 'United Amaroo', text: 'United Amaroo' },
        { key: 'United Sunshine', value: 'United Sunshine', text: 'United Sunshine' },
    ]

    const arr = [
        'SNo',
        'Supplier',
        'Date',
        'Docket Number',
        'Temp Docket No',
        'Note',
        'Actions'
    ];

    const linkToPrint = () => {
        return (
            <button style={{ borderRadius: '4px', marginLeft: '1000px' }}>Print Invoice</button>
        )
    }

    const componentRef = useRef();

    const input = document.getElementById("pdf-element");
    const pdfgenerator = () => {
        const pdf = new jsPDF('p', 'pt', 'a4');
pdf.html(document.querySelector("#pdfelement",{padding: '4px',
width: '587px',
height: '834px'}),{
    callback: function(ppdf){
        
        ppdf.save("File.pdf")
    }
})


        // pdf.html(input, { html2canvas: { scale: 0.57 }, styles: {fontSize: '10',height: 595.28,width: 141.89} }).then(() => {
        //     pdf.save("Invoice.pdf");
        // });
    }

    return (
        <Stylecontainer style={{width: "100%" }}>
            <Segment>
                <Header as="h2" color="orange" textAlign="center">
                    Docket List Management
                </Header>
                <Styledivider />
                <Stylediv>
                <Styleselect
                    placeholder="Select Site"
                    options={selectsite}
                    onChange={(e, data) => updateSearchsite(e, data)}
                />
                    <Dropdown style={{  width: '230px' }}
                        placeholder='Select Supplier'
                        fluid
                        search
                        selection
                        onChange={(e, data) => updateSearch(e, data)}
                        options={supplierslist}
                    />
                    <Stylelabel>Start Date:</Stylelabel>
                    <Styleinput
                        onClick={() => setdisabled(false)}
                        onChange={(data, e) => updateStartDate(e, data.target)}
                        type="date"
                    ></Styleinput>
                    <Stylelabel>End Date:</Stylelabel>
                    <Styleinput
                        disabled={disabled}
                        onChange={(data, e) => updateEndDate(e, data.target)}
                        type="date"
                    ></Styleinput>
                </Stylediv>
                <div ref={componentRef}>
                    <Table id="pdfelement"  style={{marginTop:'10px'}} striped celled>
                        <Table.Header>
                            <Table.Row>
                                {arr.map((header, index) => {
                                    return (
                                        <Table.HeaderCell key={index}>{header}</Table.HeaderCell>
                                    );
                                })}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {console.log("Order values check=", order)}
                            {order.map((ord, index) => {
                                return (
                                    <Table.Row >
                                        <Table.Cell>
                                            {(activePage - 1) * 5 + order.indexOf(ord) + 1}{' '}
                                        </Table.Cell>
                                        <Table.Cell><Link to={`/EditDocket/${ord._id}`}>{ord.supplier}</Link></Table.Cell>
                                        <Table.Cell>{ord.Date}</Table.Cell>
                                        <Table.Cell>{ord.DocketNo}</Table.Cell>
                                        <Table.Cell>{ord.TempDocketNo}</Table.Cell>
                                        <Table.Cell>{ord.note}</Table.Cell>
                                        <Table.Cell >
                                            <Link to={`/EditDocket/${ord._id}`}>
                                                <Button
                                                    content="Edit"
                                                    icon="edit"
                                                    color="blue"
                                                />
                                            </Link>
                                            <Button
                                                content="Delete"
                                                icon="trash"
                                                color="red"
                                                onClick={() => deleteConfirmed(ord._id)}
                                            /></Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                        <Table.Footer class="footerrr">
                            <Table.Row>
                                <Table.HeaderCell colSpan="16">
                                    <Menu floated="right" pagination>
                                        <Pagination
                                            disabled={
                                                !length1.result > 0 || length1.result < length1.limit + 1
                                                    ? true
                                                    : false
                                            }
                                            activePage={activePage}
                                            ellipsisItem={null}
                                            totalPages={Math.ceil(length1.result / length1.limit)}
                                            firstItem={null}
                                            onPageChange={onChange}
                                            lastItem={null}
                                        />
                                    </Menu>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </div>
            </Segment>
            <ReactToPrint trigger={linkToPrint} 
             pageStyle='@page { size: auto; margin: 10mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 10px !important; }, .footerrr{ visibility : hidden} }'
             content={() => componentRef.current} />
            <button onClick={pdfgenerator}>Download</button>
        </Stylecontainer>
    );
}

export default Docketsearch;

const Stylecontainer = styled(Container)`
  &&&&& {
    margin-top: 2rem;
  }
`;
const Styledivider = styled(Divider)`
  &&&&& {
    border: 0.1px solid rgba(34, 36, 38, 0.5);
  }
`;

const Stylediv = styled.div`
  display: flex;
`;

const Styleinput = styled.input`
  margin-right: 2em;
  margin-left: 2em;
`;

const Stylelabel = styled.label`
  margin-left: 2em;
`;

const Styleselect = styled(Select)`
  &&&&& {
    margin-right: 2em;
    margin-left: 2em;
  }
`;
