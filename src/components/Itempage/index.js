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
import { itemListApi ,deleteitemByIdApi, itemApi, itemByIdApi, updateitemByIdApi} from "../Helper/item";
import { updateCustomerByIdApi } from "../Helper/customer";

const styleheader = {
  marginTop: "-24px",
  marginLeft: "-25px",
  marginRight: "-25px",
};

const customStyles = {
  cells: {
    style: {
      borderRight: "1px solid #ddd",
    },
  },
};

export default function Itempage() {
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
  const columns = [
    {
      name: " No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Item Name",
      // allowOverflow:true,
      wrap: true,
      selector: (row) => row.itemName,
    },
    {
      name: "View",
      allowOverflow: true,
      selector: (row) => (
        <>
          <div className="button-customerorder">
            {/* <CButton color="primary" variant="outline" className="px-0 buttonsOrderPage "> 
          <CIcon icon={cilInfo} size="lg"  />
        </CButton>&nbsp;&nbsp; */}
            <CButton
              title="Edit customer"
              color="dark"
              variant="outline"
              onClick={() => getiemDataForEdit(row.itemId)}
              className="px-0 buttonsOrderPage "
            >
              <CIcon icon={cilPencil} size="lg" />
            </CButton>
            &nbsp;&nbsp;
            <CButton
              title="Delete customer"
              color="danger"
              variant="outline"
              onClick={() => deleteitem(row.itemId)}
              className="px-0 buttonsOrderPage "
            >
              <CIcon icon={cilTrash} size="lg" />
            </CButton>
            &nbsp;&nbsp;
          </div>
        </>
      ),
    },
  ];
  useEffect(() => {
    if (itemproductList.length == 0) {
      getcustomer(0);
    }
  }, []);
  const getcustomer = async (page) => {
    if (userData.userinfo.userId) {
      setListLoading(true);
      await itemListApi(userData.userinfo.userId, page ? page : 0)
        .then(
          async (res) => {
            setitemproductList(res.data);
            setListLoading(false);
            setitemTotalRecord(res.totalRecords);
           
          },
          (err) => {
            setListLoading(false);
          }
        )
        .catch();
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    let currentPage = page;
    var offset = (currentPage - 1) * perPage;
    getcustomer(offset);
  };

  const set1 = () => {
    setitem("");
    setdescription("");
    setEdititemId(0);
  };

 
  const handleSubmit = (event) => {
    event.preventDefault();

    const formm = event.currentTarget;
    if (formm.checkValidity() === false) {
      event.preventDefault();
    } else {
      event.preventDefault();
      event.stopPropagation();
    
        if (edititemId && edititemId > 0 ) {
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
                  getcustomer(0);
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
                  getcustomer(0);
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
  const paginationComponentOptions = {
    rowsPerPageText: "",
    noRowsPerPage: true,
  };

  const getiemDataForEdit = async (edititemId) => {
    // console.log("edititemId",edititemId)
    await itemByIdApi(userData.userinfo.userId, edititemId)
      .then(
        async (res) => {
          if (res.data) {
            setdescription(res.data.itemDescription);
            setEdititemId(edititemId);
            setitem(res.data.itemName);
          }
        },
        (err) => {}
      )
      .catch();
  };
  const deleteitem = async (deleteitemId) => {
    let payloadData = {
      userId: userData.userinfo.userId,
      itemId: deleteitemId,
    };
    swal({
      title: "Are you sure to delete Item?",
      // text: "Are you sure to delete Order?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Ok"],
    })
      .then(
        (willDelete) => {
          if (willDelete) {
            deleteitemByIdApi(payloadData).then(async (res) => {
              if (res.status === 200) {
                swal("Success", res.message, "success").then((ok) => {
                  if (ok) {
                    let custmerListt = itemproductList.filter((e) => {
                      if (e.itemId != deleteitemId) {
                        return e;
                      }
                    });
                    //  console.log("custmerListt",custmerListt)
                    setitemproductList([...custmerListt]);
                    setitemTotalRecord(itemTotalRecord - 1);
                  }
                });
              }
            });
          }
        },
        (err) => {}
      )
      .catch();
  };

  return (
    <div>
      <CHeaderDivider />

      <CContainer fluid>
        <CRow className="mb-3">
          <CCol xs={12}>
            <h5 className="main-title">Item</h5>
          </CCol>
          <CCol xs={8}>
            <CBreadcrumb
              className="m-0 ms-2"
              style={{ "--cui-breadcrumb-divider": "'>'" }}
            >
              <CBreadcrumbItem>
                {" "}
                <Link to="/dashboard">Home</Link>
              </CBreadcrumbItem>
              <CBreadcrumbItem actives>Item</CBreadcrumbItem>
            </CBreadcrumb>
          </CCol>
          <CCol xs={4}>
            <div class="text-end">
              {/* <Link to="/dashboard"><CButton color="warning"  size="sm" className="px-4 text-end text-white" style={{marginTop: "-52px"}} type="button">
         Back
      </CButton></Link> */}
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol md={12} sm={12} lg={5} style={{marginTop: "-15px"}}>
            <CCard className="p-4 mt-3">
              <CCardHeader style={styleheader}>
                <strong> Add Item </strong>
              </CCardHeader>
              <CCardBody>
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
                  <CFormFeedback invalid>Please Enter Name.</CFormFeedback>
                  {customeNamerError === true ? (
                    <>
                      <CFormFeedback className="errorMessage-customer">
                        Please Enter item.
                      </CFormFeedback>
                    </>
                  ) : null}
                  <br />

                  <CFormLabel htmlFor="exampleFormControlTextarea1" className="mb-0 text-start">
                            Item Description :
                        </CFormLabel>
                        <CFormTextarea
                          id="exampleFormControlTextarea1"
                            // aria-describedby="validationTooltip04Feedback"
                            // feedbackInvalid="Please Enter Description"
                          name="Description"
                          className="mt-0 text-start"
                          // required
                          rows={3}
                          text=""
                          onChange={(e) => {
                            setdescription(e.target.value);
                            validationForm(e.target.name, e.target.value);
                          }}
                          value={description}
                        ></CFormTextarea>
                        {/* {itemesError === true ? (
                          <>
                            <CFormFeedback className="errorMessage-customer">
                              Please Enter  Characters
                            </CFormFeedback>
                          </>
                        ) : null} */}
                    

                  <CCol xs={12} className="m-0">
                    <br />
                    <CButton
                      color="primary"
                      className="px-4"
                      type="submit"
                      //  disabled={loading}
                    >
                      {/* {loading ? "Wait..":"Update"} */}
                      {/* Update */}
                      Submit
                    </CButton>
                  </CCol>
                </CForm>
              </CCardBody>
            </CCard>
            <br />
          </CCol>

          <CCol md={12} lg={7}>
            <CCard>
              <CCardHeader>
                <strong>Item List</strong>
              </CCardHeader>
              <CCardBody>
                <DataTable
                  className="tableTopSpace  border border-table"
                  columns={columns}
                  progressPending={listLoading}
                  responsive={true}
                  data={itemproductList}
                  paginationTotalRows={itemTotalRecord}
                  onChangePage={handlePageChange}
                  pagination
                  paginationDefaultPage={currentPage}
                  paginationComponentOptions={paginationComponentOptions}
                  customStyles={customStyles}
                  paginationServer
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}
