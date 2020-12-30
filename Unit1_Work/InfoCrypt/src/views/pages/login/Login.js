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
  CRow,
  CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
const makeRequest = (method, url, data) => {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    // eslint-disable-next-line
    if (method == "POST" && data) {
      xhr.responseType = 'json';
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(data));
    } else {
      xhr.send();
    }
  });
}

const Login = () => {
  const history = useHistory();
  const [usr, setUsr] = useState("");
  const [otp, setOtp] = useState("");
  const [auth, setAuth] = useState(false);

  const authFail = () => {
    if(auth){
      return (
        <CAlert color="danger">
          Sorry, Wrong Credentials! Plaese try again.
        </CAlert>
      )
    }
  }

  const U2FAuth = () => {
    makeRequest('GET', "https://infocrypt.jeffersonding.com/authchall").then(function (data) {
      const authRequest = JSON.parse(data);
      window.u2f.sign(authRequest.appId, authRequest.challenge, [authRequest], (authResponse) => {
        makeRequest('POST', "https://infocrypt.jeffersonding.com/authverify", authResponse).then((result) => {
          if (result.valid) {
            console.log(result)
            history.push('/dashboard')
          } else {
            console.log("Access Failed")
            setAuth(true);
          }

        })
      });
    });
  }

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
                          fetch(`https://infocrypt.jeffersonding.com/otp?p=${otp}&usr=${usr}`)
                            .then(response => response.json())
                            .then(data => {
                              if (data.valid) {
                                history.push('/dashboard')
                              }else{
                                setAuth(true)
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
        <CRow className="py-5 justify-content-center">
        {authFail()}
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
