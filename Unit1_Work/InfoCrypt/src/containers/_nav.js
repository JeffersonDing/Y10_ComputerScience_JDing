import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Personal Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Market']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Overview',
    to: '/market',
    icon: 'cil-bookmark',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Search',
    to: '/market',
    icon: 'cil-pencil',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['My Assets']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'ETH Based',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'EOS',
        to: '/assets',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'ETH',
        to: '/assets',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'BTC Based',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'BTC',
        to: '/assets',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'BCH',
        to: '/assets',
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'XRP',
    route: '/assets',
    icon: 'cil-puzzle'
  }
]

export default _nav
