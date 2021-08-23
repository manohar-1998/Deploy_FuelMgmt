import React, { useEffect, useState, useRef } from 'react';
import {
    Container,
    Divider,
    Header,
    Segment,
    Table,
    Menu,
    Dropdown,
    Button,
    Select,
    Pagination,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import jsPDF from 'jspdf';
import ReactToPrint from 'react-to-print';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthenticated } from 'src/Auth';
import { getdriveOffsformanager } from 'src/Apicalls';
toast.configure();
function Driveofflistmanager() {
    const currentuser = isAuthenticated();
    const uid = currentuser.data.user.userid;
    const [apiUrl, setApiUrl] = useState('1');
    const [filter, setFilter] = useState({
        Rego: '',
        FromDate: '',
        ToDate: '',
    });
    const [startDate, setstartdate] = useState({});
    const [activePage, setActivePage] = useState(1);
    const [order, setOrder] = useState([]);
    const [length1, setLength] = useState('1');
    const [disabled, setdisabled] = useState(false);

    const updateSearch = (e, data) => {
        setFilter({ ...filter, Rego: `&Rego=${data.value}` });
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
    const preload = (apiUrl, filter) => {
        getdriveOffsformanager(uid,apiUrl, filter).then((values) => {
            console.log("ApiUrl check, Filter check=", values)
            if (values.error) {
                console.log(values.error);
            } else {
                setOrder(values.data.driveOffs);
                setLength(values.data);
            }
        });


    };
    console.log("Length value check=", length1.result)
    const onChange = (e, pageInfo) => {
        setActivePage(pageInfo.activePage);
        setApiUrl(pageInfo.activePage.toString());
    };

    useEffect(() => {
        preload(apiUrl, filter);
    }, [apiUrl, filter]);

    const type = [
        { key: 'Genuine', value: 'Genuine', text: 'Genuine' },
        { key: 'Wrong Plate', value: 'Wrong Plate', text: 'Wrong Plate' },
    ];

    const arr = [
        'SNo',
        'PumpNo',
        'Date',
        'Rego',
        'Fuel Type',
        'Amount',
        'Description',
        'Action'
    ];
    const showToast = () => {
        toast.error('Please select start date first', {
            position: toast.POSITION.TOP_RIGHT,
        });
        setdisabled(true);
    };

    const linkToPrint = () => {
        return (
            <button style={{ borderRadius: '4px', marginLeft: '1000px' }}>Print Invoice</button>
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


    return (
        <Stylecontainer id="pdf-element" style={{ maxWidth: "210mm", width: "100%", height: "100%", position: "relative", margin: "0" }}>
            <Segment>
                <Header as="h2" color="orange" textAlign="center">
                Driveoff List
                </Header>
                <Styledivider />

                <Stylediv>
                    <Dropdown style={{ margin: '5px', width: '250px' }}
                        placeholder='Select Type'
                        fluid
                        search
                        selection
                        onChange={(e, data) => updateSearch(e, data)}
                        options={type}
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
                    <Table striped celled columns={10}>
                        <Table.Header>
                            <Table.Row>
                                {arr.map((header, index) => {
                                    return (
                                        <Table.HeaderCell key={index}>{header}</Table.HeaderCell>
                                    );
                                })}
                            </Table.Row>
                        </Table.Header>
                        {console.log("Order details check=", order)}
                        <Table.Body>
                            {order.map((ord, index) => {
                                return (
                                    <Table.Row key={index}>
                                        <Table.Cell>
                                            {(activePage - 1) * 5 + order.indexOf(ord) + 1}{' '}
                                        </Table.Cell>
                                        <Table.Cell>{ord.PumpNo}</Table.Cell>
                                        <Table.Cell>{ord.Date}</Table.Cell>
                                        <Table.Cell> <Header as="h5" color={ord.Rego=== 'Genuine' ? 'green' : 'red'}>{ord.Rego}</Header></Table.Cell>
                                        <Table.Cell>{ord.FuelType}</Table.Cell>
                                        <Table.Cell>{ord.Amount}</Table.Cell>
                                        <Table.Cell>{ord.Description} </Table.Cell>
                                        <Table.Cell >
                                            <Link to={`/EditDriveoff/${ord._id}`}>
                                                <Button
                                                    content="Edit"
                                                    icon="edit"
                                                    color="blue"
                                                />
                                            </Link>
                                            </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                        <Table.Footer>
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
            <ReactToPrint trigger={linkToPrint} content={() => componentRef.current} />
            <button onClick={pdfgenerator}>Download</button>
        </Stylecontainer>
    );
}

export default Driveofflistmanager;

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
