import React, { lazy, useState } from 'react'
import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CButton,
  CCallout,
  CBadge,
  CWidgetIcon,
  CImg,
} from '@coreui/react'
const AllWidgets = lazy(() => import('../../widgets/AllWidgets.js'))
const All = (props) => {
  const [data, setData] = useState({"":""})
  const [meta,setMeta] = useState({"":""})
  const [modal, setModal] = useState(false);
  const [badges,setBadges] = useState([])

  const update = () => {
    setModal(!modal);
  }
const genBadges=(array)=>{
    var tmp=[]
      for(var i=0;i<array.length;i++){
        tmp.push(<CBadge className="mt-3 ml-2" color="primary" shape="pill">{array[i]}</CBadge>)
      }
      return(tmp.slice(0,3))
}
  const toggle=(data)=>{
    setData(data)
    setBadges(genBadges(data.tags))
    getMeta(data.symbol)
    setModal(!modal);
}

const getMeta=(symbol)=>{
  fetch(`https://infocrypt.jeffersonding.com/meta?q=${symbol}`)
    .then(resp=>{
      return(resp.json())
    }).then(json=>{
      setMeta(json.data[symbol])
    })
}

  return (
    
    <>
      <AllWidgets price={props.price} func={toggle} />
      <CModal
        show={modal}
        onClose={update}
        size='lg'
      >
        <CModalHeader closeButton>
          <h1>{data.symbol}</h1>
          {badges}
          </CModalHeader>
        <CModalBody>
          <CWidgetIcon text={meta.description} header={meta.name} color="primary">
            <CImg src={meta.logo}></CImg>
          </CWidgetIcon>
        <CCallout color="info" className={'bg-secondary'}>
             <small className="text-muted">Max Supply</small><br />
             <strong className="h4">{data.max_supply!=null
             ?(data.max_supply)
            :("N/A")}</strong>
           </CCallout>
           <CCallout color="info" className={'bg-secondary'}>
             <small className="text-muted">Circulating Supply</small><br />
             <strong className="h4">{data.circulating_supply!=null
             ?(data.circulating_supply)
            :("N/A")}</strong>
           </CCallout>
           <CCallout color="info" className={'bg-secondary'}>
             <small className="text-muted">Total Supply</small><br />
             <strong className="h4">{data.total_supply!=null
             ?(data.total_supply)
            :("N/A")}</strong>
           </CCallout>
           <CCallout color="info" className={'bg-secondary'}>
             <small className="text-muted">Update Time</small><br />
             <strong className="h4">{data.last_updated!=null
             ?(data.last_updated)
            :("N/A")}</strong>
           </CCallout>
           
    </CModalBody>
        <CModalFooter>
          <CButton color="primary">Visit Vault</CButton>
          <CButton
            color="secondary"
            onClick={update}
          >Close</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default All