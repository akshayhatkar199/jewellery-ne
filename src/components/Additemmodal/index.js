import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CCardHeader,
  CInputGroup,
  CInputGroupText,
  CRow,
  CContainer,
  CCardGroup,
  CFormLabel,
  CHeaderDivider,
  CBreadcrumb,
  CBreadcrumbItem,
  CFormTextarea,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilLockLocked,
  cilUser,
  cilInfo,
  cilPencil,
  cilTrash,
} from "@coreui/icons";
import DataTable from "react-data-table-component";
// import AppBreadcrumb from "./AppBreadcrumb";

import swal from "sweetalert";
import {
  itemListApi,
  deleteitemByIdApi,
  itemApi,
  itemByIdApi,
  updateitemByIdApi,
} from "../Helper/item";
import { updateCustomerByIdApi } from "../Helper/customer";

const styleheader = {
  marginTop: "-24px",
  marginLeft: "-25px",
  marginRight: "-25px",
};

export default function Itempage({ setItemVisible, fetchitemlist }) {
  const [validated, setValidated] = useState(false);
  const [description, setdescription] = useState();
  const [edititemId, setEdititemId] = useState(0);
  const [items, setitem] = useState();
  const [loading, setLoading] = useState(false);
  const [customeNamerError, setcustomeNamerError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemesError, setitemesError] = useState(false);
  const [itemproductList, setitemproductList] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [itemTotalRecord, setitemTotalRecord] = useState();
  const [perPage, setPerPage] = useState(10);
  const userData = useSelector((state) => state.userData);

  const set1 = () => {
    setitem("");
    setdescription("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formm = event.currentTarget;
    if (formm.checkValidity() === false) {
      event.preventDefault();
    } else {
      event.preventDefault();
      event.stopPropagation();

      if (edititemId && edititemId > 0) {
        // console.log("code for update")
        let payloadData = {
          userId: userData.userinfo.userId,
          itemName: items,
          itemId: edititemId,
          itemDescription: description,
        };
        setLoading(true);
        updateitemByIdApi(payloadData)
          .then(
            async (res) => {
              // console.log(" success");
              // console.log("res", res);
              if (res.status == 500) {
                swal("Item", res.message, "error");
              } else {
                setValidated(false);
                set1();
                // swal("Customer",  res.message, "success")

                setCurrentPage(1);
              }
              setLoading(false);
            },
            (err) => {
              // console.log("error");
              setLoading(false);
              swal("Item", "invalid item", "success");
            }
          )
          .catch();
      } else {
        // console.log("code for create")
        let payloadData = {
          userId: userData.userinfo.userId,
          itemName: items,
          itemDescription: description,
        };
        setLoading(true);
        itemApi(payloadData)
          .then(
            async (res) => {
              // console.log(" success");
              // console.log("res", res);
              if (res.status == 500) {
                swal("Item", res.message, "error");
              } else {
                setValidated(false);
                set1();
                swal("Item", res.message, "success");
                await fetchitemlist();
                setItemVisible(false);
              }
              setLoading(false);
            },
            (err) => {
              // console.log("error");
              setLoading(false);
              swal("Item", "invalid Item", "success");
            }
          )
          .catch();
      }
    }
    setValidated(true);
  };

  const validationForm = (inputName, value) => {
    if (inputName === "Description" && value && value.length == "") {
      setitemesError(true);
      setValidated(false);
      return false;
    } else {
      setitemesError(false);
    }
    setValidated(true);
  };

  return (
    <div>
      <CForm
        className="row g-3 needs-validation"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        method="post"
        encType="multipart/form-data"
      >
        {/* <h4>Add Customer</h4>  */}

        <CFormLabel className="mb-0 text-start">Item :</CFormLabel>
        <CFormInput
          placeholder="Item"
          className="mt-0 text-start"
          name="Item"
          type="text"
          onChange={(e) => {
            setitem(e.target.value);
            validationForm(e.target.name, e.target.value);
          }}
          value={items}
          required
        />
        <CFormFeedback invalid>Please Enter Item.</CFormFeedback>
        {customeNamerError === true ? (
          <>
            <CFormFeedback className="errorMessage-customer">
              Please Enter item.
            </CFormFeedback>
          </>
        ) : null}
        <br />

        <CCol xs={12} className="m-0">
          <br />
          <CButton
            color="primary"
            className="px-4"
            type="submit"
            //  disabled={loading}
          >
            {loading ? "Wait.." : "Sumbit"} 
          </CButton>
        </CCol>
      </CForm>
    </div>
  );
}
