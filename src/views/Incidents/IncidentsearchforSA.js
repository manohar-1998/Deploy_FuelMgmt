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
import styled from 'styled-components';
import jsPDF from 'jspdf';
import ReactToPrint from 'react-to-print';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthenticated } from 'src/Auth';
import { deleteincidentsByID, getincidents, getincidentsforSA } from 'src/Apicalls';
toast.configure();
function IncidentsearchforSA() {
  const currentuser = isAuthenticated();
  const uid = currentuser.data.user.userid;
  const [apiUrl, setApiUrl] = useState('1');
  const [filter, setFilter] = useState({
    Status: '',
    site: '',
    FromDate: '',
    ToDate: '',
  });
  const [startDate, setstartdate] = useState({});
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
    setFilter({ ...filter, Status: `&Status=${data.value}` });
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
      deleteincidentsByID(id).then((data) => {
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
    getincidentsforSA(apiUrl, filter).then((values) => {
      console.log("ApiUrl check, Filter check=", values)
      if (values.error) {
        console.log(values.error);
      } else {
        setOrder(values.data.incidents);
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
    // preload1();
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
  const Statustype = [
    { key: 'Resolved', value: 'Resolved', text: 'Resolved' },
    { key: 'UnResolved', value: 'UnResolved', text: 'UnResolved' },
  ];

  const arr = [
    'SNo',
    'RegNo',
    'Date',
    'EventNo',
    'ConstableId',
    'Status',
    'Description',
    'Actions',
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
    <Stylecontainer id="pdf-element" style={{ maxWidth: "280mm", width: "120%", height: "100%", position: "relative", margin: "0" }}>
      <Segment>
        <Header as="h2" color="orange" textAlign="center">
          Incident's List
        </Header>
        <Styledivider />

        <Stylediv>
          <Styleselect
            placeholder="Select Site"
            options={selectsite}
            onChange={(e, data) => updateSearchsite(e, data)}
          />
          <Dropdown style={{width: '250px' }}
            placeholder='Select Status'
            fluid
            search
            selection
            onChange={(e, data) => updateSearch(e, data)}
            options={Statustype}
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
                    <Table.Cell><Link>{ord.RegNo}</Link></Table.Cell>
                    <Table.Cell>{ord.Date}</Table.Cell>
                    <Table.Cell>{ord.EventNo}</Table.Cell>
                    <Table.Cell>{ord.ConstableId}</Table.Cell>
                    <Table.Cell>
                      <Header as="h5" color={ord.Status === 'Resolved' ? 'green' : 'red'}>{ord.Status} </Header>
                    </Table.Cell>
                    <Table.Cell>{ord.Description} </Table.Cell>
                    <Table.Cell >
                      <Link to={`/EditIncident/${ord._id}`}>
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

export default IncidentsearchforSA;

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
