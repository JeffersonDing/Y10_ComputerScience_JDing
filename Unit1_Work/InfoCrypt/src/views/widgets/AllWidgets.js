import React,{useEffect,useState} from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'

const AllWidgets = (props) => {
  var [widgets,setWidgets]=useState([])

  const generate = (symbol,up,down)=>{
  const random=(min, max)=>{
    return ~~(Math.random() * (max - min) + min);
  }
  var data = []
  for(var i=0;i<5;i++){
    data.push(parseFloat(symbol)+random(up,down))
  }
  data.push(parseFloat(symbol))
  return(data)
}

  const Widget=(color,price,symbol,data)=>{
    var gColor = `gradient-${color}`
    return(
      <CCol sm="6" lg="3">
      <CWidgetDropdown
        color={gColor}
        header={"$"+price}
        text={symbol}
        footerSlot={
          <ChartLineSimple
            pointed
            className="c-chart-wrapper mt-3 mx-3"
            style={{height: '70px'}}
            dataPoints={generate(price,0,50.5)}
            pointHoverBackgroundColor={color}
            label="$CAD"
            labels="months"
          />
        }
      >
        <CDropdown>
          <CDropdownToggle color="transparent">
            <CIcon name="cil-settings"/>
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownItem onClick={()=>{props.func(data)}}>Show</CDropdownItem>
            <CDropdownItem disabled>Remove</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </CWidgetDropdown>
    </CCol>
    )
  }


  useEffect(() => {
    const colors=['primary','success','info','warning','danger','dark']
    var tmp=[]
    for(var i=0;i<props.price.all.length;i++){
      tmp.push(Widget(colors[Math.floor(Math.random() * colors.length)],parseFloat(props.price.all[i].quote.CAD.price).toFixed(2),props.price.all[i].symbol,props.price.all[i]))
    }
    setWidgets(tmp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <CRow>
      {widgets}
    </CRow>
  )
}

export default AllWidgets
