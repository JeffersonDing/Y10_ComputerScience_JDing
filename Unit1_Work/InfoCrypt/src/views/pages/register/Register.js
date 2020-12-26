import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
const U2FReg = () => {
  fetch("https://localhost:5000/register",{
    method:'GET',
    credentials: 'include',
  })
    .then((data) => {
      return data.json()
    }).then((registrationRequest)=>{
      window.u2f.register(registrationRequest.appId, [registrationRequest], [], (registrationResponse) => {
        const requestOptions = {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registrationResponse)
      };
      fetch('https://localhost:5000/verify', requestOptions)
          .then(response => response.json())
          .then(data => console.log(data));
    });
    })
}
const Register = () => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Connect Infocrypt with your key</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Username" autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="OTP" />
                  </CInputGroup>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton color="success" className="mb-1" block><span>OTP Register</span></CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton color="info" className="mb-1" block onClick={()=>{
                      U2FReg()
                    }}><span>U2F Register</span></CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
