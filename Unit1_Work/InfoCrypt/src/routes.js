import React from 'react';
const Market = React.lazy(()=>import('./views/pages/market/Market'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Assets = React.lazy(()=> import('./views/pages/assets/All'))
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/market', name: 'Market', component: Market },
  { path: '/assets', name: 'My Assets', component: Assets },
];

export default routes;
