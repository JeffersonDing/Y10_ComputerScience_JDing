import React from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'

const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandDanger = getStyle('danger') || '#f86c6b'
const brandDark = getStyle('dark')|| '#808080'


const MyAssets = props => {
  const generate=(symbol,min,max)=>{
    var out = []
    const random = (min, max)=>{
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
    for (let i = 0; i <= 27; i++) {
      out.push(parseFloat(symbol)+random(min,max))
    }
    return(out)
  }

  const data1 = generate(props.price.BCH,0,300)
  const data2 = generate(props.price.ETH,-20,100)
  const data3 = generate(props.price.BTC,-210,510)
  const data4 = generate(props.price.XRP,0,0)

  const Datasets = (()=>{
    return [
      {
        label: 'BCH',
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: data1
      },
      {
        label: 'ETH',
        backgroundColor: 'transparent',
        borderColor: brandSuccess,
        pointHoverBackgroundColor: brandSuccess,
        borderWidth: 2,
        data: data2
      },
      {
        label: 'BTC',
        backgroundColor: 'transparent',
        borderColor: brandDanger,
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 2,
        data: data3
      },
      {
        label: 'XRP',
        backgroundColor: 'transparent',
        borderColor: brandDark,
        pointHoverBackgroundColor: brandDark,
        borderWidth: 2,
        data: data4
      }
    ]
  })()

  const defaultOptions = (()=>{
    return {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: false
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 100,
              stepSize: 800,
              max:2400
            },
            gridLines: {
              display: true
            }
          }]
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      }
    }
  )()

  // render
  return (
    <CChartLine
      {...props}
      datasets={Datasets}
      options={defaultOptions}
      labels={['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']}
    />
  )
}


export default MyAssets
