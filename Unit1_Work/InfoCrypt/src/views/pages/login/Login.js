import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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

const postHeaders = {
  method: 'POST',
  headers: { "Content-Type": "application/json" },
};

const getHeaders = {
  method: 'GET',
  headers: { "Content-Type": "application/json" },
};

const U2FAuth = () => {
  fetch("https://localhost:5000/authchall", {
    method: 'GET',
    credentials: 'include',
  })
    .then((data) => {
      return data.json()
    }).then((authRequest) => {
      window.u2f.sign(authRequest.appId, [authRequest], [], (authResponse) => {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(authResponse)
        };
        fetch('https://localhost:5000/authverify', requestOptions)
          .then(response => response.json())
          .then(data => console.log(data));
      });
    })
}
const Login = () => {
  const history = useHistory();

  const [usr, setUsr] = useState("");
  const [otp, setOtp] = useState("");
  const [auth, setAuth] = useState(false)
  //const [auth,setAuth] = useState(false)
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput value={usr} type="text" placeholder="Username" autoComplete="username" onChange={e => setUsr(e.target.value)} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput value={otp} type="password" placeholder="OTP" onChange={e => setOtp(e.target.value)} />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" onClick={() => {
                          fetch(`https://localhost:5000/otp?p=${otp}`)
                            .then(response => response.json())
                            .then(data => {
                              if (data.valid) {
                                setAuth(true)
                                history.push('/')
                              } else {
                                setAuth(false)
                              }
                            })
                        }}>Login</CButton>
                      </CCol>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" onClick={() => {
                          U2FAuth();
                        }}>U2F Login</CButton>
                      </CCol>
                      <CCol xs="4" className="text-left">
                        <CButton color="link" className="px-0">Lost Key?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Register an account with your 2 factor authentication security key. A security key is required for the use of this application.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Key!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
