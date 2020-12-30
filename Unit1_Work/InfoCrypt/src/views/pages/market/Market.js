import React from 'react'
import ScriptTag from 'react-script-tag'
const Users = () => {
  return (
    <div style={{ height: 680, width: '100%' }}>
      <div class="tradingview-widget-container">
        <div id="tradingview_ef735"></div>
        <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/BTCUSD/?exchange=BITBAY"><span class="blue-text">BTCUSD Chart</span></a> by TradingView</div>
        <ScriptTag type="text/javascript" src='./embed.js' />
      </div>
    </div>
  )
}

export default Users
