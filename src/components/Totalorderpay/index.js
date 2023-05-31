import React, { useEffect, useState } from "react";
import { cilTrash,cilCheckAlt } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CBreadcrumb,
  CBreadcrumbItem,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CFormInput,
  CFormLabel,
  CHeaderDivider,
  CRow,
} from "@coreui/react";
import moment from "moment-js";

import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { BillAdd, BillDelete, BillView } from "../Helper/outstanding";

const customStyles = {
  cells: {
    style: {
      borderRight: "1px solid #ddd",
    },
  },
};

const Totalorderpay = () => {
  const [tabledata, setTabledata] = useState();
  const data =[
    {
      name:""
    }
  ]

  const columns = [
    {
      name: "Sr.No",
      selector: (row, i) => i + 1,
    },
    {
        name: 'Order No',
        selector: row => row.title,
        sortable: true,
    },
    {
        name: 'Date',
        selector: row => row.director,
        sortable: true,
    },
    {    wrap: true,
        name: 'Total Order',
        selector: row => row.year,
        sortable: true,
    },
    {
        name: 'Paid',
        selector: row => row.year,
        sortable: true,
    },
    {
        name: 'Unpaid',
        selector: row => row.year,
        sortable: true,
    },
    {
      name: "Action",
      width: "150px",
      allowOverflow: true,
      selector: (row) => {
        return (
        <> 
          <Link to={"/totalorderpay/"} className="payment-text">
             <span >Mark as Paid</span>
         </Link>
          </>
        );
      },
    },
];

const paginationComponentOptions = {
  rowsPerPageText: "",
  noRowsPerPage: true,
};
  return (
    <>
    <CHeaderDivider />
     <CRow>
          <CCol xs={12}>
            <h5 className="main-title"> Total Order Pay</h5>
          </CCol>
          <CCol xs={8}>
            <CBreadcrumb
              className="m-0 ms-2"
              style={{ "--cui-breadcrumb-divider": "'>'" }}
            >
              <CBreadcrumbItem>
                <Link to="/dashboard">Home</Link>
              </CBreadcrumbItem>
              {/* <CBreadcrumbItem >
                                <Link to="/customerbilling">Customer Order</Link>
                            </CBreadcrumbItem> */}
              <CBreadcrumbItem actives>Total Pay</CBreadcrumbItem>
            </CBreadcrumb>
          </CCol>
          <CCol xs={4}>
            <div className="text-end">
              <Link to="/totaloutstanding">
                <CButton
                  color="primary"
                  size="sm"
                  className="px-4 text-end text-white "
                  type="button"
                  style={{ marginTop: "-52px" }}
                >
                  Back
                </CButton>
              </Link>
            </div>
          </CCol>
        </CRow>

    <CRow className="mt-2">
       <CCol md={12} sm={12}>
            <CCard>
              <CCardHeader>
                <strong>Customer Info : </strong>
              </CCardHeader>

              <form className="form p-4">
              <CRow className="justify-content-start">
              <CCol md={4} sm={12}>
              <div className="mt-3">
                  <lable>Customer Name </lable>
                  <br />
                  <CFormInput 
                    type="text" 
                    // value={billData?.customerName}
                    disabled
                  />
                </div>
                </CCol>

                <CCol md={4} sm={12}>
                <div className="mt-3">
                  <lable> Customer Phone</lable>
                  <br />
                  <CFormInput 
                  type="text"
                  // value={billData?.customerPhone}
                  disabled
                   />
                </div>
                </CCol>

                <CCol md={4} sm={12}>
                <div className="mt-3">
                  <lable> Balance</lable>
                  <br />
                  <CFormInput 
                  type="text"
                  // value={billData?.remainingAmount}
                  disabled
                   />
                </div>
                </CCol>

                <CCol md={4} sm={12}>
                <div className="mt-3">
                  <lable> Total Charges </lable>
                  <br />
                  <CFormInput 
                  type="text" 
                  // value={billData?.totalCharges}
                  disabled
                  />
                </div>
                </CCol>
                <CCol md={4} sm={12}>
                <div className="mt-3">
                  <lable>Total Paid </lable>
                  <br />
                  <CFormInput 
                  type="text" 
                  //  value={billData?.totalPaid}
                   disabled
                  />
                </div>
                </CCol>
                </CRow>
              </form>
            </CCard>
          </CCol>
        </CRow>

        <CRow className="mt-2">
              <CCol md={12} sm={12} >
                <CCard>
                  <CCardHeader>
               <strong>Outstanding Total Pay </strong>
              </CCardHeader>
                <CCardBody>
                 <DataTable

                   className="tableTopSpace  border border-table"
                      columns={columns}
                      responsive={true}
                      data={data}
                      // pagination
                      // paginationComponentOptions={paginationComponentOptions}
                      customStyles={customStyles}
                      highlightOnHover
                       pagination
                      paginationServer
                    // progressPending={listLoading}
                     paginationComponentOptions={paginationComponentOptions}
                // paginationTotalRows={totalRows}
                    />
             </CCardBody>
            </CCard>
          </CCol>
        </CRow>
    </>
  )
}

export default Totalorderpay