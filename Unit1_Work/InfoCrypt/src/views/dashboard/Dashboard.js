import React, { lazy } from 'react'
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import MyAssets from '../charts/MyAssets.js'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const Dashboard = (props) => {
  console.log(props)
  return (
    <>
      <WidgetsDropdown price={props.price} />
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Assets Overview</h4>
              <div className="small text-muted">December 2020</div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButton color="primary" className="float-right">
                <CIcon name="cil-cloud-download"/>
              </CButton>
              <CButtonGroup className="float-right mr-3">
                {
                  ['Day', 'Month', 'Year'].map(value => (
                    <CButton
                      color="outline-secondary"
                      key={value}
                      className="mx-0"
                      active={value === 'Month'}
                    >
                      {value}
                    </CButton>
                  ))
                }
              </CButtonGroup>
            </CCol>
          </CRow>
          <MyAssets style={{height: '300px', marginTop: '40px'}} price={props.price}/>
        </CCardBody>
        </CCard>
        <CCard>
        <CCardHeader>
          Total Assets
          <small> 256/1043 Tokens</small>
        </CCardHeader>
        <CCardBody>
          <CProgress animated value={25} className="mb-3" />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          Smart Contracts
          <small> 10/14</small>
        </CCardHeader>
        <CCardBody>
          <CProgress animated color="warning" value={75} className="mb-3" />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          Daily Goal
          <small> 54/60</small>
        </CCardHeader>
        <CCardBody>
          <CProgress animated color="danger" value={90} className="mb-3" />
        </CCardBody>
      </CCard>

      </>
  )
}

export default Dashboard
