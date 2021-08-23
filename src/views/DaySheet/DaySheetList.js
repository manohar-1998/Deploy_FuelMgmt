import React, { useEffect, useState, useRef } from 'react';
import {
  Container,
  Divider,
  Header,
  Segment,
  Select,
} from 'semantic-ui-react';
import styled from 'styled-components';
import jsPDF from 'jspdf';
import ReactToPrint from 'react-to-print';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getepaytotal, getworkersheet } from 'src/Apicalls';
import { isAuthenticated } from 'src/Auth';
toast.configure();

function DaySheetList() {
  const currentuser = isAuthenticated();
  const uid = currentuser.data.user.userid;
  const [users, setUsers] = useState([]);
  const [epay, setEpay] = useState({});
  const [apiUrl, setApiUrl] = useState('1');
  const [filter, setFilter] = useState({
    selectSite: '',
  });
  const [startDate, setstartdate] = useState({
    datecheck:''
  });
  // const [datecheck] = startDate
  const [activePage, setActivePage] = useState(1);
  const [order, setOrder] = useState([]);
  const [length1, setLength] = useState('1');
  const [disabled, setdisabled] = useState(false);

  const updateSearch = (e, data) => {
    setFilter({ ...filter, selectSite: data.value });
    
    setActivePage(1);
    setApiUrl(1);
  };
  const updateStartDate = (e, data) => {
    setFilter({ ...filter, SelectDate: `SelectDate=${data.value}` });
    setstartdate({...startDate,datecheck:data.value})
    setActivePage(1);
    setApiUrl(1);
  };

  const preload = () => {

    getepaytotal().then((values) => {
      let epayvalue = values.data;
      console.log("Epay Total Check=", values)
      if (values.error) {
        console.log(values.error);
      } else {
        setEpay(
          epayvalue.map((ee) => {
            return {
              Paper_TotalTouchEPay: ee.Paper_TotalTouchEPay,
              createdOn: ee.createdOn,
              _id:ee._id,
              B_FwdFuel: ee.B_FwdFuel,
              TotalFuel: ee.TotalFuel,
              CreditSales: ee.CreditSales,
              B_FwdComm: ee.B_FwdComm,
              Banking: ee.Banking,
              site: ee.site,
              assigntomanager: ee.assigntomanager,
              ReferenceNo: ee.ReferenceNo,
              FuelComm:ee.FuelComm,
              Shop_Rent: ee.Shop_Rent,
              insurance: ee.insurance,
              Others: ee.Others
            }
          })
        );
      }
    });


    getworkersheet().then((data) => {
      let user = data.data;
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(
          user.map((d) => {
            return {
              _id: d._id,
              OperatorName: d.OperatorName,
              MotorPass: d.MotorPass,
              MotorChange: d.MotorChange,
              Fleet: d.Fleet,
              Eftpos: d.Eftpos,
              site: d.site,
              ManualEftpos: d.ManualEftpos,
              Amex: d.Amex,
              Diners: d.Diners,
              UnitedCards: d.UnitedCards,
              ManUnitedCard: d.ManUnitedCard,
              MenuLog: d.MenuLog,
              UberEats: d.UberEats,
              Inabilities: d.Inabilities,
              DriveOffs: d.DriveOffs,
              GunneboSafeAmt: d.GunneboSafeAmt,
              ManualFinalDrop: d.ManualFinalDrop,
              NetSales: d.NetSales,
              Difference: d.Difference,
              ShopSales: d.ShopSales,
              Surcharge: d.Surcharge,
              TouchEPAY1: d.TouchEPAY1,
              TouchEPAY2: d.TouchEPAY2,
              NetShop: d.NetShop,
              BBQ: d.BBQ,
              PieFace: d.PieFace,
              Refunds: d.Refunds,
              ClearedItems: d.ClearedItems,
              Cancels: d.Cancels,
              CustomerCount: d.CustomerCount,
              SelectShift: d.SelectShift,
              POS: d.POS,
              createdOn: d.createdOn,
              totalFromAbove: d.totalFromAbove,
              TouchEPayTotal: d.TouchEPayTotal,
            }
          })
        );
      }
    });
  };
 console.log("Filter value check=",filter.selectSite)
  console.log("Workersheet value check=", users)
  console.log("Paperwork value check=", epay)
  const onChange = (e, pageInfo) => {
    setActivePage(pageInfo.activePage);
    setApiUrl(pageInfo.activePage.toString());
  };

  useEffect(() => {
    preload(apiUrl, filter);
  }, [apiUrl, filter]);

  const Selectsite = [
    { key: 'United Wagga', value: 'United Wagga', text: 'United Wagga' },
    { key: 'United Leeton', value: 'United Leeton', text: 'United Leeton' },
    { key: 'United Budgewoi', value: 'United Budgewoi', text: 'United Budgewoi' },
    { key: 'United Junee', value: 'United Junee', text: 'United Junee' },
    { key: 'United Amaroo', value: 'United Amaroo', text: 'United Amaroo' },
    { key: 'United Sunshine', value: 'United Sunshine', text: 'United Sunshine' },
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
 const pdfgenerator=()=>{
  const pdf = new jsPDF({ unit: "px", format: "letter", userUnit: "px" });
  pdf.html(input, { html2canvas: { scale: 0.57 } }).then(() => {
    pdf.save("Invoice.pdf");
  });
  }
  var pos1shift1 = [];
  var pos1shift2 = [];
  var pos1shift3 = [];
  var pos2shift1 = [];
  var pos2shift2 = [];
  var pos2shift3 = [];
  var selectedpaperworklist = [];
  
  console.log("pos1shift1 check=",startDate.datecheck)
  for (let i = 0; i < users.length; i = i + 1) {

    if (users[i].createdOn === startDate.datecheck && users[i].site === filter.selectSite && users[i].POS === "POS1" && users[i].SelectShift === 1) {
      pos1shift1 = Object.assign([], users[i]);
    }  

    if (users[i].createdOn === startDate.datecheck && users[i].site === filter.selectSite && users[i].POS === "POS1" && users[i].SelectShift === 2) {
      pos1shift2 = Object.assign([], users[i]);
    }

    if (users[i].createdOn === startDate.datecheck && users[i].site === filter.selectSite && users[i].POS === "POS1" && users[i].SelectShift === 3) {
      pos1shift3 = Object.assign([], users[i]);
    }

    if (users[i].createdOn === startDate.datecheck && users[i].site === filter.selectSite && users[i].POS === "POS2" && users[i].SelectShift === 1) {
      pos2shift1 = Object.assign([], users[i]);
    }

    if (users[i].createdOn === startDate.datecheck && users[i].site === filter.selectSite && users[i].POS === "POS2" && users[i].SelectShift === 2) {
      pos2shift2 = Object.assign([], users[i]);
    }

    if (users[i].createdOn === startDate.datecheck && users[i].site === filter.selectSite && users[i].POS === "POS2" && users[i].SelectShift === 3) {
      pos2shift3 = Object.assign([], users[i]);
    }

  
 
  for (let i = 0; i < epay.length; i = i + 1) {
    console.log("Epay Manager Check=",epay[i].assigntomanager, uid)
    if (epay[i].createdOn === startDate.datecheck && epay[i].site === filter.selectSite ) {
      selectedpaperworklist = Object.assign([], epay[i]);
    }
    else{

    }
  }
}
  console.log("Paper work vaule check=", selectedpaperworklist);

  return (
    <Stylecontainer id="pdf-element" style={{maxWidth: "210mm", width: "100%", height: "100%", position: "relative", margin: "0"}}>
      <Segment>
        <Header as="h2" color="orange" textAlign="center">
          DaySheet Management
        </Header>
        <Styledivider />
        <Stylediv>
          <Styleselect
            placeholder="Select Site"
            options={Selectsite}
            onChange={(e, data) => updateSearch(e, data)}
          />
          <Stylelabel>Select Date:</Stylelabel>
          <Styleinput
            onClick={() => setdisabled(false)}
            onChange={(data, e) => updateStartDate(e, data.target)}
            type="date"
          ></Styleinput>
        </Stylediv>
        <div ref={componentRef}>
        <form style={{ marginBottom: '20px' }}>
        <table border="1" cellPadding='0px' style={tablestyle}>
          <tr>
            <th>Date :{startDate.datecheck}</th>
            <th style={{ textAlign: "center" }} colSpan="6"><b>UNITED WAGGA WAGGA -2235</b></th>
            <th style={{ textAlign: "center", padding: '0 50px' }}>Day:</th>
            <th style={{ textAlign: "center", padding: '0 60px' }}></th>
          </tr>
          <tr align="center">
            <th>POS</th>
            <th colSpan='3'>POS1</th>
            <th colSpan='3'>POS2</th>
            <th></th>
            <th></th>
          </tr>
          <tr align="center">
            <th style={{ padding: '0 50px' }}>SHIFTS</th>
            <th style={{ padding: '0 40px' }}>Shift 1</th>
            <th style={{ padding: '0 40px' }}>Shift 2</th>
            <th style={{ padding: '0 40px' }}>Shift 3</th>
            <th style={{ padding: '0 40px' }}>Shift 1</th>
            <th style={{ padding: '0 40px' }}>Shift 2</th>
            <th style={{ padding: '0 40px' }}>Shift 3</th>
            <td>{ }</td>
          </tr>
          <tr align="center">
            <th>Operator Name</th>
            {console.log("Id check=",pos1shift1._id)}
            <td><Link to={`/Editworkersheet/${pos1shift1._id}`}>{pos1shift1.OperatorName}</Link></td>
            <td><Link to={`/Editworkersheet/${pos1shift2._id}`}>{pos1shift2.OperatorName}</Link></td>
            <td><Link to={`/Editworkersheet/${pos1shift3._id}`}>{pos1shift3.OperatorName}</Link></td>
            <td><Link to={`/Editworkersheet/${pos2shift1._id}`}>{pos2shift1.OperatorName}</Link></td>
            <td><Link to={`/Editworkersheet/${pos2shift2._id}`}>{pos2shift2.OperatorName}</Link></td>
            <td><Link to={`/Editworkersheet/${pos2shift3._id}`}>{pos2shift3.OperatorName}</Link></td>
            <th colSpan='2'>Paper Work</th>
          </tr>
          <tr align="center">
            <td>Motor Pass</td>
            <td padding='6px'>{pos1shift1.MotorPass}</td>
            <td>{pos1shift2.MotorPass}</td>
            <td>{pos1shift3.MotorPass}</td>
            <td>{pos2shift1.MotorPass}</td>
            <td>{pos2shift2.MotorPass}</td>
            <td>{pos2shift3.MotorPass}</td>
            <td>B/Fwd Fuel </td>
            <td>{selectedpaperworklist.B_FwdFuel} </td>
          </tr>
          <tr align="center">
            <td>Motor Charge</td>
            <td>{pos1shift1.MotorChange}</td>
            <td>{pos1shift2.MotorChange}</td>
            <td>{pos1shift3.MotorChange}</td>
            <td>{pos2shift1.MotorChange}</td>
            <td>{pos2shift2.MotorChange}</td>
            <td>{pos2shift3.MotorChange}</td>
            <td>Total Fuel </td>
            <td>{selectedpaperworklist.TotalFuel} </td>
          </tr>
          <tr align="center">
            <td>Fleet</td>
            <td>{pos1shift1.Fleet}</td>
            <td>{pos1shift2.Fleet}</td>
            <td>{pos1shift3.Fleet}</td>
            <td>{pos2shift1.Fleet}</td>
            <td>{pos2shift2.Fleet}</td>
            <td>{pos2shift3.Fleet}</td>
            <td>Touch E-Pay </td>
            <td>{selectedpaperworklist.Paper_TotalTouchEPay} </td>
          </tr>
          <tr align="center">
            <td>Eftpos</td>
            <td>{pos1shift1.Eftpos}</td>
            <td>{pos1shift2.Eftpos}</td>
            <td>{pos1shift3.Eftpos}</td>
            <td>{pos2shift1.Eftpos}</td>
            <td>{pos2shift2.Eftpos}</td>
            <td>{pos2shift3.Eftpos}</td>
            <td>Credit Sales</td>
            <td>{selectedpaperworklist.CreditSales}</td>
          </tr>
          <tr align="center">
            <td>Manual Eftpos</td>
            <td>{pos1shift1.ManualEftpos}</td>
            <td>{pos1shift2.ManualEftpos}</td>
            <td>{pos1shift3.ManualEftpos}</td>
            <td>{pos2shift1.ManualEftpos}</td>
            <td>{pos2shift2.ManualEftpos}</td>
            <td>{pos2shift3.ManualEftpos}</td>
            <td className="abc">B/Fwd Comm</td>
            <td>{selectedpaperworklist.B_FwdComm} </td>
          </tr>
          <tr align="center">
            <td>Amex</td>
            <td>{pos1shift1.Amex}</td>
            <td>{pos1shift2.Amex}</td>
            <td>{pos1shift3.Amex}</td>
            <td>{pos2shift1.Amex}</td>
            <td>{pos2shift2.Amex}</td>
            <td>{pos2shift3.Amex}</td>
            <td>Fuel Comm</td>
            <td>{selectedpaperworklist.FuelComm} </td>
          </tr>
          <tr align="center">
            <td>Diners</td>
            <td>{pos1shift1.Diners}</td>
            <td>{pos1shift2.Diners}</td>
            <td>{pos1shift3.Diners}</td>
            <td>{pos2shift1.Diners}</td>
            <td>{pos2shift2.Diners}</td>
            <td>{pos2shift3.Diners}</td>
            <td>Shop Rent</td>
            <td> {selectedpaperworklist.Shop_Rent}</td>
          </tr>
          <tr align="center">
            <td>United Cards</td>
            <td>{pos1shift1.UnitedCards}</td>
            <td>{pos1shift2.UnitedCards}</td>
            <td>{pos1shift3.UnitedCards}</td>
            <td>{pos2shift1.UnitedCards}</td>
            <td>{pos2shift2.UnitedCards}</td>
            <td>{pos2shift3.UnitedCards}</td>
            <td>Insurance</td>
            <td>{selectedpaperworklist.insurance} </td>
          </tr>
          <tr align="center">
            <td>Man United Cards</td>
            <td>{pos1shift1.ManUnitedCard}</td>
            <td>{pos1shift2.ManUnitedCard}</td>
            <td>{pos1shift3.ManUnitedCard}</td>
            <td>{pos2shift1.ManUnitedCard}</td>
            <td>{pos2shift2.ManUnitedCard}</td>
            <td>{pos2shift3.ManUnitedCard}</td>
            <td>Others</td>
            <td> {selectedpaperworklist.Others}</td>
          </tr>
          <tr align='center'>
            <td>Menulog</td>
            <td>{pos1shift1.MenuLog}</td>
            <td>{pos1shift2.MenuLog}</td>
            <td>{pos1shift3.MenuLog}</td>
            <td>{pos2shift1.MenuLog}</td>
            <td>{pos2shift2.MenuLog}</td>
            <td>{pos2shift3.MenuLog}</td>
            <td>Banking</td>
            <td>{selectedpaperworklist.Banking}</td>
          </tr>
          <tr align='center'>
            <td>Uber Eats</td>
            <td>{pos1shift1.UberEats}</td>
            <td>{pos1shift2.UberEats}</td>
            <td>{pos1shift3.UberEats}</td>
            <td>{pos2shift1.UberEats}</td>
            <td>{pos2shift2.UberEats}</td>
            <td>{pos2shift3.UberEats}</td>
            <td>Reference No</td>
            <td>{selectedpaperworklist.ReferenceNo} </td>
          </tr >
          <tr align='center'>
            <td>Inabilities</td>
            <td>{pos1shift1.Inabilities}</td>
            <td>{pos1shift2.Inabilities}</td>
            <td>{pos1shift3.Inabilities}</td>
            <td>{pos2shift1.Inabilities}</td>
            <td>{pos2shift2.Inabilities}</td>
            <td>{pos2shift3.Inabilities}</td>
          </tr>
          <tr align='center'>
            <td>Drive offs</td>
            <td>{pos1shift1.DriveOffs}</td>
            <td>{pos1shift2.DriveOffs}</td>
            <td>{pos1shift3.DriveOffs}</td>
            <td>{pos2shift1.DriveOffs}</td>
            <td>{pos2shift2.DriveOffs}</td>
            <td>{pos2shift3.DriveOffs}</td>
          </tr>
          <tr align='center'>
            <td>Gunnebo Safe Amt</td>
            <td>{pos1shift1.GunneboSafeAmt}</td>
            <td>{pos1shift2.GunneboSafeAmt}</td>
            <td>{pos1shift3.GunneboSafeAmt}</td>
            <td>{pos2shift1.GunneboSafeAmt}</td>
            <td>{pos2shift2.GunneboSafeAmt}</td>
            <td>{pos2shift3.GunneboSafeAmt}</td>
          </tr>
          <tr align='center'>
            <td>Manual final drop</td>
            <td>{pos1shift1.ManualFinalDrop}</td>
            <td>{pos1shift2.ManualFinalDrop}</td>
            <td>{pos1shift3.ManualFinalDrop}</td>
            <td>{pos2shift1.ManualFinalDrop}</td>
            <td>{pos2shift2.ManualFinalDrop}</td>
            <td>{pos2shift3.ManualFinalDrop}</td>
          </tr>
          <tr align='center'>
            <td><b>Total From Above</b></td>
            <td>{pos1shift1.totalFromAbove}</td>
            <td>{pos1shift2.totalFromAbove}</td>
            <td>{pos1shift3.totalFromAbove}</td>
            <td>{pos2shift1.totalFromAbove}</td>
            <td>{pos2shift2.totalFromAbove}</td>
            <td>{pos2shift3.totalFromAbove}</td>
          </tr>
          <tr align='center'>
            <td>Net Sales</td>
            <td>{pos1shift1.NetSales}</td>
            <td>{pos1shift2.NetSales}</td>
            <td>{pos1shift3.NetSales}</td>
            <td>{pos2shift1.NetSales}</td>
            <td>{pos2shift2.NetSales}</td>
            <td>{pos2shift3.NetSales}</td>
          </tr>
          <tr align='center'>
            <td>Differences</td>
            <td>{pos1shift1.Difference}</td>
            <td>{pos1shift2.Difference}</td>
            <td>{pos1shift3.Difference}</td>
            <td>{pos2shift1.Difference}</td>
            <td>{pos2shift2.Difference}</td>
            <td>{pos2shift3.Difference}</td>
          </tr>
          <tr align='center'>
            <td>Shop Sales</td>
            <td>{pos1shift1.ShopSales}</td>
            <td>{pos1shift2.ShopSales}</td>
            <td>{pos1shift3.ShopSales}</td>
            <td>{pos2shift1.ShopSales}</td>
            <td>{pos2shift2.ShopSales}</td>
            <td>{pos2shift3.ShopSales}</td>
          </tr>
          <tr align='center'>
            <td>Surcharge</td>
            <td>{pos1shift1.Surcharge}</td>
            <td>{pos1shift2.Surcharge}</td>
            <td>{pos1shift3.Surcharge}</td>
            <td>{pos2shift1.Surcharge}</td>
            <td>{pos2shift2.Surcharge}</td>
            <td>{pos2shift3.Surcharge}</td>
          </tr>
          <tr align='center'>
            <td>Touch Epay 1(-)</td>
            <td>{pos1shift1.TouchEPAY1}</td>
            <td>{pos1shift2.TouchEPAY1}</td>
            <td>{pos1shift3.TouchEPAY1}</td>
            <td>{pos2shift1.TouchEPAY1}</td>
            <td>{pos2shift2.TouchEPAY1}</td>
            <td>{pos2shift3.TouchEPAY1}</td>
          </tr>
          <tr align='center'>
            <td>Touch Epay 2(-)</td>
            <td>{pos1shift1.TouchEPAY2}</td>
            <td>{pos1shift2.TouchEPAY2}</td>
            <td>{pos1shift3.TouchEPAY2}</td>
            <td>{pos2shift1.TouchEPAY2}</td>
            <td>{pos2shift2.TouchEPAY2}</td>
            <td>{pos2shift3.TouchEPAY2}</td>
          </tr>
          <tr align='center'>
            <td>BBQ Gas</td>
            <td>{pos1shift1.BBQ}</td>
            <td>{pos1shift2.BBQ}</td>
            <td>{pos1shift3.BBQ}</td>
            <td>{pos2shift1.BBQ}</td>
            <td>{pos2shift2.BBQ}</td>
            <td>{pos2shift3.BBQ}</td>
          </tr>
          <tr align='center'>
            <td>NET SHOP</td>
            <td>{pos1shift1.NetShop}</td>
            <td>{pos1shift2.NetShop}</td>
            <td>{pos1shift3.NetShop}</td>
            <td>{pos2shift1.NetShop}</td>
            <td>{pos2shift2.NetShop}</td>
            <td>{pos2shift3.NetShop}</td>
          </tr>
          <tr align='center'>
            <td>Pie Face</td>
            <td>{pos1shift1.PieFace}</td>
            <td>{pos1shift2.PieFace}</td>
            <td>{pos1shift3.PieFace}</td>
            <td>{pos2shift1.PieFace}</td>
            <td>{pos2shift2.PieFace}</td>
            <td>{pos2shift3.PieFace}</td>
          </tr>
          <tr align='center'>
            <td>Credit/Refunds</td>
            <td>{pos1shift1.Refunds}</td>
            <td>{pos1shift2.Refunds}</td>
            <td>{pos1shift3.Refunds}</td>
            <td>{pos2shift1.Refunds}</td>
            <td>{pos2shift2.Refunds}</td>
            <td>{pos2shift3.Refunds}</td>
          </tr>
          <tr align='center'>
            <td>Cleared Items</td>
            <td>{pos1shift1.ClearedItems}</td>
            <td>{pos1shift2.ClearedItems}</td>
            <td>{pos1shift3.ClearedItems}</td>
            <td>{pos2shift1.ClearedItems}</td>
            <td>{pos2shift2.ClearedItems}</td>
            <td>{pos2shift3.ClearedItems}</td>
          </tr>
          <tr align='center'>
            <td>Cancels</td>
            <td>{pos1shift1.Cancels}</td>
            <td>{pos1shift2.Cancels}</td>
            <td>{pos1shift3.Cancels}</td>
            <td>{pos2shift1.Cancels}</td>
            <td>{pos2shift2.Cancels}</td>
            <td>{pos2shift3.Cancels}</td>
          </tr>
          <tr align='center'>
            <td>Customer Count</td>
            <td>{pos1shift1.CustomerCount}</td>
            <td>{pos1shift2.CustomerCount}</td>
            <td>{pos1shift3.CustomerCount}</td>
            <td>{pos2shift1.CustomerCount}</td>
            <td>{pos2shift2.CustomerCount}</td>
            <td>{pos2shift3.CustomerCount}</td>
          </tr>
        </table>
      </form>
        </div>
      </Segment>
      <ReactToPrint trigger={linkToPrint}
       pageStyle='@page { size: auto; margin: 10mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 40px !important; } }'
      content={() => componentRef.current} />
      <button onClick={pdfgenerator}>Download</button>
    </Stylecontainer>
  );
}

export default DaySheetList;

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
const tablestyle = {
  marginTop:'10px',
  borderSpacing: '2px',
  overflow: "scroll",
  border: "2px solid rgb(24, 94, 132)",
  background: "rgb(255, 255, 255)",
}
