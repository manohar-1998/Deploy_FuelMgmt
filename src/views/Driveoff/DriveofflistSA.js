import React, { useEffect, useState, useRef } from 'react';
import {
    Container,
    Divider,
    Header,
    Segment,
    Table,
    Button,
    Menu,
    Dropdown,
    Select,
    Pagination,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import ReactToPrint from 'react-to-print';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deletedriveOffsByID, getdriveOffsforSA } from 'src/Apicalls';
toast.configure();
function DriveofflistSA() {
    const [apiUrl, setApiUrl] = useState('1');
    const [filter, setFilter] = useState({
        site: '',
        Rego: '',
        FromDate: '',
        ToDate: '',
    });
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
    const deleteConfirmed = (id) => {
        let answer = window.confirm('Are you sure?');
        if (answer) {
          deletedriveOffsByID(id).then((data) => {
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
        getdriveOffsforSA(apiUrl, filter).then((values) => {
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
    const selectsite = [
        { key: 'United Wagga', value: 'United Wagga', text: 'United Wagga' },
        { key: 'United Leeton', value: 'United Leeton', text: 'United Leeton' },
        { key: 'United Budgewoi', value: 'United Budgewoi', text: 'United Budgewoi' },
        { key: 'United Junee', value: 'United Junee', text: 'United Junee' },
        { key: 'United Amaroo', value: 'United Amaroo', text: 'United Amaroo' },
        { key: 'United Sunshine', value: 'United Sunshine', text: 'United Sunshine' },
    ]
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
                    <Styleselect
                        placeholder="Select Site"
                        options={selectsite}
                        onChange={(e, data) => updateSearchsite(e, data)}
                    />
                    <Dropdown style={{ width: '250px' }}
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
                    <Table style={{ marginTop: '10px' }} striped celled >
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
                                        <Table.Cell> <Header as="h5" color={ord.Rego === 'Genuine' ? 'green' : 'red'}>{ord.Rego}</Header></Table.Cell>
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

export default DriveofflistSA;

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
